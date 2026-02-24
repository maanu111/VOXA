"use client";

import Link from "next/link";
import { useState } from "react";
import { formatINR } from "@/lib/currency";

export default function CheckoutPage() {
  const [submitted, setSubmitted] = useState(false);
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
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
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
              className="border px-3 py-2 text-xs bg-transparent"
            />
            <input
              type="text"
              placeholder="Last name"
              required
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
              className="border px-3 py-2 text-xs bg-transparent"
            />
            <input
              type="text"
              placeholder="ZIP"
              required
              className="border px-3 py-2 text-xs bg-transparent"
            />
          </div>
        </fieldset>

        {/* Payment */}
        <fieldset>
          <legend className="text-[10px] font-medium uppercase tracking-wider mb-3">
            Payment
          </legend>
          <input
            type="text"
            placeholder="Card number"
            required
            className="w-full border px-3 py-2 text-xs bg-transparent"
          />
          <div className="grid grid-cols-2 gap-3 mt-3">
            <input
              type="text"
              placeholder="MM / YY"
              required
              className="border px-3 py-2 text-xs bg-transparent"
            />
            <input
              type="text"
              placeholder="CVC"
              required
              className="border px-3 py-2 text-xs bg-transparent"
            />
          </div>
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

        <button
          type="submit"
          className="w-full border border-black py-2.5 text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
