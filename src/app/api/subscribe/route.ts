import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { upsertSubscriber } from "@/lib/content-store";
import type { MembershipPlan } from "@/lib/content-types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PLANS: MembershipPlan[] = ["silver", "gold"];

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as {
      email?: string;
      source?: string;
      plan?: string;
    };
    const email = (payload.email ?? "").trim().toLowerCase();
    const normalizedPlan = payload.plan?.trim().toLowerCase();

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (normalizedPlan && !PLANS.includes(normalizedPlan as MembershipPlan)) {
      return NextResponse.json(
        { error: "Plan must be either silver or gold" },
        { status: 400 },
      );
    }

    const subscriber = await upsertSubscriber(
      email,
      payload.source ?? "website",
      (normalizedPlan as MembershipPlan | undefined) ?? "silver",
    );

    const smtpConfigured =
      process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.ADMIN_EMAIL;

    if (smtpConfigured) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      try {
        await transporter.sendMail({
          from: `"VIP Sports Club" <${process.env.SMTP_USER}>`,
          to: process.env.ADMIN_EMAIL,
          subject: "New Subscriber ✔️",
          html: `<p><strong>${email}</strong> subscribed to your website on <strong>${subscriber.plan.toUpperCase()}</strong> plan.</p>`,
        });
      } catch (error) {
        console.error("EMAIL ERROR:", error);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Subscription successful!",
      subscriber,
    });
  } catch (error) {
    console.error("SUBSCRIBE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to process subscription" },
      { status: 500 }
    );
  }
}
