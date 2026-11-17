"use client";

interface PhotoUploadSectionProps {
  images: string[];
  showQuotaAlert: boolean;
  quotaAttemptMessage: string;
  onAddImage: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
  onDismissAlert: () => void;
}

export default function PhotoUploadSection({
  images,
  showQuotaAlert,
  quotaAttemptMessage,
  onAddImage,
  onRemoveImage,
  onDismissAlert,
}: PhotoUploadSectionProps) {
  return (
    <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-100 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold">
              1
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              Photos de l&apos;objet
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
              2 photos maximum
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 pl-9">
            Une ou deux photos bien éclairées suffisent pour apprécier l&apos;état général de l&apos;objet.
          </p>
        </div>
      </div>

      {/* Grille des slots de photos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Slot 1 */}
        {images[0] ? (
          <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group aspect-4/3 flex flex-col">
            <img
              src={images[0]}
              alt="Photo 1"
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <span className="absolute top-2 left-2 bg-black/60 text-white text-[11px] px-2 py-0.5 rounded-md backdrop-blur-xs font-semibold">
              Photo 1 (Principale)
            </span>
            <button
              type="button"
              onClick={() => onRemoveImage(0)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
              title="Supprimer la photo 1"
            >
              ✕
            </button>
          </div>
        ) : (
          <label className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/30 hover:bg-emerald-50/70 rounded-xl aspect-4/3 flex flex-col items-center justify-center cursor-pointer transition-colors p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl mb-2 font-bold">
              +
            </div>
            <span className="text-xs font-bold text-emerald-900">
              Ajouter photo 1
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5">
              Vue d&apos;ensemble
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onAddImage}
            />
          </label>
        )}

        {/* Slot 2 */}
        {images[1] ? (
          <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group aspect-4/3 flex flex-col">
            <img
              src={images[1]}
              alt="Photo 2"
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <span className="absolute top-2 left-2 bg-black/60 text-white text-[11px] px-2 py-0.5 rounded-md backdrop-blur-xs font-semibold">
              Photo 2 (Détail)
            </span>
            <button
              type="button"
              onClick={() => onRemoveImage(1)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
              title="Supprimer la photo 2"
            >
              ✕
            </button>
          </div>
        ) : images.length === 1 ? (
          <label className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/30 hover:bg-emerald-50/70 rounded-xl aspect-4/3 flex flex-col items-center justify-center cursor-pointer transition-colors p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl mb-2 font-bold">
              +
            </div>
            <span className="text-xs font-bold text-emerald-900">
              Ajouter photo 2
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5">
              Sous un autre angle
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onAddImage}
            />
          </label>
        ) : null}

        {/* Slot 3 : Verrouillé (règle des 2 photos max) */}
        <div className="relative border-2 border-dashed border-slate-200 bg-slate-50/70 rounded-xl aspect-4/3 flex flex-col items-center justify-center p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-lg mb-2 font-bold">
            ⊘
          </div>
          <span className="text-xs font-bold text-slate-600">
            Limite atteinte
          </span>
          <span className="text-[10px] text-slate-400 mt-1 max-w-[170px] leading-tight">
            Maximum de 2 photos autorisé par annonce
          </span>
          <button
            type="button"
            onClick={() => onAddImage()}
            className="mt-3 px-3 py-1.5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 text-[11px] font-semibold transition-colors cursor-pointer"
          >
            Tester l&apos;ajout d&apos;une 3ᵉ photo
          </button>
        </div>
      </div>

      {/* Bannière d'alerte en cas de dépassement */}
      {showQuotaAlert && (
        <div className="rounded-xl bg-red-50 border-2 border-red-500/80 p-4 shadow-sm flex items-start gap-3 animate-pulse">
          <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 font-bold text-lg">
            !
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wide text-red-900">
                Limite de 2 photos atteinte
              </span>
              <button
                type="button"
                onClick={onDismissAlert}
                className="text-red-500 hover:text-red-800 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-xs font-medium text-red-800 mt-1 leading-relaxed">
              {quotaAttemptMessage}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
