import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] bg-white/95 border-b border-slate-100">
      <div className="h-28 max-w-7xl mx-auto px-4 sm:px-8 flex flex-col justify-between py-2">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="font-bold text-emerald-700 text-xl tracking-tight">Yow Gifter</span>
          </Link>
          
          <div className="flex-1 max-w-2xl hidden md:flex items-center bg-slate-50 border border-slate-200/80 rounded-full px-4 py-1">
            <img src="/icons/search-solid.svg" alt="Recherche" className="w-4 h-4 text-slate-400 mr-2 opacity-60" />
            <input 
              className="w-full bg-transparent border-0 focus:outline-none text-slate-900 text-sm placeholder:text-slate-400" 
              placeholder="Rechercher un objet, vêtement, meuble (0 FCFA)..." 
              type="text" 
            />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="#donner" className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2.5 rounded-lg transition-colors font-semibold shadow-sm">
              Donner un objet
            </Link>
            <Link href="#" className="hidden sm:inline-flex items-center justify-center text-emerald-800 hover:bg-emerald-50 text-sm px-3 py-2 rounded-lg transition-colors gap-1.5">
              <img src="/icons/sign-in-alt-solid.svg" alt="Connexion" className="w-4 h-4 opacity-75" />
              <span>Se connecter</span>
            </Link>
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
              <img src="/icons/user-solid.svg" alt="Profil" className="w-4 h-4 filter invert brightness-200" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between overflow-x-auto pb-1 pt-1">
          <nav className="flex items-center gap-2 shrink-0">
            <Link href="#" className="px-4 py-1.5 shrink-0 bg-emerald-600 text-white text-sm font-semibold rounded-full">Accueil</Link>
            <Link href="#livres" className="text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors shrink-0">Livres</Link>
            <Link href="#vetements" className="text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors shrink-0">Vêtements</Link>
            <Link href="#mobilier" className="text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors shrink-0">Mobilier</Link>
            <Link href="#informatique" className="text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors shrink-0">Informatique</Link>
            <Link href="#equipements" className="text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors shrink-0">Équipements domestiques</Link>
            <Link href="#comment-ca-marche" className="text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors shrink-0">Comment ça marche</Link>
          </nav>
          
        </div>
      </div>
    </header>
  );
}