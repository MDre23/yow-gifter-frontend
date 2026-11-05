export default function ImpactMetrics() {
  const metrics = [
    { icon: '/icons/recycle-solid.svg', count: '1 420+', label: 'Objets sauvés du rebut', desc: 'Objets réalloués dans nos quartiers et foyers' },
    { icon: '/icons/piggy-bank-solid.svg', count: '0 FCFA', label: 'Dépensé par les membres', desc: 'Économie 100% circulaire & libre' },
    { icon: '/icons/users-solid.svg', count: '890+', label: 'Membres actifs', desc: 'Particuliers, familles & étudiants' },
    { icon: '/icons/bolt-solid.svg', count: '15 min', label: 'Réservation instantanée', desc: 'Réponse directe du donateur' },
  ];

  return (
    <section className="w-full bg-emerald-50/40 py-16 border-y border-emerald-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl lg:text-3xl text-slate-900 mt-1 font-bold">L'impact réel du réemploi et du don citoyen</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <img src={m.icon} alt={m.label} className="w-6 h-6 object-contain" />
              </div>
              <span className="text-2xl lg:text-3xl font-bold text-emerald-700">{m.count}</span>
              <span className="text-sm text-slate-900 mt-1 font-semibold">{m.label}</span>
              <span className="text-xs text-slate-500 mt-1">{m.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}