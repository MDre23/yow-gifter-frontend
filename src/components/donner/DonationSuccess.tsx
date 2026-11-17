import Link from "next/link";

interface DonationSuccessProps {
  onReset: () => void;
}

export default function DonationSuccess({ onReset }: DonationSuccessProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-emerald-100 text-center animate-in fade-in">
      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center text-3xl mb-4">
        ✓
      </div>
      <h2 className="text-2xl font-bold text-slate-900">
        Votre don a été publié avec succès !
      </h2>
      <p className="text-slate-600 text-sm max-w-md mx-auto mt-2">
        Il est maintenant visible dans le catalogue. Les personnes intéressées pourront s&apos;inscrire dans la file d&apos;attente selon l&apos;ordre d&apos;arrivée.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/explorer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all"
        >
          Voir dans le catalogue
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm px-6 py-3 rounded-xl transition-all cursor-pointer"
        >
          Publier un autre don
        </button>
      </div>
    </div>
  );
}
