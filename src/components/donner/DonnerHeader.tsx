import Link from "next/link";

interface DonnerHeaderProps {
  photoCount: number;
}

export default function DonnerHeader({ photoCount }: DonnerHeaderProps) {
  return (
    <>
      {/* Fil d'Ariane */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
        <Link href="/" className="hover:text-emerald-700 transition-colors">
          Accueil
        </Link>
        <span>/</span>
        <Link href="/explorer" className="hover:text-emerald-700 transition-colors">
          Dons
        </Link>
        <span>/</span>
        <span className="text-emerald-700">Publier une annonce</span>
      </div>

      {/* En-tête */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-100 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            Partage citoyen
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Donner un objet
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Offrez une seconde vie à vos objets encore utilisables auprès de vos voisins et de votre communauté.
          </p>
        </div>

        {/* Compteur multimédia */}
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200/80 shrink-0">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base shadow-xs ${
              photoCount === 2
                ? "bg-amber-100 text-amber-900"
                : "bg-emerald-100 text-emerald-800"
            }`}
          >
            {photoCount}/2
          </div>
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Photos ajoutées
            </span>
            <span
              className={`text-xs font-bold ${
                photoCount === 2 ? "text-amber-700" : "text-emerald-700"
              }`}
            >
              {photoCount === 2 ? "Maximum atteint (2/2)" : `${2 - photoCount} emplacement restant`}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
