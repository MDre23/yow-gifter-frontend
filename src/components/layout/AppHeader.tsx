"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { authService } from "@/services/auth.service";
import { conversationService } from "@/services/conversation.service";

export default function AppHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState<{ name: string; location: string }>({
    name: "Mon Compte",
    location: "Yaoundé",
  });
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const pathname = usePathname();
  const router = useRouter();

  // Contrôle strict d'accès & Chargement dynamique du profil
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("yg_authenticated");
      if (!isAuth) {
        router.replace("/auth");
        return;
      }
      const storedName = localStorage.getItem("yg_username");
      if (storedName) {
        setCurrentUser({
          name: storedName,
          location: "Melen • Yaoundé",
        });
      }

      // Chargement dynamique depuis l'API backend si disponible
      authService.getMe().then((me) => {
        if (me) {
          setCurrentUser({
            name: `${me.firstName} ${me.lastName ? me.lastName[0] + "." : ""}`,
            location: me.neighborhood || me.city || "Yaoundé",
          });
        }
      }).catch(() => {});

      // Nombre dynamique de conversations
      conversationService.getMyConversations().then((convs) => {
        if (convs && Array.isArray(convs)) {
          setUnreadCount(convs.length);
        }
      }).catch(() => {});
    }
  }, [router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/explorer?q=${encodeURIComponent(search.trim())}`);
    } else {
      router.push(`/explorer`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-20 max-w-[1280px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-4 shrink-0">
          <Link href="/explorer" className="flex items-center gap-2.5 group">
            <img
              src="/images/logo.png"
              alt="Logo Yow Gifter"
              className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <span className="font-bold text-[#004e3e] text-xl tracking-tight leading-none">
              Yow Gifter
            </span>
          </Link>
        </div>

        {/* Barre de recherche centrale */}
        <div className="flex-1 max-w-md hidden md:block mx-4">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un objet, livre, vêtement..."
              className="w-full h-11 pl-10 pr-4 rounded-full bg-[#eaf6f4] text-slate-800 placeholder:text-slate-500 text-sm transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004e3e]/20"
            />
          </form>
        </div>

        {/* Navigation & Actions Desktop */}
        <div className="flex items-center gap-3 shrink-0">
          <nav className="hidden xl:flex items-center gap-1">
            <Link
              href="/explorer"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                pathname === "/explorer"
                  ? "bg-[#0d6854] text-white"
                  : "text-slate-700 hover:text-[#004e3e] hover:bg-slate-100"
              }`}
            >
              Explorer les dons
            </Link>

            <Link
              href="/profil"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                pathname === "/profil"
                  ? "bg-[#0d6854] text-white"
                  : "text-slate-700 hover:text-[#004e3e] hover:bg-slate-100"
              }`}
            >
              Mes demandes
            </Link>

            <Link
              href="/messages"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                pathname === "/messages"
                  ? "bg-[#0d6854] text-white"
                  : "text-slate-700 hover:text-[#004e3e] hover:bg-slate-100"
              }`}
            >
              <span>Messages</span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#006a6a] text-white text-xs font-bold leading-none">
                  {unreadCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Bouton Donner un objet */}
          <Link
            href="/donner"
            className="h-11 px-5 rounded-full bg-[#004e3e] hover:bg-[#0d6854] text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-[0_2px_8px_rgba(13,104,84,0.16)] shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">Donner un objet</span>
          </Link>

          {/* Chip Profil Utilisateur Dynamique */}
          <Link
            href="/profil/modifier"
            className="flex items-center gap-2.5 pl-2 hover:opacity-85 transition-opacity"
            title="Mon profil & Paramètres"
          >
            <div className="w-9 h-9 rounded-full bg-[#004e3e] flex items-center justify-center text-white shrink-0 shadow-xs font-bold text-xs">
              {currentUser.name ? currentUser.name.slice(0, 2).toUpperCase() : "YG"}
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {currentUser.name}
              </span>
              <span className="text-[11px] text-slate-500 leading-tight">
                {currentUser.location}
              </span>
            </div>
          </Link>

          {/* Menu Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            aria-label="Menu"
          >
            {isOpen ? <span className="text-2xl">×</span> : <span className="text-xl">☰</span>}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="xl:hidden bg-white border-t border-slate-100 shadow-lg px-4 py-4 space-y-2 animate-in slide-in-from-top-2">
          {/* Recherche mobile */}
          <form onSubmit={handleSearch} className="relative mb-3">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un objet..."
              className="w-full h-10 pl-9 pr-4 rounded-full bg-slate-100 text-sm focus:outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </form>

          <Link
            href="/explorer"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Explorer les dons
          </Link>
          <Link
            href="/profil"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Mes demandes
          </Link>
          <Link
            href="/messages"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <span>Messages</span>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#006a6a] text-white text-xs font-bold">
                {unreadCount}
              </span>
            )}
          </Link>
          <Link
            href="/donner"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 bg-[#004e3e] text-white text-sm font-bold px-4 py-3 rounded-xl shadow-xs"
          >
            <span>Donner un objet</span>
          </Link>
          <Link
            href="/profil/modifier"
            onClick={() => setIsOpen(false)}
            className="block text-center text-slate-600 text-xs py-2 hover:underline"
          >
            Mon profil & Paramètres ({currentUser.name} • {currentUser.location})
          </Link>
        </div>
      )}
    </header>
  );
}
