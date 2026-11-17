import Link from "next/link";
import { Donation } from "@/types";

interface UserDonationsListProps {
  donations: Donation[];
}

export default function UserDonationsList({
  donations,
}: UserDonationsListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Vos annonces en ligne
        </span>
        <Link
          href="/donner"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
        >
          <img src="/icons/plus-circle-solid.svg" alt="" className="w-3.5 h-3.5 filter invert" />
          <span>Nouveau don</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {donations.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.images[0]}
                alt=""
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {item.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      item.status === "AVAILABLE"
                        ? "bg-emerald-100 text-emerald-800"
                        : item.status === "RESERVED"
                        ? "bg-amber-100 text-amber-900"
                        : "bg-slate-900 text-white"
                    }`}
                  >
                    {item.status === "AVAILABLE"
                      ? "Disponible"
                      : item.status === "RESERVED"
                      ? "Réservé"
                      : "Donné ✓"}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {item.neighborhood} • {item.images.length}/2 photo{item.images.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <Link
                href={`/dons/${item.id}`}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
              >
                Consulter
              </Link>
              <Link
                href="/messages"
                className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors"
              >
                Messages & RDV
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
