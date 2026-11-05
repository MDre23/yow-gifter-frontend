'use client';

import { useState } from 'react';
import { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleRequest = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 750);
  };

  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-slate-100 transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      <div>
        <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
          <img 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
            src={product.image} 
            alt={product.imageAlt || product.title} 
          />
          <span className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-slate-800 text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-xs">
            <img src="/icons/map-marker-alt-solid.svg" alt="Localisation" className="w-3.5 h-3.5" />
            <span>{product.location}</span>
          </span>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">{product.category}</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1.5 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {product.status || 'Disponible'}
            </span>
          </div>
          <h3 className="text-base text-slate-900 font-semibold line-clamp-1">{product.title}</h3>
          <p className="text-xs text-slate-500 line-clamp-2">{product.description}</p>
        </div>
      </div>
      <div className="p-4 pt-0">
        <button 
          onClick={handleRequest} 
          disabled={status !== 'idle'}
          className={`w-full text-xs py-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5 font-semibold ${
            status === 'success' ? 'bg-emerald-800 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          {status === 'loading' && <img src="/icons/sync-solid.svg" alt="Chargement" className="w-4 h-4 animate-spin" />}
          {status === 'success' && <img src="/icons/check-solid.svg" alt="Succès" className="w-4 h-4 filter invert" />}
          {status === 'idle' && <img src="/icons/handshake-solid.svg" alt="Demander" className="w-4 h-4 filter invert" />}
          <span>{status === 'loading' ? 'Enregistrement...' : status === 'success' ? 'Demande envoyée !' : 'Demander cet objet'}</span>
        </button>
      </div>
    </article>
  );
}