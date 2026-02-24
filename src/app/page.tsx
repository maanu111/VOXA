import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

const delayClasses = ["", "reveal-delay-1", "reveal-delay-2", "reveal-delay-3"];

export default function Home() {
  const featured = products.slice(0, 8);

  return (
    <div className="overflow-hidden">
      {/* Products */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="reveal flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
            Products
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
            <div key={product.id} className={`reveal ${delayClasses[index % delayClasses.length]}`}>
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
    </div>
  );
}
