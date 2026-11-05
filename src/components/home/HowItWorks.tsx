export default function HowItWorks() {
  const steps = [
    { num: '01', icon: '/icons/camera-solid.svg', title: 'Publiez en 2 minutes', desc: 'Photos et description simple, précisez votre zone approximative (ex: Melen, Bastos, Biyem-Assi).', badge: 'Aucune adresse exacte requise' },
    { num: '02', icon: '/icons/balance-scale-solid.svg', title: 'Attribution équitable', desc: "Attribution transparente et directe selon l'ordre des demandes. Aucun favoritisme ni négociation marchande.", badge: 'Clarté pour chaque participant' },
    { num: '03', icon: '/icons/comment-alt-solid.svg', title: 'Messagerie sécurisée', desc: "Échange privé et bienveillant entre donateur et bénéficiaire pour convenir facilement d'un rendez-vous.", badge: 'Numéro privé préservé' },
    { num: '04', icon: '/icons/handshake-solid.svg', title: 'Remise en main propre', desc: 'Rencontre conviviale dans un lieu public convenu. L\'annonce est ensuite simplement clôturée.', badge: 'Zéro FCFA échangé', highlight: true },
  ];

  return (
    <section className="py-16 bg-white" id="comment-ca-marche">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-wider text-emerald-700 font-bold">Protocole simple &amp; transparent</span>
          <h2 className="text-2xl lg:text-3xl text-slate-900 mt-1 font-bold">Le cycle de don en 4 étapes simples</h2>
          <p className="text-sm text-slate-600 mt-2">Pensé pour éliminer les spéculations et préserver la tranquillité des donateurs et demandeurs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div key={idx} className="bg-slate-50/70 border border-slate-100 p-6 rounded-2xl shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-emerald-600/30">{s.num}</span>
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center p-2">
                    <img src={s.icon} alt={s.title} className="w-5 h-5 object-contain" />
                  </div>
                </div>
                <h3 className="text-base text-slate-900 font-semibold mb-1">{s.title}</h3>
                <p className="text-xs text-slate-500">{s.desc}</p>
              </div>
              <div className={`mt-4 pt-2 text-xs flex items-center gap-1.5 ${s.highlight ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                <img src="/icons/check-solid.svg" alt="Check" className="w-3.5 h-3.5 opacity-70" />
                <span>{s.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}