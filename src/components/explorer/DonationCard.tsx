import Link from "next/link";
import { Donation } from "@/types";

interface DonationCardProps {
  item: Donation;
}

export default function DonationCard({ item }: DonationCardProps) {
  const isGiven = item.status === "GIVEN";
  const isReserved = item.status === "RESERVED";

  const conditionLabels: Record<string, string> = {
    NEUF: "Neuf",
    COMME_NEUF: "Comme neuf",
    TRES_BON: "Très bon état",
    BON: "Bon état",
    POUR_PIECES: "Pour pièces",
  };

  return (
    <Link
      href={`/dons/${item.id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/70 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col"
    >
      {/* Conteneur Image */}
      <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badge Statut (Sans mention 0 FCFA) */}
        {isGiven ? (
          <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            Donné ✓
          </span>
        ) : isReserved ? (
          <span className="absolute top-3 right-3 bg-amber-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <span>Réservé</span>
            {item.queueCount ? `(${item.queueCount} en attente)` : ""}
          </span>
        ) : (
          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            Disponible
          </span>
        )}

        {/* Quota Photos indicator */}
        <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-md font-semibold backdrop-blur-xs">
          {item.images.length}/2 photo{item.images.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Contenu de la carte */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* En-tête donateur */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold text-slate-700 truncate max-w-[130px]">
              {item.donor.username}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              {item.category}
            </span>
          </div>

          {/* Titre */}
          <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Métadonnées & Bas de carte */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1 text-slate-600">
            <img src="/icons/map-marker-alt-solid.svg" alt="" className="w-3 h-3 opacity-60" />
            <span className="font-medium truncate max-w-[150px]">{item.neighborhood}</span>
          </div>

          <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium text-[11px]">
            {conditionLabels[item.condition] || item.condition}
          </span>
        </div>
      </div>
    </Link>
  );
}
