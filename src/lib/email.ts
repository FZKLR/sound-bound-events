import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');

interface SendTicketEmailParams {
  customerEmail: string;
  customerName: string;
  eventTitle: string;
  tierName: string;
  ticketCode: string;
  quantity: number;
}

export async function sendTicketEmail({
  customerEmail,
  customerName,
  eventTitle,
  tierName,
  ticketCode,
  quantity,
}: SendTicketEmailParams) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is not set.');
      return;
    }

    // Public HTTPS QR image URL that renders reliably across Gmail, Apple Mail, and Outlook
    const cleanCode = ticketCode.replace(/[^a-zA-Z0-9-]/g, '');
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(cleanCode)}&color=000000&bgcolor=FFFFFF`;

    await resend.emails.send({
      from: 'Sound Bound Events <onboarding@resend.dev>',
      to: customerEmail,
      subject: `Your Admission Pass: ${eventTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { background-color: #050505; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 24px; margin: 0; }
            .card { background-color: #0E0E0E; border: 1px solid #222222; border-radius: 20px; padding: 28px; max-width: 480px; margin: 0 auto; text-align: center; }
            .badge { display: inline-block; background-color: rgba(0, 255, 102, 0.15); color: #00FF66; padding: 6px 14px; border-radius: 30px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; }
            .title { font-size: 24px; font-weight: 900; text-transform: uppercase; margin: 18px 0 12px 0; color: #ffffff; letter-spacing: -0.5px; }
            .info-box { background-color: #141414; border: 1px solid #242424; border-radius: 12px; padding: 16px; margin: 20px 0; text-align: left; font-size: 13px; line-height: 1.6; color: #cccccc; }
            .qr-wrapper { background-color: #ffffff; padding: 16px; border-radius: 14px; display: inline-block; margin: 15px 0 10px 0; }
            .qr-img { display: block; width: 180px; height: 180px; }
            .code-text { font-family: monospace; font-size: 14px; font-weight: bold; color: #00FF66; letter-spacing: 2px; margin-top: 8px; }
            .footer { color: #555555; font-size: 11px; text-align: center; margin-top: 24px; text-transform: uppercase; letter-spacing: 1.5px; }
          </style>
        </head>
        <body>
          <div class="card">
            <span class="badge">Official Admission Pass</span>
            <div class="title">${eventTitle}</div>
            
            <div class="info-box">
              <strong style="color: #ffffff;">Guest Name:</strong> ${customerName}<br/>
              <strong style="color: #ffffff;">Ticket Tier:</strong> ${tierName} (Qty: ${quantity})<br/>
              <strong style="color: #ffffff;">Venue:</strong> Rumba Club, Dubai<br/>
              <strong style="color: #ffffff;">Date:</strong> Saturday, Oct 31, 2026 • 10:00 PM
            </div>

            <div>
              <div class="qr-wrapper">
                <img src="${qrImageUrl}" alt="Scan QR Code" class="qr-img" />
              </div>
              <div class="code-text">PASS ID: ${cleanCode.slice(-8).toUpperCase()}</div>
              <p style="color: #888888; font-size: 11px; margin-top: 6px;">Present this scannable QR code at the door for entry.</p>
            </div>

            <div class="footer">
              © 2026 Sound Bound Events • Dubai, UAE
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log(`Email dispatched to ${customerEmail} with QR pass.`);
  } catch (error) {
    console.error('Email sending error:', error);
  }
}