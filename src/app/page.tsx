import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

const metrics = [
  { label: "Battery", value: "45h" },
  { label: "Latency", value: "45ms" },
  { label: "Drivers", value: "40mm" },
];

const categoryTiles = [
  {
    name: "Earphones",
    href: "/products?category=earphones",
    copy: "Compact fit, sharp vocals, made for all-day movement.",
  },
  {
    name: "Headphones",
    href: "/products?category=headphones",
    copy: "Deep low-end, wide stage, and premium comfort.",
  },
  {
    name: "Wireless",
    href: "/products?category=wireless",
    copy: "Fast pairing, low latency, and strong battery life.",
  },
  {
    name: "Studio",
    href: "/products?category=studio",
    copy: "Neutral tuning for creators who need real detail.",
  },
];

const delayClasses = ["", "reveal-delay-1", "reveal-delay-2", "reveal-delay-3"];

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="border-b border-slate-200/80">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="reveal">
            <p className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-600 shadow-sm">
              2026 Audio Collection
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Hear every detail. <span className="text-sky-700">Lose the noise.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
              Premium earphones and headphones tuned for focused work, immersive
              music, and crisp calls all day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products?category=headphones"
                className="rounded-full border border-slate-900 bg-slate-900 px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all duration-500 ease-out hover:-translate-y-0.5 hover:bg-slate-700"
              >
                Shop Headphones
              </Link>
              <Link
                href="/products?category=earphones"
                className="rounded-full border border-slate-300 bg-white px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] text-slate-700 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-700"
              >
                Shop Earphones
              </Link>
            </div>
          </div>

          <div className="reveal reveal-delay-1">
            <div className="hero-glow relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(145deg,#ffffff_0%,#edf6ff_52%,#dbeafe_100%)] p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.55)] sm:p-8">
              <div className="surface-sheen pointer-events-none absolute inset-0" />
              <div className="relative z-10">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  Spotlight Model
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  Nova ANC Pro
                </h2>
                <p className="mt-2 max-w-xs text-xs leading-relaxed text-slate-600">
                  Hybrid active noise cancellation with spatial depth and
                  six-mic voice clarity.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl border border-white/70 bg-white/65 p-3 text-center backdrop-blur-sm"
                    >
                      <p className="text-sm font-semibold text-slate-900">
                        {metric.value}
                      </p>
                      <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-slate-500">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="float-slow pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-sky-200/80 blur-2xl" />
              <div className="float-slower pointer-events-none absolute -left-6 bottom-1 h-16 w-16 rounded-full border border-white/70 bg-white/60" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature chips */}
      <section className="border-b border-slate-200/80">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="reveal reveal-delay-2 flex flex-wrap gap-2">
            {[
              "Free 2-day shipping",
              "1-year replacement warranty",
              "30-day hassle-free returns",
              "24/7 audio support",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-slate-500"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="reveal flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
            Featured Audio
          </h2>
          <Link
            href="/products"
            className="text-[10px] uppercase tracking-[0.16em] text-slate-400 transition-colors hover:text-slate-700"
          >
            View all
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {featured.map((product, index) => (
            <div key={product.id} className={`reveal ${delayClasses[index]}`}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.images[0]}
                tag={product.tag}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-slate-200/80">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="reveal text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
            Shop By Type
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {categoryTiles.map((tile, index) => (
              <Link
                key={tile.name}
                href={tile.href}
                className={`reveal ${delayClasses[index]} group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_20px_45px_-28px_rgba(14,116,144,0.65)]`}
              >
                <span className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-sky-100 opacity-70 transition-transform duration-500 group-hover:scale-125" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-800">
                  {tile.name}
                </p>
                <p className="mt-2 max-w-xs text-xs leading-relaxed text-slate-500">
                  {tile.copy}
                </p>
                <span className="mt-4 inline-block text-[10px] uppercase tracking-[0.2em] text-sky-700">
                  Explore
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="reveal reveal-delay-2 rounded-3xl border border-slate-200 bg-[linear-gradient(130deg,#f0f9ff_0%,#ffffff_50%,#e0f2fe_100%)] px-6 py-8 text-center sm:px-10">
            <p className="text-[10px] uppercase tracking-[0.2em] text-sky-700">
              VOXA Promise
            </p>
            <p className="mt-2 text-sm text-slate-700">
              Free shipping on orders over INR 5,000 and same-day dispatch for most
              in-stock earphones and headphones.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
