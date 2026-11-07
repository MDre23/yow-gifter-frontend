import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-white text-slate-900 flex items-center min-h-[620px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* CÔTÉ GAUCHE : Textes, badges et boutons d'action (en noir/foncé) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-1.5 rounded-full shadow-xs">
              <img src="/icons/gift-solid.svg" alt="Don" className="w-4 h-4 text-emerald-700" />
              <span className="font-semibold">Don &amp; Réemploi citoyen de proximité</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] lg:leading-[3.75rem] tracking-tight font-bold text-slate-900">
              Donnez une seconde vie à vos objets. <br className="hidden sm:inline" />
              <span className="text-emerald-600 font-extrabold">100% Gratuit</span>, 100% Solidaire.
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Rejoignez la communauté pour donner et recevoir des objets du quotidien sans intermédiaire marchand. Zéro frais, zéro commission, 100% gratuit.
            </p>
            
            <div className="flex flex-wrap items-center justify-start gap-4 pt-2">
              <Link href="#donner" className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-8 py-3.5 rounded-xl shadow-md transition-all font-bold">
                <img src="/icons/plus-circle-solid.svg" alt="Ajouter" className="w-4 h-4 filter invert" />
                <span>Commencer à donner</span>
              </Link>
              <Link href="#dons-disponibles" className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-sm px-8 py-3.5 rounded-xl shadow-xs transition-all font-semibold">
                <img src="/icons/compass-solid.svg" alt="Explorer" className="w-4 h-4 opacity-75" />
                <span>Parcourir les dons disponibles</span>
              </Link>
            </div>

            {/* Badges de bas de Hero */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-2xl">
              <div className="flex items-center gap-2 text-slate-800 bg-slate-50 border border-slate-200/80 py-2.5 px-3 rounded-lg shadow-xs">
                <img src="/icons/piggy-bank-solid.svg" alt="Gratuit" className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-medium">Gratuité intégrale</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 bg-slate-50 border border-slate-200/80 py-2.5 px-3 rounded-lg shadow-xs">
                <img src="/icons/handshake-solid.svg" alt="Équitable" className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-medium">Attribution équitable</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 bg-slate-50 border border-slate-200/80 py-2.5 px-3 rounded-lg shadow-xs">
                <img src="/icons/shield-alt-solid.svg" alt="Sécurité" className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-medium">Vie privée protégée</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 bg-slate-50 border border-slate-200/80 py-2.5 px-3 rounded-lg shadow-xs">
                <img src="/icons/bolt-solid.svg" alt="Rapide" className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-medium">Connexions légères</span>
              </div>
            </div>
          </div>

          {/* CÔTÉ DROIT : L'illustration qui occupe toute la hauteur */}
          <div className="lg:col-span-5 flex justify-center items-center h-full">
            <div className="relative w-full h-[520px] lg:h-[580px] rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-50">
              <img 
                src="/images/imgf_objets.png" 
                alt="Partage d'objets et solidarité citoyenne" 
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}