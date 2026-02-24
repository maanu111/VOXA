export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  category: string;
  tag?: string;
  images: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Pulse Air Earphones",
    price: 7499,
    originalPrice: 8999,
    description:
      "Compact true wireless earphones with adaptive noise control and rich bass.",
    details: [
      "Bluetooth 5.4 with low-latency mode",
      "Up to 32 hours with charging case",
      "IPX5 sweat and splash resistance",
    ],
    category: "earphones",
    tag: "new",
    images: [
      "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  {
    id: "2",
    name: "Wave ANC Headphones",
    price: 16999,
    originalPrice: 20999,
    description:
      "Over-ear wireless headphones with hybrid ANC and an immersive listening profile.",
    details: [
      "40mm titanium-coated drivers",
      "Adaptive ANC and transparency mode",
      "Up to 45 hours battery life",
    ],
    category: "headphones",
    tag: "sale",
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  {
    id: "3",
    name: "AeroPods Mini",
    price: 5499,
    description:
      "Lightweight daily earphones tuned for podcasts, calls, and commute playlists.",
    details: [
      "Dual-device quick switching",
      "4-mic AI call enhancement",
      "Fast charge: 10 min = 2 hours playtime",
    ],
    category: "earphones",
    images: [
      "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  {
    id: "4",
    name: "Horizon Wireless Headphones",
    price: 12999,
    description: "Balanced over-ear headphones for long sessions and zero ear fatigue.",
    details: [
      "Ultra-soft memory foam cushions",
      "Multipoint connection for phone and laptop",
      "Foldable design with travel case",
    ],
    category: "wireless",
    tag: "new",
    images: [
      "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  {
    id: "5",
    name: "Studio One Reference",
    price: 18999,
    originalPrice: 22999,
    description:
      "Precision studio headphones with neutral tuning for mixing and mastering.",
    details: [
      "Wired low-impedance studio profile",
      "Detachable coiled and straight cables",
      "Detailed mids and accurate stereo field",
    ],
    category: "studio",
    tag: "sale",
    images: [
      "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  {
    id: "6",
    name: "GameBeat X Headset",
    price: 9999,
    description:
      "Low-latency gaming headset with directional audio and crystal-clear voice pickup.",
    details: [
      "2.4G + Bluetooth dual connectivity",
      "Boom mic with noise suppression",
      "RGB ring accents with app control",
    ],
    category: "gaming",
    images: [
      "https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  {
    id: "7",
    name: "Orbit Sport Earphones",
    price: 6499,
    originalPrice: 7999,
    description: "Secure-fit earphones for workouts and long outdoor runs.",
    details: [
      "Ergonomic wing tips for stable fit",
      "Sweatproof nano-coating",
      "Punchy bass with clear vocals",
    ],
    category: "wireless",
    tag: "new",
    images: [
      "https://images.pexels.com/photos/844953/pexels-photo-844953.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  {
    id: "8",
    name: "Monitor Pro Wired",
    price: 8999,
    description:
      "Closed-back wired headphones built for deep focus and detailed listening.",
    details: [
      "45mm dynamic driver architecture",
      "Passive isolation closed-back shell",
      "Replaceable ear pads and cable",
    ],
    category: "headphones",
    images: [
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProducts(category?: string): Product[] {
  if (!category) return products;
  if (category === "new") return products.filter((p) => p.tag === "new");
  if (category === "sale") return products.filter((p) => p.tag === "sale");
  return products.filter((p) => p.category === category);
}

export const categories = [
  { label: "All", value: "" },
  { label: "Earphones", value: "earphones" },
  { label: "Headphones", value: "headphones" },
  { label: "Wireless", value: "wireless" },
  { label: "Studio", value: "studio" },
  { label: "Gaming", value: "gaming" },
];
