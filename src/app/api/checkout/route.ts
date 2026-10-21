import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY is missing' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(apiKey, {
      apiVersion: '2026-09-30.endive',
    });

    const { tierId, tierName, price, quantity, eventTitle, customerName, customerEmail } = await req.json();

    if (!price || !quantity || quantity < 1) {
      return NextResponse.json({ error: 'Invalid quantity or price' }, { status: 400 });
    }

    const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sound-bound-events.netlify.app';
    const baseUrl = rawBaseUrl.replace(/\/+$/, ''); // Automatically removes any trailing slashes

    const session = await stripe.checkout.sessions.create({
      customer_email: customerEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: 'aed',
            product_data: {
              name: `${eventTitle || 'Sound Bound Event'} - ${tierName || 'Pass'}`,
              description: `Entry pass for ${customerName || 'Guest'}`,
            },
            unit_amount: Math.round(Number(price) * 100),
          },
          quantity: Number(quantity),
        },
      ],
      mode: 'payment',
      metadata: {
        tierId: tierId || '',
        customerName: customerName || 'Partygoer',
        customerEmail: customerEmail || '',
        eventTitle: eventTitle || '',
      },
      success_url: `${baseUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/#tickets`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Stripe error' },
      { status: 500 }
    );
  }
}