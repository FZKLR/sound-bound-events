import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { sendTicketEmail } from '@/lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as Stripe.LatestApiVersion,
});

// Use service role key to write to Supabase orders table
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function POST(req: Request) {
  let event: Stripe.Event;

  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // Fallback parse if secret is not set yet in test mode
      event = JSON.parse(body);
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  // Handle successful checkout
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};

    const customerEmail = session.customer_details?.email || session.customer_email || metadata.customerEmail || '';
    const customerName = session.customer_details?.name || metadata.customerName || 'Partygoer';
    const eventTitle = metadata.eventTitle || 'Sound Bound: Halloween Special';
    const tierName = metadata.tierName || 'Admission Pass';
    const totalAmount = (session.amount_total || 0) / 100;

    try {
      // 1. Insert into Supabase Orders
      const { data: orderData, error: orderError } = await supabaseAdmin
        .from('orders')
        .insert({
          customer_name: customerName,
          customer_email: customerEmail,
          quantity: 1,
          total_amount: totalAmount,
          payment_status: 'paid',
          stripe_session_id: session.id,
        })
        .select()
        .single();

      if (orderError) {
        console.error('Supabase DB Insert Error:', orderError);
      }

      const ticketCode = orderData?.ticket_code || session.id;

      // 2. Dispatch QR Ticket Email via Resend
      if (customerEmail && process.env.RESEND_API_KEY) {
        await sendTicketEmail({
          customerEmail,
          customerName,
          eventTitle,
          tierName,
          ticketCode,
          quantity: 1,
        });
      }
    } catch (dbErr) {
      console.error('Error fulfilling order in webhook:', dbErr);
    }
  }

  return NextResponse.json({ received: true });
}