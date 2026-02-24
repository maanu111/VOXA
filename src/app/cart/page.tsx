"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { products } from "@/lib/data";
import { formatINR } from "@/lib/currency";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
}

const FREE_SHIPPING_THRESHOLD = 5000;
const SHIPPING_FEE = 499;

const initialCart: CartItem[] = ["1", "2"].flatMap((id) => {
  const product = products.find((p) => p.id === id);
  if (!product) return [];

  return [
    {
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      image: product.images[0],
    },
  ];
});

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialCart);

  const updateQty = (id: string, qty: number) => {
    if (qty < 1) {
      setItems(items.filter((i) => i.id !== id));
    } else {
      setItems(items.map((i) => (i.id === id ? { ...i, qty } : i)));
    }
  };

  const remove = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="text-xs font-medium uppercase tracking-wider mb-6">Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xs text-neutral-400">Your cart is empty.</p>
          <Link href="/products" className="text-xs underline mt-2 inline-block">
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="divide-y">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-neutral-50">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[8px] text-neutral-300">
                      img
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.id}`} className="text-xs hover:underline truncate block">
                    {item.name}
                  </Link>
                  <p className="text-xs text-neutral-500 mt-0.5">{formatINR(item.price)}</p>
                </div>
                <div className="flex items-center border shrink-0">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="px-2 py-1 text-[10px] hover:bg-neutral-50 transition-colors"
                  >
                    &minus;
                  </button>
                  <span className="px-2 py-1 text-[10px] border-x min-w-[2rem] text-center">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="px-2 py-1 text-[10px] hover:bg-neutral-50 transition-colors"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs w-20 text-right shrink-0">
                  {formatINR(item.price * item.qty)}
                </p>
                <button
                  onClick={() => remove(item.id)}
                  className="text-neutral-300 hover:text-black transition-colors shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="border-t mt-2 pt-4 space-y-2">
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

          <Link
            href="/checkout"
            className="mt-6 block w-full border border-black py-2.5 text-center text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
          >
            Checkout
          </Link>

          <Link href="/products" className="block text-center text-[10px] text-neutral-400 mt-3 hover:text-black transition-colors">
            Continue shopping
          </Link>
        </>
      )}
    </div>
  );
}
