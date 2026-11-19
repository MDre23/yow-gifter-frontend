import Link from "next/link";

export default function AuthHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo → Accueil */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
            src="/images/logo.png"
            alt="Logo Yow Gifter"
            className="h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <span className="font-bold text-emerald-700 text-xl tracking-tight group-hover:text-emerald-800 transition-colors">
            Yow Gifter
          </span>
        </Link>

        {/* Lien retour accueil */}
        <Link
          href="/"
          className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5"
        >
          <img
            src="/icons/arrow-left-solid.svg"
            alt=""
            className="w-3.5 h-3.5 opacity-70"
          />
          Retour à l&apos;accueil
        </Link>
      </div>
    </header>
  );
}