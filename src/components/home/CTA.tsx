import Link from "next/link";

export default function CTA() {
  return (
    <section
      className="py-16 lg:py-24 relative overflow-hidden text-white bg-[#0A4533]"
      id="donner"
    >
      {/* ===== DÉGRADÉ DE FOND : identique au Hero ===== */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-gradient-to-br from-[#0A4533] via-[#0A4533]/95 to-[#C8F366]/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-gradient-to-t from-[#F7F6F5]/30 via-transparent to-[#C8F366]/10"
      />

      {/* ===== HALOS DÉCORATIFS : identiques au Hero ===== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-24 h-80 w-80 rounded-full bg-[#C8F366]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-[#C8F366]/15 blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Colonne Gauche : image */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <img
            src="/images/img_chaine.png"
            alt="Chaîne de solidarité Yow Gifter"
            className="w-full max-w-md h-auto rounded-3xl object-contain drop-shadow-xl border-4 border-white/20"
          />
        </div>

        {/* Colonne Droite */}
        <div className="lg:col-span-8 text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-4 py-1 rounded-full text-xs">
            <img
              src="/icons/heart-solid.svg"
              alt="Cœur"
              className="w-3.5 h-3.5 filter invert"
            />
            {/* <span>Rejoignez la chaîne de solidarité dès aujourd'hui</span> */}
          </div>

          <h2 className="text-3xl lg:text-[2.75rem] font-bold text-white tracking-tight leading-tight">
            Un objet encombrant qui pourrait aider un voisin ? Des manuels ou du
            matériel pour les étudiants ?
          </h2>

          <p className="text-base text-emerald-50 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Ne jetez plus. En moins de 2 minutes, votre objet trouvera un
            nouveau propriétaire reconnaissant dans votre ville.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link
              href="/auth"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C8F366] hover:bg-[#b8e356] text-[#0A4533] text-sm px-8 py-4 rounded-xl shadow-lg shadow-[#C8F366]/20 transition-transform active:scale-95 font-bold"
            >
              <img
                src="/icons/file-upload-solid.svg"
                alt="Publier"
                className="w-4 h-4"
              />
              <span>Publier mon premier don maintenant</span>
            </Link>
            <Link
              href="#comment-ca-marche"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 text-sm px-6 py-4 rounded-xl transition-colors font-semibold backdrop-blur-sm"
            >
              <img
                src="/icons/compass-solid.svg"
                alt="Guide"
                className="w-4 h-4 filter invert"
              />
              <span>Consulter le guide pratique</span>
            </Link>
          </div>

          <div className="pt-4 flex flex-wrap justify-center lg:justify-start items-center gap-6 text-emerald-100 text-xs">
            <span className="flex items-center gap-1.5">
              <img
                src="/icons/check-solid.svg"
                alt="Check"
                className="w-3.5 h-3.5 filter invert"
              />{" "}
              100% Gratuit
            </span>
            <span className="flex items-center gap-1.5">
              <img
                src="/icons/check-solid.svg"
                alt="Check"
                className="w-3.5 h-3.5 filter invert"
              />{" "}
              Règle FIFO équitable
            </span>
            <span className="flex items-center gap-1.5">
              <img
                src="/icons/check-solid.svg"
                alt="Check"
                className="w-3.5 h-3.5 filter invert"
              />{" "}
              Respect strict de la vie privée
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}