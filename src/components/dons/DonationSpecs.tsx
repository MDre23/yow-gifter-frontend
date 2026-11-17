interface DonationSpecsProps {
  description: string;
  category: string;
  condition: string;
  quantity: number;
}

export default function DonationSpecs({
  description,
  category,
  condition,
  quantity,
}: DonationSpecsProps) {
  const conditionLabels: Record<string, string> = {
    NEUF: "Neuf (intact)",
    COMME_NEUF: "Comme neuf (excellent état)",
    TRES_BON: "Très bon état",
    BON: "Bon état (fonctionnel)",
    POUR_PIECES: "Pour pièces",
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          Description de l&apos;objet
        </h2>
        <p className="text-sm text-slate-600 mt-4 leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
        <div className="bg-slate-50 p-3 rounded-xl">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Catégorie
          </span>
          <p className="text-xs font-bold text-slate-800 mt-0.5">
            {category}
          </p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            État d&apos;usure
          </span>
          <p className="text-xs font-bold text-slate-800 mt-0.5">
            {conditionLabels[condition] || condition}
          </p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Quantité
          </span>
          <p className="text-xs font-bold text-slate-800 mt-0.5">
            {quantity} article{quantity > 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
