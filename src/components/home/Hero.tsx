import Link from 'next/link';

export default function Hero() {
  return (
    <section 
      className="relative overflow-hidden py-16 lg:py-24 bg-cover bg-center min-h-[520px] flex items-center" 
      style={{ backgroundImage: "url('/images/imgf.png')" }}
    >
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10 text-center flex flex-col items-center space-y-6">
        
        
        <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] lg:leading-[3.75rem] text-white tracking-tight font-bold drop-shadow-sm">
          Donnez une seconde vie à vos objets. <br className="hidden sm:inline" />
          <span className="text-[#b8f7e4] font-extrabold">100% Gratuit</span>, 100% Solidaire.
        </h1>
        
        <p className="text-base sm:text-lg text-slate-100 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
          Rejoignez la communauté pour donner et recevoir sans intermédiaire marchand. Zéro frais, zéro commission, 100% gratuit.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 w-full sm:w-auto">
          <Link href="#donner" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-8 py-3.5 rounded-xl shadow-lg transition-all font-bold">
            <img src="/icons/plus-circle-solid.svg" alt="Ajouter" className="w-4 h-4 filter invert" />
            <span>Commencer à donner</span>
          </Link>
          <Link href="#dons-disponibles" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white border border-white/40 backdrop-blur-md text-sm px-8 py-3.5 rounded-xl shadow-sm transition-all font-semibold">
            <img src="/icons/compass-solid.svg" alt="Explorer" className="w-4 h-4 filter invert" />
            <span>Parcourir les dons disponibles</span>
          </Link>
        </div>

        {/* Badges de bas de Hero */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 w-full max-w-3xl">
          <div className="flex items-center justify-center gap-2 text-white bg-white/10 backdrop-blur-md border border-white/20 py-2 px-3 rounded-lg">
            <img src="/icons/piggy-bank-solid.svg" alt="Gratuit" className="w-4 h-4 filter invert" />
            <span className="text-xs font-medium">Gratuité intégrale</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-white bg-white/10 backdrop-blur-md border border-white/20 py-2 px-3 rounded-lg">
            <img src="/icons/handshake-solid.svg" alt="Équitable" className="w-4 h-4 filter invert" />
            <span className="text-xs font-medium">Attribution équitable</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-white bg-white/10 backdrop-blur-md border border-white/20 py-2 px-3 rounded-lg">
            <img src="/icons/shield-alt-solid.svg" alt="Sécurité" className="w-4 h-4 filter invert" />
            <span className="text-xs font-medium">Vie privée préservée</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-white bg-white/10 backdrop-blur-md border border-white/20 py-2 px-3 rounded-lg">
            <img src="/icons/bolt-solid.svg" alt="Rapide" className="w-4 h-4 filter invert" />
            <span className="text-xs font-medium">Connexions légères</span>
          </div>
        </div>
      </div>
    </section>
  );
}