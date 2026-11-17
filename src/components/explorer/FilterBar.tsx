import { YAOUNDE_NEIGHBORHOODS } from "@/lib/data";

interface FilterBarProps {
  selectedCondition: string;
  selectedNeighborhood: string;
  selectedStatus: string;
  onChangeCondition: (val: string) => void;
  onChangeNeighborhood: (val: string) => void;
  onChangeStatus: (val: string) => void;
}

export default function FilterBar({
  selectedCondition,
  selectedNeighborhood,
  selectedStatus,
  onChangeCondition,
  onChangeNeighborhood,
  onChangeStatus,
}: FilterBarProps) {
  return (
    <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
          État d&apos;usure
        </label>
        <select
          value={selectedCondition}
          onChange={(e) => onChangeCondition(e.target.value)}
          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-600"
        >
          <option value="all">Tous les états</option>
          <option value="NEUF">Neuf</option>
          <option value="COMME_NEUF">Comme neuf</option>
          <option value="TRES_BON">Très bon état</option>
          <option value="BON">Bon état</option>
          <option value="POUR_PIECES">Pour pièces</option>
        </select>
      </div>

      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
          Quartier (Yaoundé)
        </label>
        <select
          value={selectedNeighborhood}
          onChange={(e) => onChangeNeighborhood(e.target.value)}
          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-600"
        >
          <option value="all">Tous les quartiers</option>
          {YAOUNDE_NEIGHBORHOODS.map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
          Disponibilité
        </label>
        <select
          value={selectedStatus}
          onChange={(e) => onChangeStatus(e.target.value)}
          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-600"
        >
          <option value="all">Toutes les annonces</option>
          <option value="AVAILABLE">Disponible</option>
          <option value="RESERVED">En cours de réservation</option>
          <option value="GIVEN">Donnés</option>
        </select>
      </div>
    </div>
  );
}
