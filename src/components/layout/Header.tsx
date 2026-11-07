"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Barre principale */}
        <div className="h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="font-bold text-emerald-700 text-xl">
            Yow Gifter
          </Link>

          {/* Bouton Menu Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            aria-label="Menu"
          >
            {isOpen ? (
              <span className="text-2xl font-light">×</span>
            ) : (
              <span className="text-xl">☰</span>
            )}
          </button>

          {/* Actions Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="#donner"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2.5 rounded-lg font-semibold"
            >
              Donner un objet
            </Link>
            <Link
              href="#"
              className="text-emerald-800 hover:bg-emerald-50 text-sm px-3 py-2 rounded-lg"
            >
              Se connecter
            </Link>
          </div>
        </div>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex gap-2 pb-3">
          <Link href="/" className="px-4 py-1.5 bg-emerald-600 text-white text-sm font-semibold rounded-full">
            Accueil
          </Link>
          <Link href="#livres" className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-emerald-50 rounded-full">
            Livres
          </Link>
          <Link href="#vetements" className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-emerald-50 rounded-full">
            Vêtements
          </Link>
          <Link href="#mobilier" className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-emerald-50 rounded-full">
            Mobilier
          </Link>
          <Link href="#informatique" className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-emerald-50 rounded-full">
            Informatique
          </Link>
          <Link href="#equipements" className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-emerald-50 rounded-full">
            Équipements domestiques
          </Link>
          <Link href="#comment-ca-marche" className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-emerald-50 rounded-full">
            Comment ça marche
          </Link>
        </nav>
      </div>

      {/* ===== MENU MOBILE ===== */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="px-4 py-4 flex flex-col gap-1">
            <Link href="/" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-lg text-sm font-semibold bg-emerald-50 text-emerald-700">
              Accueil
            </Link>
            <Link href="#livres" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-lg text-sm text-slate-700 hover:bg-slate-50">
              Livres
            </Link>
            <Link href="#vetements" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-lg text-sm text-slate-700 hover:bg-slate-50">
              Vêtements
            </Link>
            <Link href="#mobilier" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-lg text-sm text-slate-700 hover:bg-slate-50">
              Mobilier
            </Link>
            <Link href="#informatique" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-lg text-sm text-slate-700 hover:bg-slate-50">
              Informatique
            </Link>
            <Link href="#equipements" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-lg text-sm text-slate-700 hover:bg-slate-50">
              Équipements domestiques
            </Link>
            <Link href="#comment-ca-marche" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-lg text-sm text-slate-700 hover:bg-slate-50">
              Comment ça marche
            </Link>

            <div className="border-t border-slate-100 my-3"></div>

            <Link
              href="#donner"
              onClick={() => setIsOpen(false)}
              className="block text-center bg-emerald-600 text-white text-sm font-semibold px-4 py-3 rounded-lg"
            >
              Donner un objet
            </Link>
            <Link
              href="#"
              onClick={() => setIsOpen(false)}
              className="block text-center text-emerald-800 text-sm font-medium px-4 py-3 rounded-lg hover:bg-emerald-50"
            >
              Se connecter
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}