export default function AuthSidePanel() {
    return (
      <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-emerald-50/60 p-6 lg:p-8 relative overflow-hidden border border-emerald-100 h-[640px]">
        <div className="absolute -right-8 -bottom-8 w-60 h-60 bg-emerald-200/40 rounded-full blur-2xl pointer-events-none" />
  
        <div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
            Rejoignez une communauté bienveillante et solidaire.
          </h2>
          <p className="text-slate-600 mt-3 text-sm leading-relaxed">
            Donnez une seconde vie à vos objets du quotidien et trouvez ce dont
            vous avez besoin auprès de familles et voisins de confiance.
          </p>
        </div>
  
        <div className="my-6 rounded-xl overflow-hidden shadow-sm bg-white">
          <img
            src="/images/imgf_objets.png"
            alt="Illustration d'entraide et de don solidaire"
            className="w-full h-auto object-cover"
          />
        </div>
  
        <div className="space-y-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl">
          <div className="flex items-start gap-3">
            
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                100% Solidaire & Citoyen
              </h4>
              <p className="text-xs text-slate-500">
                Chaque échange participe au réemploi écologique et à
                l&apos;entraide locale.
              </p>
            </div>
          </div>
  
          <div className="flex items-start gap-3">
            
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Sans intermédiaire ni frais
              </h4>
              <p className="text-xs text-slate-500">
                Discutez, convenez d&apos;un point de rencontre et transmettez
                simplement.
              </p>
            </div>
          </div>
  
          <div className="flex items-start gap-3">
            
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Protection stricte des données
              </h4>
              <p className="text-xs text-slate-500">
                Aucune vente de données. Votre anonymat est garanti.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }