interface DonorCardProps {
  username: string;
  neighborhood: string;
  campusBadge?: string;
}

export default function DonorCard({
  username,
  neighborhood,
}: DonorCardProps) {
  return (
    <div className="space-y-4 pt-4 border-t border-slate-100">
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
          Proposé par
        </span>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm">
            {username.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">
                {username}
              </span>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-md border border-emerald-200/50">
                Membre vérifié
              </span>
            </div>
            <span className="text-[11px] text-slate-500">
              {neighborhood}
            </span>
          </div>
        </div>
      </div>

      {/* Garantie de confidentialité */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px] text-slate-500 flex items-start gap-2">
        <img src="/icons/shield-alt-solid.svg" alt="" className="w-3.5 h-3.5 opacity-60 mt-0.5 shrink-0" />
        <span>
          <strong>Confidentialité garantie :</strong> Le numéro de téléphone et le lieu de rencontre exact ne sont échangés que dans la messagerie privée après confirmation de la priorité.
        </span>
      </div>
    </div>
  );
}
