import { YAOUNDE_NEIGHBORHOODS } from "@/lib/data";

interface LocationSectionProps {
  city: string;
  neighborhood: string;
  onChangeNeighborhood: (val: string) => void;
}

export default function LocationSection({
  city,
  neighborhood,
  onChangeNeighborhood,
}: LocationSectionProps) {
  return (
    <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-100 space-y-5">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold">
            3
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            Localisation approximative
          </h2>
          
        </div>
        <p className="text-xs text-slate-500 mt-1 pl-9">
          Indiquez seulement votre secteur. Votre adresse exacte ne sera échangée qu&apos;en privé avec le bénéficiaire retenu.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Ville
          </label>
          <input
            type="text"
            disabled
            value={city}
            className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-700 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Quartier / Secteur <span className="text-red-500">*</span>
          </label>
          <select
            value={neighborhood}
            onChange={(e) => onChangeNeighborhood(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600"
          >
            {YAOUNDE_NEIGHBORHOODS.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
        <img
          src="/icons/shield-alt-solid.svg"
          alt=""
          className="w-4 h-4 opacity-60 mt-0.5 shrink-0"
        />
        <p className="text-xs text-slate-600 leading-relaxed">
          <strong>Respect strict de la vie privée :</strong> Ni votre numéro de téléphone, ni votre nom de famille, ni votre adresse exacte ne sont affichés publiquement sur l&apos;annonce.
        </p>
      </div>
    </section>
  );
}
