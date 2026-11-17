import Link from "next/link";

interface ProfileCardProps {
  username: string;
  city: string;
  neighborhood: string;
  donationsCount: number;
  receivedCount: number;
}

export default function ProfileCard({
  username,
  city,
  neighborhood,
  donationsCount,
  receivedCount,
}: ProfileCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-18 h-18 rounded-2xl bg-[#004e3e] text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
            {username.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {username}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-100">
                Membre actif
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <img
                  src="/icons/map-marker-alt-solid.svg"
                  alt=""
                  className="w-3 h-3 opacity-60"
                />
                <span>{city} — {neighborhood}</span>
              </span>
            </div>

            <div className="mt-3">
              <Link
                href="/profil/modifier"
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-[#004e3e] bg-[#eaf6f4] hover:bg-[#a3f2d8] px-3.5 py-2 rounded-lg transition-colors shadow-2xs"
              >
                <img
                  src="/icons/cog-solid.svg"
                  alt=""
                  className="w-3.5 h-3.5 opacity-75"
                />
                <span>Modifier mes informations &amp; paramètres</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Statistiques d'activité */}
        <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
          <div className="text-center">
            <span className="block text-2xl font-extrabold text-[#004e3e]">
              {donationsCount}
            </span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Dons proposés
            </span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-extrabold text-[#004e3e]">
              {receivedCount}
            </span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Objets reçus
            </span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-extrabold text-[#004e3e]">
              {donationsCount + receivedCount}
            </span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Échanges solidaires
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
