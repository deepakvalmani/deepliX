import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { config } from '../config';

export interface EmailPayload {
  to?: string;
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;
}

export const emailService = {
  /**
   * Dispatches an email using Resend API (primary) or SMTP / Nodemailer (backup).
   */
  async send(payload: EmailPayload): Promise<{ success: boolean; provider: string; details?: any; error?: string }> {
    const recipient = payload.to || config.email.adminNotificationEmail;
    const { resendApiKey, senderEmail, smtp } = config.email;

    // 1. Resend API
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const from = `deepliX Systems <${senderEmail}>`;
        const result = await resend.emails.send({
          from,
          to: [recipient],
          replyTo: payload.replyTo,
          subject: payload.subject,
          html: payload.html,
          text: payload.text,
        });

        console.log('[EmailService] Dispatched via Resend API:', result);
        return { success: true, provider: 'resend', details: result };
      } catch (err: any) {
        console.error('[EmailService] Resend dispatch failed:', err.message);
        // Fall through to SMTP if configured
      }
    }

    // 2. SMTP / Nodemailer
    if (smtp.host) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtp.host,
          port: smtp.port,
          secure: smtp.secure,
          auth: smtp.user ? { user: smtp.user, pass: smtp.pass } : undefined,
        });

        const from = smtp.from || `"deepliX" <${smtp.user || senderEmail}>`;
        const info = await transporter.sendMail({
          from,
          to: recipient,
          replyTo: payload.replyTo,
          subject: payload.subject,
          html: payload.html,
          text: payload.text,
        });

        console.log('[EmailService] Dispatched via SMTP:', info.messageId);
        return { success: true, provider: 'smtp', details: info };
      } catch (err: any) {
        console.error('[EmailService] SMTP dispatch failed:', err.message);
        return { success: false, provider: 'smtp', error: err.message };
      }
    }

    // 3. Fallback / Dev mode logging
    console.log('[EmailService] Notice: No active email keys (RESEND_API_KEY or SMTP_HOST). Logged to server console.');
    return { success: true, provider: 'console_dev_mode' };
  },

  /**
   * Generates a modern HTML notification email for new contact submissions.
   */
  buildContactNotificationHtml(data: {
    name: string;
    email: string;
    company?: string;
    role?: string;
    interest?: string;
    message: string;
    tools?: string[];
    outcomes?: string[];
    blueprintScore?: number;
  }): string {
    const toolsHtml = data.tools && data.tools.length > 0
      ? `<div style="margin-top: 12px;"><strong>Selected Stack:</strong> ${data.tools.map(t => `<span style="display:inline-block; background:#00BFFF22; color:#00BFFF; border:1px solid #00BFFF55; border-radius:6px; padding:2px 8px; font-size:12px; margin:2px;">${t}</span>`).join(' ')}</div>`
      : '';

    const outcomesHtml = data.outcomes && data.outcomes.length > 0
      ? `<div style="margin-top: 12px;"><strong>Target Outcomes:</strong> ${data.outcomes.map(o => `<span style="display:inline-block; background:#10B98122; color:#10B981; border:1px solid #10B98155; border-radius:6px; padding:2px 8px; font-size:12px; margin:2px;">${o}</span>`).join(' ')}</div>`
      : '';

    return `
      <div style="background-color: #121212; color: #E4E4E7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 32px 20px; max-width: 620px; margin: 0 auto; border: 1px solid #27272A; border-radius: 16px;">
        <div style="border-bottom: 1px solid #27272A; padding-bottom: 16px; margin-bottom: 24px;">
          <h2 style="color: #00BFFF; margin: 0; font-size: 20px; font-weight: 800;">deepliX — New Lead Submission</h2>
          <p style="color: #A1A1AA; font-size: 13px; margin: 4px 0 0 0;">Received via Website Contact Portal</p>
        </div>

        <div style="background: #1E1E1E; border: 1px solid #27272A; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #71717A; width: 120px;">Name:</td><td style="color: #FFFFFF; font-weight: 600;">${data.name}</td></tr>
            <tr><td style="padding: 6px 0; color: #71717A;">Email:</td><td><a href="mailto:${data.email}" style="color: #00BFFF; text-decoration: none;">${data.email}</a></td></tr>
            <tr><td style="padding: 6px 0; color: #71717A;">Company:</td><td style="color: #FFFFFF;">${data.company || 'Not Specified'}</td></tr>
            <tr><td style="padding: 6px 0; color: #71717A;">Role:</td><td style="color: #FFFFFF;">${data.role || 'Not Specified'}</td></tr>
            <tr><td style="padding: 6px 0; color: #71717A;">Interest:</td><td style="color: #00BFFF; font-weight: 600;">${data.interest || 'General Architecture'}</td></tr>
          </table>
          ${toolsHtml}
          ${outcomesHtml}
        </div>

        <div style="background: #18181B; border-left: 4px solid #00BFFF; border-radius: 4px 8px 8px 4px; padding: 16px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #E4E4E7;">
            ${data.message.replace(/\n/g, '<br/>')}
          </p>
        </div>

        <div style="text-align: center; border-top: 1px solid #27272A; padding-top: 20px; font-size: 12px; color: #71717A;">
          <p style="margin: 0;">deepliX Automated System Notification · Founder: Deepak Raj</p>
        </div>
      </div>
    `;
  },

  /**
   * Generates auto-confirmation email to the user when they submit inquiry.
   */
  buildClientConfirmationHtml(name: string): string {
    return `
      <div style="background-color: #121212; color: #E4E4E7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 32px 20px; max-width: 620px; margin: 0 auto; border: 1px solid #27272A; border-radius: 16px;">
        <h2 style="color: #00BFFF; margin: 0 0 12px 0; font-size: 22px;">We've received your inquiry at deepliX</h2>
        <p style="font-size: 15px; color: #D4D4D8; line-height: 1.6;">Hi ${name},</p>
        <p style="font-size: 15px; color: #A1A1AA; line-height: 1.6;">
          Thank you for reaching out to deepliX. Our engineering team and Founder Deepak Raj have received your details. We are reviewing your systems profile and will respond within 24 hours with custom architectural insights.
        </p>
        <div style="margin: 28px 0; text-align: center;">
          <a href="${config.brand.calendlyUrl}" style="background: #00BFFF; color: #121212; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 9999px; display: inline-block; font-size: 14px;">
            Book an Instant 30-Min Discovery Call
          </a>
        </div>
        <p style="font-size: 12px; color: #71717A; margin-top: 28px; border-top: 1px solid #27272A; padding-top: 16px;">
          Best regards,<br/><strong>Deepak Raj &amp; the deepliX Engineering Team</strong><br/>
          <a href="${config.brand.websiteUrl}" style="color: #00BFFF;">${config.brand.websiteUrl}</a>
        </p>
      </div>
    `;
  },
};
