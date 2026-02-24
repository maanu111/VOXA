"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProduct } from "@/lib/data";
import { formatINR } from "@/lib/currency";
import { useState } from "react";

export default function ProductPage() {
  const { id } = useParams();
  const product = getProduct(id as string);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 text-center">
        <p className="text-xs text-neutral-400">Product not found.</p>
        <Link href="/products" className="text-xs underline mt-2 inline-block">
          Back to shop
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* Breadcrumb */}
      <div className="reveal flex items-center gap-1.5 text-[10px] text-neutral-400 mb-6">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-black transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-black">{product.name}</span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:gap-10">
        {/* Image */}
        <div className="reveal reveal-delay-1 relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-[radial-gradient(circle_at_18%_14%,#ffffff_0%,#eff6ff_42%,#e2e8f0_100%)] flex items-center justify-center">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 32rem, 100vw"
              className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
            />
          ) : (
            <>
              <div className="relative h-28 w-28 rounded-full border border-slate-300/80 bg-white/70">
                <div className="absolute inset-4 rounded-full border border-slate-300/70" />
                <div className="absolute inset-8 rounded-full border border-slate-400/80" />
                <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-500" />
              </div>
              <span className="absolute bottom-4 rounded-full border border-slate-200 bg-white/80 px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-slate-500">
                Audio Preview
              </span>
            </>
          )}
        </div>

        {/* Info */}
        <div className="reveal reveal-delay-2 flex flex-col">
          {product.tag && (
            <span className="text-[9px] uppercase tracking-widest text-neutral-400 mb-1">
              {product.tag}
            </span>
          )}
          <h1 className="text-lg font-light">{product.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm">{formatINR(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="text-xs text-neutral-500 mt-4 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity & Add to Cart */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center border">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-2.5 py-1.5 text-xs hover:bg-neutral-50 transition-colors"
              >
                &minus;
              </button>
              <span className="px-3 py-1.5 text-xs border-x min-w-[2.5rem] text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-2.5 py-1.5 text-xs hover:bg-neutral-50 transition-colors"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 border border-black py-2 text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              {added ? "Added" : "Add to Cart"}
            </button>
          </div>

          {/* Details */}
          <div className="mt-8 border-t pt-4">
            <p className="text-[10px] font-medium uppercase tracking-wider mb-2">Details</p>
            <ul className="space-y-1">
              {product.details.map((d, i) => (
                <li key={i} className="text-xs text-neutral-500">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
