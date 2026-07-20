import nodemailer from "nodemailer";

const host = process.env.EMAIL_HOST;
const port = process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : 587;
const secure = process.env.EMAIL_SECURE === "true";
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
const from = process.env.EMAIL_FROM || user || "no-reply@impact.id";

const emailEnabled = Boolean(host && user && pass);

const transporter = emailEnabled
  ? nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user: user as string,
        pass: pass as string
      }
    })
  : null;

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendMail(options: EmailOptions) {
  if (!emailEnabled || !transporter) {
    console.warn(
      "Email service disabled: missing EMAIL_HOST, EMAIL_USER, or EMAIL_PASS."
    );
    return;
  }

  try {
    await transporter.sendMail({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text
    });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

export async function sendUserApprovalEmail(
  to: string,
  name: string,
  role: string
) {
  const subject = "Akun Anda telah diverifikasi";
  const displayRole =
    role === "TEACHER" ? "Guru" : role === "DINAS" ? "Dinas" : role;
  const html = `
    <div style="font-family:sans-serif;line-height:1.5;color:#1f2937;">
      <h2 style="color:#0f766e;">Halo ${name},</h2>
      <p>Akun ${displayRole} Anda telah disetujui oleh admin dan sekarang aktif.</p>
      <p>Silakan masuk menggunakan email dan password yang Anda daftarkan.</p>
      <p>Terima kasih telah bergabung dengan IMPACT.ID.</p>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
      <p style="font-size:0.9rem;color:#64748b;">Jika Anda tidak mengenali email ini, abaikan saja.</p>
    </div>
  `;
  const text = `Halo ${name},\n\nAkun ${displayRole} Anda telah disetujui oleh admin dan sekarang aktif. Silakan masuk menggunakan email dan password yang Anda daftarkan.\n\nTerima kasih telah bergabung dengan IMPACT.ID.`;

  await sendMail({ to, subject, html, text });
}
