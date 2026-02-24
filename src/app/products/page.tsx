"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts, categories } from "@/lib/data";

function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const filtered = getProducts(category);
  const activeCategory = categories.find((cat) => cat.value === category);
  const heading = activeCategory?.label ?? "All Products";

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xs font-medium uppercase tracking-wider">{heading}</h1>
        <span className="text-[10px] text-neutral-400">{filtered.length} items</span>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((cat) => (
          <Link
            key={cat.value}
            href={cat.value ? `/products?category=${cat.value}` : "/products"}
            className={`shrink-0 border px-3 py-1 text-[10px] uppercase tracking-wider transition-colors ${
              category === cat.value
                ? "bg-black text-white border-black"
                : "hover:border-black"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.images[0]}
              tag={product.tag}
            />
          ))}
        </div>
      ) : (
        <p className="text-xs text-neutral-400 py-12 text-center">No products found.</p>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-6 text-xs text-neutral-400">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
