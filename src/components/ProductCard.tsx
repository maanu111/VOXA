import Link from "next/link";
import Image from "next/image";
import { formatINR } from "@/lib/currency";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  tag?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  tag,
}: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-[radial-gradient(circle_at_16%_18%,#ffffff_0%,#f8fbff_42%,#e2e8f0_100%)] transition-all duration-700 ease-out will-change-transform group-hover:-translate-y-1 group-hover:shadow-[0_16px_35px_-25px_rgba(2,132,199,0.8)]">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 16rem, (min-width: 640px) 25vw, 50vw"
            className="h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.05]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-24 w-24 rounded-full border border-slate-300/80 bg-white/70">
              <div className="absolute inset-3 rounded-full border border-slate-300/70" />
              <div className="absolute inset-7 rounded-full border border-slate-400/80" />
              <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-500" />
            </div>
            <span className="absolute bottom-4 rounded-full border border-slate-200 bg-white/80 px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-slate-500">
              Audio
            </span>
          </div>
        )}
        {tag && (
          <span className="absolute left-2 top-2 rounded-full bg-slate-900 px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] text-white">
            {tag}
          </span>
        )}
      </div>
      <div className="mt-2 space-y-0.5 px-0.5">
        <p className="truncate text-xs text-slate-800">{name}</p>
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-slate-900">{formatINR(price)}</p>
          {originalPrice && (
            <p className="text-[10px] text-slate-400 line-through">
              {formatINR(originalPrice)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
