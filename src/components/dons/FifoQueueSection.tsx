"use client";

import Link from "next/link";

interface FifoQueueSectionProps {
  userQueueStatus: "NONE" | "PRIORITY" | "WAITING";
  queuePosition: number;
  totalQueue: number;
  timeLeft: number;
  formatTime: (seconds: number) => string;
  onJoinQueue: () => void;
  onCancelRequest: () => void;
}

export default function FifoQueueSection({
  userQueueStatus,
  queuePosition,
  totalQueue,
  timeLeft,
  formatTime,
  onJoinQueue,
  onCancelRequest,
}: FifoQueueSectionProps) {
  return (
    <div className="rounded-2xl border p-5 transition-all bg-slate-50 border-slate-200">
      
      {/* CAS 1 : Prioritaire (Rang #1) */}
      {userQueueStatus === "PRIORITY" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
              Bénéficiaire Prioritaire (Rang #1)
            </span>
            <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              Délai : {formatTime(timeLeft)}
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Vous êtes le premier demandeur pour cet objet. Vous disposez d&apos;un délai exclusif pour convenir du rendez-vous de remise avec le donateur.
          </p>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/messages"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm text-center flex items-center justify-center gap-2 transition-all"
            >
              <img src="/icons/comments-solid.svg" alt="" className="w-4 h-4 filter invert" />
              <span>Contacter le donateur & fixer le RDV</span>
            </Link>

            <button
              type="button"
              onClick={onCancelRequest}
              className="w-full py-2.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Se désister (céder au demandeur suivant)
            </button>
          </div>
        </div>
      )}

      {/* CAS 2 : En attente dans la file (Rang #2, #3...) */}
      {userQueueStatus === "WAITING" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold">
              File d&apos;attente : Position #{queuePosition}
            </span>
            <span className="text-xs text-slate-500">
              Total en file : {totalQueue}
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Un autre bénéficiaire est actuellement en échange avec le donateur. En cas de désistement ou d&apos;expiration de son délai, vous passerez automatiquement au rang supérieur.
          </p>

          <button
            type="button"
            onClick={onCancelRequest}
            className="w-full py-2.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Quitter la file d&apos;attente
          </button>
        </div>
      )}

      {/* CAS 3 : Aucun statut */}
      {userQueueStatus === "NONE" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              Ordre d&apos;arrivée équitable
            </span>
            <span className="text-xs text-slate-500">
              {totalQueue === 0
                ? "Aucun demandeur en attente"
                : `${totalQueue} personne(s) en file`}
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Premier demandeur, premier servi. Si vous êtes le premier à faire la demande, l&apos;objet vous est automatiquement réservé.
          </p>

          <button
            type="button"
            onClick={onJoinQueue}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <img src="/icons/hand-holding-heart-solid.svg" alt="" className="w-4 h-4 filter invert" />
            <span>Demander cet objet</span>
          </button>
        </div>
      )}
    </div>
  );
}
