"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchOpen) return;

    const frame = requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [searchOpen]);

  const handleSearchToggle = () => {
    setSearchOpen((prev) => !prev);
    setMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white backdrop-blur">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-logo text-sm uppercase">
          VOXXA
        </Link>

        <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.16em] text-slate-600 md:flex">
          <Link href="/products?category=headphones" className="transition-opacity hover:opacity-60">
            Headphones
          </Link>
          <Link href="/products?category=earphones" className="transition-opacity hover:opacity-60">
            Earphones
          </Link>
          <Link href="/products?category=sale" className="transition-opacity hover:opacity-60">
            Deals
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSearchToggle}
            className={`rounded-full p-1.5 transition-all duration-300 ease-out ${
              searchOpen
                ? "bg-slate-900 text-white"
                : "text-slate-700 hover:bg-slate-100"
            }`}
            aria-label="Search"
            aria-expanded={searchOpen}
            aria-controls="site-search-panel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          <Link href="/cart" className="p-1 hover:opacity-60 transition-opacity relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" x2="21" y1="6" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-black text-[9px] text-white">
              0
            </span>
          </Link>

          <button
            onClick={handleMenuToggle}
            className={`relative h-8 w-8 rounded-full p-1 transition-all duration-300 ease-out md:hidden ${
              menuOpen
                ? "bg-slate-900 text-white"
                : "text-slate-700 hover:bg-slate-100"
            }`}
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="site-mobile-menu"
          >
            <span
              className={`absolute left-[7px] right-[7px] h-[1.5px] rounded-full bg-current transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                menuOpen
                  ? "top-1/2 -translate-y-1/2 rotate-45"
                  : "top-[9px]"
              }`}
            />
            <span
              className={`absolute left-[7px] right-[7px] top-1/2 h-[1.5px] -translate-y-1/2 rounded-full bg-current transition-all duration-300 ease-out ${
                menuOpen
                  ? "scale-x-0 opacity-0"
                  : "scale-x-100 opacity-100"
              }`}
            />
            <span
              className={`absolute left-[7px] right-[7px] h-[1.5px] rounded-full bg-current transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                menuOpen
                  ? "top-1/2 -translate-y-1/2 -rotate-45"
                  : "bottom-[9px]"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        id="site-search-panel"
        aria-hidden={!searchOpen}
        className={`overflow-hidden px-4 transition-[max-height,opacity,transform,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          searchOpen
            ? "max-h-24 translate-y-0 py-3 opacity-100"
            : "pointer-events-none max-h-0 -translate-y-1 py-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-6xl">
          <div
            className={`relative rounded-full bg-slate-100/90 transition-all duration-500 ${
              searchOpen
                ? "shadow-[inset_0_0_0_1px_rgba(15,23,42,0.14),0_14px_26px_-22px_rgba(15,23,42,0.75)]"
                : "shadow-[inset_0_0_0_1px_rgba(148,163,184,0.2)]"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>

            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search earphones and headphones..."
              className="w-full bg-transparent py-2.5 pl-9 pr-4 text-xs text-slate-700 placeholder:text-slate-400 outline-none"
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setSearchOpen(false);
                }
              }}
            />
          </div>
        </div>
      </div>

      <div
        id="site-mobile-menu"
        aria-hidden={!menuOpen}
        className={`overflow-hidden transition-[max-height,opacity,transform,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          menuOpen
            ? "max-h-44 translate-y-0 px-4 pb-3 opacity-100"
            : "pointer-events-none max-h-0 -translate-y-1 px-4 pb-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-6xl rounded-2xl bg-slate-100/80 p-1">
          <nav>
            <Link
              href="/products?category=headphones"
              className="block rounded-xl px-3 py-2.5 text-xs uppercase tracking-[0.14em] text-slate-700 transition-all duration-300 hover:bg-white/90"
              onClick={() => setMenuOpen(false)}
            >
              Headphones
            </Link>
            <Link
              href="/products?category=earphones"
              className="block rounded-xl px-3 py-2.5 text-xs uppercase tracking-[0.14em] text-slate-700 transition-all duration-300 hover:bg-white/90"
              onClick={() => setMenuOpen(false)}
            >
              Earphones
            </Link>
            <Link
              href="/products?category=sale"
              className="block rounded-xl px-3 py-2.5 text-xs uppercase tracking-[0.14em] text-slate-700 transition-all duration-300 hover:bg-white/90"
              onClick={() => setMenuOpen(false)}
            >
              Deals
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
