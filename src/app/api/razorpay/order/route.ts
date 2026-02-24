import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

const getRazorpayClient = () => {
  if (!keyId || !keySecret) {
    throw new Error("Missing Razorpay server credentials in .env");
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { amount?: number; receipt?: string };
    const amount = Number(body.amount);

    if (!Number.isFinite(amount) || amount < 100) {
      return NextResponse.json(
        { error: "Invalid amount. Amount must be in paise (minimum 100)." },
        { status: 400 },
      );
    }

    const receipt =
      typeof body.receipt === "string" && body.receipt.trim().length > 0
        ? body.receipt.slice(0, 40)
        : `receipt_${Date.now()}`;

    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount: Math.round(amount),
      currency: "INR",
      receipt,
    });

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create Razorpay order.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
