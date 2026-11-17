import Link from "next/link";

export default function EditProfileHeader() {
  return (
    <div className="flex flex-col gap-2 mb-8">
      {/* Fil d'Ariane */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 group">
          <img
            src="/icons/home-solid.svg"
            alt=""
            className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity"
          />
          <span>Accueil</span>
        </Link>
        <span>›</span>
        <Link href="/profil" className="hover:text-emerald-700 transition-colors">
          Mon compte
        </Link>
        <span>›</span>
        <span className="text-emerald-700 font-bold">Éditer mon profil</span>
      </nav>

      {/* Titre & Statut */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Mon Profil &amp; Paramètres
        </h1>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200/80 rounded-full shadow-xs text-xs font-semibold text-slate-700 self-start md:self-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
          <span>Statut du compte : Actif &amp; Conforme</span>
        </div>
      </div>
    </div>
  );
}
