export default function AuthSidePanel() {
  return (
    <div className="lg:col-span-7 flex flex-col justify-center space-y-5 text-white py-2">
      <div>
        <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
          Yow Gifter.
        </h2>
        <p className="text-lg sm:text-xl font-semibold text-[#E7F3EF] mt-2">
          Rejoignez une communauté bienveillante et solidaire.
        </p>
        <p className="text-[#E7F3EF]/90 mt-3 text-sm sm:text-base max-w-xl leading-relaxed">
          Donnez une seconde vie à vos objets du quotidien et trouvez ce dont
          vous avez besoin auprès de familles et voisins de confiance. Chaque
          échange participe au réemploi écologique et à l&apos;entraide locale,
          sans intermédiaire ni frais.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 max-w-xl border-t border-white/20">
        <div className="pt-2">
          <h4 className="text-sm font-bold text-white">100% Solidaire</h4>
          <p className="text-xs text-[#E7F3EF]/85 mt-1 leading-relaxed">
            Réemploi local et entraide entre voisins.
          </p>
        </div>

        <div className="pt-2">
          <h4 className="text-sm font-bold text-white">Sans frais</h4>
          <p className="text-xs text-[#E7F3EF]/85 mt-1 leading-relaxed">
            Échanges directs, simples et gratuits.
          </p>
        </div>

        <div className="pt-2">
          <h4 className="text-sm font-bold text-white">Données protégées</h4>
          <p className="text-xs text-[#E7F3EF]/85 mt-1 leading-relaxed">
            Anonymat et vie privée respectés.
          </p>
        </div>
      </div>
    </div>
  );
}