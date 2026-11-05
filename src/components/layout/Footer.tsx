export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg text-emerald-700 font-bold">Yow Gifter</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">Plateforme citoyenne de don d'objets et de réemploi solidaire. Ouverte à tous, sans intermédiaire ni frais.</p>
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full text-xs text-emerald-800">
              <img src="/icons/recycle-solid.svg" alt="Économie circulaire" className="w-3.5 h-3.5" />
              <span className="font-medium">Économie solidaire &amp; circulaire</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm text-slate-900 font-bold mb-3">Charte citoyenne</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-1.5">
                <img src="/icons/check-circle-solid.svg" alt="Validé" className="w-3.5 h-3.5" />
                <span>0 FCFA : Gratuité intégrale</span>
              </li>
              <li className="flex items-center gap-1.5">
                <img src="/icons/handshake-solid.svg" alt="Équitable" className="w-3.5 h-3.5" />
                <span>Attribution équitable</span>
              </li>
              <li className="flex items-center gap-1.5">
                <img src="/icons/lock-solid.svg" alt="Vie privée" className="w-3.5 h-3.5" />
                <span>Vie privée protégée</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm text-slate-900 font-bold mb-3">Catégories</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>Livres &amp; manuels</li>
              <li>Vêtements &amp; chaussures</li>
              <li>Mobilier &amp; maison</li>
              <li>Informatique &amp; tech</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm text-slate-900 font-bold mb-3">Éco-responsabilité</h3>
            <p className="text-xs text-slate-600 mb-2">Donner plutôt que jeter : prolongez la durée de vie des biens utiles.</p>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <img src="/icons/check-circle-solid.svg" alt="Neutre" className="w-3.5 h-3.5" />
              <span>Plateforme citoyenne libre</span>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Yow Gifter • Don libre &amp; réemploi citoyen • 0 FCFA</p>
          <p className="text-slate-400">Pour une ville plus solidaire et écologique</p>
        </div>
      </div>
    </footer>
  );
}