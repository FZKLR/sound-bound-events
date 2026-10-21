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
      console.warn('RESEND_API_KEY is missing.');
      return;
    }

    const cleanCode = ticketCode.replace(/[^a-zA-Z0-9-]/g, '');
    
    // Explicit production base URL
    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://sound-bound-events.netlify.app').replace(/\/+$/, '');
    
    // Complete verification link for mobile scanners
    const fullVerifyUrl = `${baseUrl}/verify/${cleanCode}`;

    // Generate QR image pointing to the full https:// link
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(fullVerifyUrl)}&color=000000&bgcolor=FFFFFF`;

    await resend.emails.send({
      from: 'Sound Bound Events <onboarding@resend.dev>',
      to: customerEmail,
      subject: `Admission Pass: ${eventTitle} (${cleanCode.slice(-6).toUpperCase()})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { background-color: #050505; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 24px; margin: 0; }
            .card { background-color: #0E0E0E; border: 1px solid #222222; border-radius: 20px; padding: 28px; max-width: 480px; margin: 0 auto; text-align: center; }
            .badge { display: inline-block; background-color: rgba(0, 255, 102, 0.15); color: #00FF66; padding: 6px 14px; border-radius: 30px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; }
            .title { font-size: 24px; font-weight: 900; text-transform: uppercase; margin: 18px 0 12px 0; color: #ffffff; }
            .info-box { background-color: #141414; border: 1px solid #242424; border-radius: 12px; padding: 16px; margin: 20px 0; text-align: left; font-size: 13px; line-height: 1.6; color: #cccccc; }
            .qr-wrapper { background-color: #ffffff; padding: 16px; border-radius: 14px; display: inline-block; margin: 15px 0 10px 0; }
            .qr-img { display: block; width: 190px; height: 190px; }
            .code-text { font-family: monospace; font-size: 14px; font-weight: bold; color: #00FF66; letter-spacing: 2px; margin-top: 8px; }
            .btn { display: inline-block; background-color: #00FF66; color: #000000; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; padding: 12px 24px; border-radius: 10px; text-decoration: none; margin-top: 15px; }
            .footer { color: #555555; font-size: 11px; text-align: center; margin-top: 24px; text-transform: uppercase; letter-spacing: 1.5px; }
          </style>
        </head>
        <body>
          <div class="card">
            <span class="badge">Official Admission Pass</span>
            <div class="title">${eventTitle}</div>
            
            <div class="info-box">
              <strong style="color: #ffffff;">Guest:</strong> ${customerName}<br/>
              <strong style="color: #ffffff;">Tier:</strong> ${tierName} (Qty: ${quantity})<br/>
              <strong style="color: #ffffff;">Venue:</strong> Rumba Club, Dubai<br/>
              <strong style="color: #ffffff;">Date:</strong> Saturday, Oct 31, 2026 • 10:00 PM
            </div>

            <div>
              <div class="qr-wrapper">
                <img src="${qrImageUrl}" alt="Scan Ticket Pass" class="qr-img" />
              </div>
              <div class="code-text">PASS ID: ${cleanCode.slice(-8).toUpperCase()}</div>
              <p style="color: #888888; font-size: 11px; margin-top: 6px;">Point your phone camera at this QR code to verify admission.</p>
              
              <div>
                <a href="${fullVerifyUrl}" class="btn" target="_blank">View Live Door Pass</a>
              </div>
            </div>

            <div class="footer">
              © 2026 Sound Bound Events • Dubai, UAE
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log(`Dispatched verified QR ticket to ${customerEmail} -> ${fullVerifyUrl}`);
  } catch (error) {
    console.error('Email error:', error);
  }
}