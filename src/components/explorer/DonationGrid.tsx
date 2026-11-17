import DonationCard from "./DonationCard";
import { Donation } from "@/types";

interface DonationGridProps {
  items: Donation[];
  onResetFilters: () => void;
}

export default function DonationGrid({
  items,
  onResetFilters,
}: DonationGridProps) {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 my-8">
        <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-xl mb-3 text-slate-400">
          🔍
        </div>
        <h3 className="text-base font-bold text-slate-800">
          Aucun objet ne correspond à vos critères
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Modifiez vos filtres ou effectuez une recherche plus large pour voir d&apos;autres propositions.
        </p>
        <button
          onClick={onResetFilters}
          className="mt-4 px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          Réinitialiser les filtres
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <DonationCard key={item.id} item={item} />
      ))}
    </div>
  );
}
