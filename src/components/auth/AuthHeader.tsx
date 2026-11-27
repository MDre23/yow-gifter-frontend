// AuthHeader.tsx
import Link from "next/link";

export default function AuthHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#062B20]/45 backdrop-blur-md border-b border-white/15 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-14 flex items-center justify-between">
        {/* Logo → Accueil */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
            src="/images/logo.png"
            alt="Logo Yow Gifter"
            className="h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105 bg-white/95 rounded-lg p-1"
          />
          <span className="font-bold text-white text-lg tracking-tight group-hover:text-[#E7F3EF] transition-colors">
            Yow Gifter
          </span>
        </Link>

        {/* Lien retour accueil */}
        <Link
          href="/"
          className="text-xs sm:text-sm font-medium text-[#E7F3EF] hover:text-white transition-colors flex items-center gap-1.5"
        >
          <img
            src="/icons/arrow-left-solid.svg"
            alt=""
            className="w-3.5 h-3.5 opacity-80 filter invert"
          />
          Retour à l&apos;accueil
        </Link>
      </div>
    </header>
  );
}