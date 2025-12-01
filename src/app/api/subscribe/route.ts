import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email)
      return NextResponse.json({ error: "Email required" }, { status: 400 });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER, // Sender email
        pass: process.env.SMTP_PASS, // App password
      },
    });

    await transporter.sendMail({
      from: `"VIP Sports Club" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL, // Admin receives email here
      subject: "New Subscriber ✔️",
      html: `<p><strong>${email}</strong> has subscribed to your website.</p>`,
    });

    return NextResponse.json({
      success: true,
      message: "Subscription successful!",
    });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
