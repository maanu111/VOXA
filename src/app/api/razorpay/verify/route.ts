import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const keySecret = process.env.RAZORPAY_KEY_SECRET;

const safeEqual = (a: string, b: string) => {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
};

export async function POST(request: NextRequest) {
  try {
    if (!keySecret) {
      return NextResponse.json(
        { error: "Missing RAZORPAY_KEY_SECRET in .env" },
        { status: 500 },
      );
    }

    const body = (await request.json()) as {
      razorpay_order_id?: string;
      razorpay_payment_id?: string;
      razorpay_signature?: string;
    };

    const orderId = body.razorpay_order_id;
    const paymentId = body.razorpay_payment_id;
    const signature = body.razorpay_signature;

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { error: "Missing Razorpay verification fields." },
        { status: 400 },
      );
    }

    const payload = `${orderId}|${paymentId}`;
    const expectedSignature = createHmac("sha256", keySecret)
      .update(payload)
      .digest("hex");

    if (!safeEqual(expectedSignature, signature)) {
      return NextResponse.json({ error: "Invalid payment signature." }, { status: 400 });
    }

    return NextResponse.json({ verified: true, paymentId, orderId });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Payment verification failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
