'use client';

import Link from 'next/link';
import { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
  const statusLabel =
    product.status === "RESERVED"
      ? "Réservé"
      : product.status === "GIVEN"
      ? "Donné"
      : "Disponible";

  return (
    <article className="bg-white rounded-2xl shadow-xs hover:shadow-md border border-slate-100 transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      <Link href={`/dons/${product.id}`} className="block">
        <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
          <img 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
            src={product.image} 
            alt={product.imageAlt || product.title} 
          />
          <span className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs text-slate-800 text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-xs">
            <img src="/icons/map-marker-alt-solid.svg" alt="Localisation" className="w-3.5 h-3.5" />
            <span>{product.location}</span>
          </span>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">{product.category}</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1.5 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {statusLabel}
            </span>
          </div>
          <h3 className="text-base text-slate-900 font-semibold line-clamp-1 group-hover:text-emerald-700 transition-colors">
            {product.title}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2">{product.description}</p>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <Link 
          href={`/dons/${product.id}`} 
          className="w-full text-xs py-2.5 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5 font-semibold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
        >
          <img src="/icons/handshake-solid.svg" alt="Demander" className="w-4 h-4 filter invert" />
          <span>Demander cet objet</span>
        </Link>
      </div>
    </article>
  );
}
