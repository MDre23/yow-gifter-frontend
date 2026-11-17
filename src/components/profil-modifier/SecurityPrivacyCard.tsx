export default function SecurityPrivacyCard() {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-[#eaf6f4] flex items-center justify-center shrink-0">
        <img
          src="/icons/shield-alt-solid.svg"
          alt=""
          className="w-6 h-6 opacity-85"
        />
      </div>
      <div className="space-y-2">
        <h4 className="text-base font-bold text-slate-900">
          Sécurité &amp; Confidentialité Citoyenne
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          Vos coordonnées exactes, numéro de téléphone et nom complet ne sont jamais divulgués publiquement. Seul votre prénom et votre quartier approximatif sont visibles par les autres membres pour convenir d&apos;une remise d&apos;objet sécurisée.
        </p>
        <div className="pt-1 flex flex-wrap items-center gap-5 text-xs font-semibold text-emerald-800">
          <span className="flex items-center gap-2">
            <img
              src="/icons/eye-slash-solid.svg"
              alt=""
              className="w-4 h-4 opacity-75"
            />
            <span>Aucune publicité ciblée</span>
          </span>
          <span className="flex items-center gap-2">
            <img
              src="/icons/handshake-solid.svg"
              alt=""
              className="w-4 h-4 opacity-75"
            />
            <span>Zéro donnée vendue</span>
          </span>
        </div>
      </div>
    </div>
  );
}
