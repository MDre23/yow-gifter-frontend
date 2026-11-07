import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-emerald-600 to-teal-500 text-white relative overflow-hidden" id="donner">
      <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
      <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Colonne Gauche : image */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <img 
            src="/images/img_chaine.png" 
            alt="Chaîne de solidarité Yow Gifter" 
            className="w-full max-w-md h-auto rounded-3xl object-contain drop-shadow-xl border-4 border-white/20"
          />
        </div>

        
        
        {/* Colonne Droite : Image img_chaine.png */}
     
        <div className="lg:col-span-8 text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-4 py-1 rounded-full text-xs">
            <img src="/icons/heart-solid.svg" alt="Cœur" className="w-3.5 h-3.5 filter invert" />
            <span>Rejoignez la chaîne de solidarité dès aujourd'hui</span>
          </div>
          
          <h2 className="text-3xl lg:text-[2.75rem] font-bold text-white tracking-tight leading-tight">
            Un objet encombrant qui pourrait aider un voisin ? Des vêtements et de la nourriture qui pour les associations ? 
          </h2>
          
          <p className="text-base text-emerald-50 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Ne jetez plus. En moins de 2 minutes, votre objet trouvera un nouveau propriétaire reconnaissant dans votre ville.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link href="#publier" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#b8f7e4] hover:bg-white text-emerald-950 text-sm px-8 py-4 rounded-xl shadow-lg transition-transform active:scale-95 font-bold">
              <img src="/icons/file-upload-solid.svg" alt="Publier" className="w-4 h-4" />
              <span>Publier mon premier don maintenant</span>
            </Link>
            <Link href="#comment-ca-marche" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/30 text-sm px-6 py-4 rounded-xl transition-colors font-semibold">
              <img src="/icons/question-circle-solid.svg" alt="Aide" className="w-4 h-4 filter invert" />
              <span>Consulter le guide pratique</span>
            </Link>
          </div>

          <div className="pt-4 flex flex-wrap justify-center lg:justify-start items-center gap-6 text-emerald-100 text-xs">
            <span className="flex items-center gap-1.5">
              <img src="/icons/check-solid.svg" alt="Check" className="w-3.5 h-3.5 filter invert" /> Inscription gratuite instantanée
            </span>
            <span className="flex items-center gap-1.5">
              <img src="/icons/check-solid.svg" alt="Check" className="w-3.5 h-3.5 filter invert" /> Aucune commission cachée
            </span>
            <span className="flex items-center gap-1.5">
              <img src="/icons/check-solid.svg" alt="Check" className="w-3.5 h-3.5 filter invert" /> Respect de l'éthique citoyenne
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}