interface CloseTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CloseTransactionModal({
  isOpen,
  onClose,
  onConfirm,
}: CloseTransactionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl mx-auto mb-3 font-bold">
          ✓
        </div>
        <h3 className="text-lg font-bold text-slate-900 text-center">
          Confirmer la remise effective de l&apos;objet
        </h3>
        <p className="text-xs text-slate-600 text-center mt-2 leading-relaxed">
          En confirmant, vous certifiez que l&apos;objet a été remis en main propre.
          L&apos;annonce sera définitivement marquée comme <strong>« Donné »</strong> et
          retirée des résultats de recherche.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
          >
            Confirmer la remise
          </button>
        </div>
      </div>
    </div>
  );
}