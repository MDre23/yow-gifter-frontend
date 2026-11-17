import Link from "next/link";

export interface RequestItem {
  id: string;
  donationId: string;
  title: string;
  image: string;
  donorName: string;
  status: string;
  position: number;
  requestedAt: string;
  expiresAt?: string;
}

interface UserRequestsListProps {
  requests: RequestItem[];
}

export default function UserRequestsList({
  requests,
}: UserRequestsListProps) {
  return (
    <div className="space-y-4">
      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
        Suivi de vos demandes en cours
      </span>

      <div className="grid grid-cols-1 gap-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={req.image}
                alt=""
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {req.status === "PRIORITY" && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                      Prioritaire (#1)
                    </span>
                  )}
                  {req.status === "WAITING" && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900">
                      En attente (Position #{req.position})
                    </span>
                  )}
                  {req.status === "COMPLETED" && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-slate-900 text-white">
                      Objet récupéré ✓
                    </span>
                  )}

                  {req.expiresAt && (
                    <span className="text-[10px] font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Délai : {req.expiresAt}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {req.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Proposé par {req.donorName} • Demandé le {req.requestedAt}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              {req.status === "PRIORITY" && (
                <Link
                  href="/messages"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <img src="/icons/comments-solid.svg" alt="" className="w-3.5 h-3.5 filter invert" />
                  <span>Fixer le rendez-vous</span>
                </Link>
              )}

              <Link
                href={`/dons/${req.donationId}`}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
              >
                Détails
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
