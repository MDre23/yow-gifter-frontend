export default function Manifesto() {
  return (
    <section className="py-16 bg-slate-50/60 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-3xl p-6 lg:p-12 shadow-sm border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-emerald-800 text-xs bg-emerald-50 border border-emerald-200/80 px-4 py-1 rounded-full font-semibold">
                <img src="/icons/shield-alt-solid.svg" alt="Sécurité" className="w-4 h-4" />
                <span>Charte &amp; Confiance</span>
              </div>
              <h2 className="text-2xl lg:text-3xl text-slate-900 font-bold">Un cadre numérique éthique, transparent et sécurisé</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Conçue pour favoriser la solidarité de proximité, le réemploi écologique et l'accès universel aux biens essentiels sans échange financier.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 p-1.5">
                    <img src="/icons/lock-solid.svg" alt="Cadenas" className="w-4 h-4 filter invert" />
                  </div>
                  <div>
                    <h4 className="text-sm text-slate-900 font-semibold">Confidentialité absolue</h4>
                    <p className="text-xs text-slate-500">Aucun numéro de téléphone ni adresse exacte ne sont publiés. La géolocalisation est systématiquement arrondie au secteur de quartier.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 p-1.5">
                    <img src="/icons/balance-scale-solid.svg" alt="Équité" className="w-4 h-4 filter invert" />
                  </div>
                  <div>
                    <h4 className="text-sm text-slate-900 font-semibold">Équité et courtoisie</h4>
                    <p className="text-xs text-slate-500">Attribution bienveillante et transparente pour éviter tout accaparement ou dérive commerciale.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 p-1.5">
                    <img src="/icons/feather-solid.svg" alt="Léger" className="w-4 h-4 filter invert" />
                  </div>
                  <div>
                    <h4 className="text-sm text-slate-900 font-semibold">Sobriété &amp; bas débit</h4>
                    <p className="text-xs text-slate-500">Interface légère sans scripts lourds, optimisée pour fonctionner avec une très faible consommation de données mobiles.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full max-w-md bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 text-center space-y-4 shadow-xs">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md p-3">
                  <img src="/icons/users-solid.svg" alt="Communauté" className="w-8 h-8 filter invert" />
                </div>
                <div>
                  <h3 className="text-base text-slate-900 font-bold">Une initiative ouverte et neutre</h3>
                  <p className="text-xs text-emerald-700 font-semibold mt-0.5">Pour le bien commun &amp; l'économie circulaire</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  « Promouvoir une entraide matérielle concrète, digne et accessible à chaque citoyen et famille, sans exclusion ni spéculation. »
                </p>
                <div className="pt-2 flex items-center justify-center gap-4 text-emerald-800 text-xs font-medium">
                  <span className="flex items-center gap-1.5">
                    <img src="/icons/check-circle-solid.svg" alt="Validé" className="w-4 h-4" /> 100% Non-lucratif
                  </span>
                  <span className="flex items-center gap-1.5">
                    <img src="/icons/check-circle-solid.svg" alt="Validé" className="w-4 h-4" /> Don de proximité
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}