import { CATEGORIES } from "@/lib/data";

interface CategoryPillsProps {
  selectedCategory: string;
  totalCount: number;
  onSelectCategory: (cat: string) => void;
}

export default function CategoryPills({
  selectedCategory,
  totalCount,
  onSelectCategory,
}: CategoryPillsProps) {
  return (
    <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
      <button
        onClick={() => onSelectCategory("Tous")}
        className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-xs cursor-pointer ${
          selectedCategory === "Tous"
            ? "bg-emerald-700 text-white"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
        }`}
      >
        Tous les dons ({totalCount})
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.label}
          onClick={() => onSelectCategory(cat.label)}
          className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-xs cursor-pointer ${
            selectedCategory === cat.label
              ? "bg-emerald-700 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
