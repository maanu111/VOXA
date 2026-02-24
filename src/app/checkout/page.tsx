"use client";

import Link from "next/link";
import { useState } from "react";
import { formatINR } from "@/lib/currency";

interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

interface RazorpayCheckoutResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

const loadRazorpayScript = async (): Promise<boolean> => {
  if (typeof window === "undefined") return false;

  const existing = document.querySelector<HTMLScriptElement>(
    'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
  );

  if (existing) {
    return true;
  }

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);

  const subtotal = 24498;
  const shipping = 0;
  const total = subtotal + shipping;

  if (submitted) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="text-xs font-medium uppercase tracking-wider">Order Confirmed</p>
        <p className="text-xs text-neutral-500 mt-2">
          Thank you for your purchase. You&apos;ll receive a confirmation email shortly.
        </p>
        {paymentId && (
          <p className="mt-2 text-[11px] text-neutral-500">
            Payment ID: {paymentId}
          </p>
        )}
        <Link
          href="/"
          className="mt-6 inline-block border border-black px-5 py-2 text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="text-xs font-medium uppercase tracking-wider mb-6">Checkout</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formElement = e.currentTarget;
          const formData = new FormData(formElement);

          setError(null);
          setIsPaying(true);

          try {
            const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY;
            if (!key) {
              throw new Error("Missing NEXT_PUBLIC_RAZORPAY_KEY in .env");
            }

            const scriptReady = await loadRazorpayScript();
            if (!scriptReady) {
              throw new Error("Unable to load Razorpay checkout script.");
            }

            const firstName = String(formData.get("firstName") ?? "");
            const lastName = String(formData.get("lastName") ?? "");
            const email = String(formData.get("email") ?? "");
            const phone = String(formData.get("phone") ?? "");

            const orderResponse = await fetch("/api/razorpay/order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                amount: total * 100,
                receipt: `vxxa_${Date.now()}`,
              }),
            });

            if (!orderResponse.ok) {
              throw new Error("Failed to create Razorpay order.");
            }

            const orderData =
              (await orderResponse.json()) as RazorpayOrderResponse;

            const Razorpay = (
              window as Window & { Razorpay?: new (options: unknown) => { open: () => void } }
            ).Razorpay;

            if (!Razorpay) {
              throw new Error("Razorpay SDK unavailable on window.");
            }

            const paymentObject = new Razorpay({
              key,
              amount: orderData.amount,
              currency: orderData.currency,
              name: "VOXXA",
              description: "Order payment",
              order_id: orderData.id,
              prefill: {
                name: `${firstName} ${lastName}`.trim(),
                email,
                contact: phone,
              },
              theme: {
                color: "#111111",
              },
              modal: {
                ondismiss: () => {
                  setIsPaying(false);
                  setError("Payment popup was closed.");
                },
              },
              handler: async (response: RazorpayCheckoutResponse) => {
                try {
                  const verifyResponse = await fetch("/api/razorpay/verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(response),
                  });

                  if (!verifyResponse.ok) {
                    throw new Error("Payment verification failed.");
                  }

                  setPaymentId(response.razorpay_payment_id);
                  setSubmitted(true);
                } catch {
                  setError("Payment completed but verification failed.");
                } finally {
                  setIsPaying(false);
                }
              },
            });

            paymentObject.open();
          } catch (err) {
            const message =
              err instanceof Error ? err.message : "Payment initialization failed.";
            setError(message);
            setIsPaying(false);
          }
        }}
        className="space-y-6"
      >
        {/* Contact */}
        <fieldset>
          <legend className="text-[10px] font-medium uppercase tracking-wider mb-3">
            Contact
          </legend>
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            className="w-full border px-3 py-2 text-xs bg-transparent"
          />
        </fieldset>

        {/* Shipping */}
        <fieldset>
          <legend className="text-[10px] font-medium uppercase tracking-wider mb-3">
            Shipping Address
          </legend>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="First name"
              required
              name="firstName"
              className="border px-3 py-2 text-xs bg-transparent"
            />
            <input
              type="text"
              placeholder="Last name"
              required
              name="lastName"
              className="border px-3 py-2 text-xs bg-transparent"
            />
          </div>
          <input
            type="text"
            placeholder="Address"
            required
            className="w-full border px-3 py-2 text-xs bg-transparent mt-3"
          />
          <div className="grid grid-cols-3 gap-3 mt-3">
            <input
              type="text"
              placeholder="City"
              required
              className="border px-3 py-2 text-xs bg-transparent"
            />
            <input
              type="text"
              placeholder="State"
              name="state"
              className="border px-3 py-2 text-xs bg-transparent"
            />
            <input
              type="text"
              placeholder="ZIP"
              required
              name="zip"
              className="border px-3 py-2 text-xs bg-transparent"
            />
          </div>
          <input
            type="tel"
            placeholder="Phone"
            required
            name="phone"
            className="w-full border px-3 py-2 text-xs bg-transparent mt-3"
          />
        </fieldset>

        {/* Payment */}
        <fieldset>
          <legend className="text-[10px] font-medium uppercase tracking-wider mb-3">
            Payment
          </legend>
          <p className="text-xs text-neutral-500">
            You will be redirected to Razorpay secure checkout to complete payment.
          </p>
        </fieldset>

        {/* Order Summary */}
        <div className="border-t pt-4 space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500">Subtotal</span>
            <span>{formatINR(subtotal)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500">Shipping</span>
            <span>{shipping === 0 ? "Free" : formatINR(shipping)}</span>
          </div>
          <div className="flex justify-between text-xs font-medium border-t pt-2">
            <span>Total</span>
            <span>{formatINR(total)}</span>
          </div>
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={isPaying}
          className="w-full border border-black py-2.5 text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
        >
          {isPaying ? "Opening Razorpay..." : "Pay with Razorpay"}
        </button>
      </form>
    </div>
  );
}
