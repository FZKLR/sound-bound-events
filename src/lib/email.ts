import { Resend } from 'resend';
import QRCode from 'qrcode';

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
      console.warn('RESEND_API_KEY is not set. Skipping email dispatch.');
      return;
    }

    // 1. Generate QR code data URL (Base64)
    const qrCodeDataUrl = await QRCode.toDataURL(ticketCode, {
      margin: 1,
      width: 250,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });

    // 2. Send branded dark-mode ticket email
    await resend.emails.send({
      from: 'Sound Bound Events <onboarding@resend.dev>', // or tickets@yourdomain.com
      to: customerEmail,
      subject: `Your Pass: ${eventTitle} (${ticketCode.slice(-6).toUpperCase()})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { background-color: #050505; color: #ffffff; font-family: -apple-system, sans-serif; padding: 20px; }
            .card { background-color: #0E0E0E; border: 1px solid #222222; border-radius: 16px; padding: 24px; max-width: 480px; margin: 0 auto; }
            .badge { background-color: rgba(0, 255, 102, 0.15); color: #00FF66; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
            .title { font-size: 22px; font-weight: 900; text-transform: uppercase; margin: 16px 0 8px 0; color: #ffffff; }
            .info { color: #888888; font-size: 13px; line-height: 1.5; margin-bottom: 20px; }
            .qr-box { background: white; padding: 16px; border-radius: 12px; text-align: center; margin: 20px 0; display: inline-block; }
            .code { font-family: monospace; font-size: 14px; font-weight: bold; letter-spacing: 2px; color: #00FF66; }
            .footer { color: #555555; font-size: 11px; text-align: center; margin-top: 24px; text-transform: uppercase; letter-spacing: 1px; }
          </style>
        </head>
        <body>
          <div class="card">
            <span class="badge">Official Admission Pass</span>
            <div class="title">${eventTitle}</div>
            <div class="info">
              <strong>Guest:</strong> ${customerName}<br/>
              <strong>Pass Tier:</strong> ${tierName} (x${quantity})<br/>
              <strong>Venue:</strong> Rumba Club, Dubai<br/>
              <strong>Date:</strong> Saturday, Oct 31, 2026 • 10:00 PM
            </div>

            <div style="text-align: center;">
              <div class="qr-box">
                <img src="${qrCodeDataUrl}" alt="Ticket QR" width="180" height="180" />
              </div>
              <div class="code">CODE: ${ticketCode.slice(-8).toUpperCase()}</div>
              <p style="color: #777; font-size: 11px; margin-top: 6px;">Present this QR code at the door for express check-in.</p>
            </div>

            <div class="footer">
              © 2026 Sound Bound Events • Dubai, UAE
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log(`Ticket email sent successfully to ${customerEmail}`);
  } catch (error) {
    console.error('Failed to send ticket email:', error);
  }
}