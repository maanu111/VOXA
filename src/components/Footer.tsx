import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/70">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid grid-cols-2 gap-6 text-xs sm:grid-cols-4">
          <div>
            <p className="font-medium mb-2">Shop</p>
            <div className="space-y-1.5 text-neutral-500">
              <Link href="/products" className="block hover:text-black transition-colors">All Products</Link>
              <Link href="/products?category=earphones" className="block hover:text-black transition-colors">Earphones</Link>
              <Link href="/products?category=headphones" className="block hover:text-black transition-colors">Headphones</Link>
            </div>
          </div>
          <div>
            <p className="font-medium mb-2">Help</p>
            <div className="space-y-1.5 text-neutral-500">
              <Link href="#" className="block hover:text-black transition-colors">FAQ</Link>
              <Link href="#" className="block hover:text-black transition-colors">Shipping</Link>
              <Link href="#" className="block hover:text-black transition-colors">Returns</Link>
            </div>
          </div>
          <div>
            <p className="font-medium mb-2">Company</p>
            <div className="space-y-1.5 text-neutral-500">
              <Link href="#" className="block hover:text-black transition-colors">About VOXA</Link>
              <Link href="#" className="block hover:text-black transition-colors">Contact Audio Team</Link>
            </div>
          </div>
          <div>
            <p className="font-medium mb-2">Legal</p>
            <div className="space-y-1.5 text-neutral-500">
              <Link href="#" className="block hover:text-black transition-colors">Privacy</Link>
              <Link href="#" className="block hover:text-black transition-colors">Terms</Link>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t pt-4 text-[10px] text-neutral-400">
          &copy; 2026 VOXA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
