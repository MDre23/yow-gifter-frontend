"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export default function Hero() {
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const secondaryBtnRef = useRef<HTMLAnchorElement>(null);

  const [primaryProximity, setPrimaryProximity] = useState(0);
  const [secondaryProximity, setSecondaryProximity] = useState(0);
  const [primaryActive, setPrimaryActive] = useState(false);
  const [secondaryActive, setSecondaryActive] = useState(false);

  const calculateProximity = (
    e: React.MouseEvent<HTMLElement>,
    element: HTMLElement | null
  ) => {
    if (!element) return 0;
    const rect = element.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    const distance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);
    const maxDistance = 260;
    return Math.max(0, Math.min(1, 1 - distance / maxDistance));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    setPrimaryProximity(calculateProximity(e, primaryBtnRef.current));
    setSecondaryProximity(calculateProximity(e, secondaryBtnRef.current));
  };

  const handleMouseLeave = () => {
    setPrimaryProximity(0);
    setSecondaryProximity(0);
    setPrimaryActive(false);
    setSecondaryActive(false);
  };

  const primaryOpacity = primaryActive ? 1 : 0.55 + primaryProximity * 0.37;
  const primaryGlow = primaryActive
    ? "0 0 32px rgba(200, 243, 102, 0.95)"
    : `0 8px 25px rgba(200, 243, 102, ${0.12 + primaryProximity * 0.45})`;

  const secondaryBgOpacity = secondaryActive ? 0.45 : 0.08 + secondaryProximity * 0.2;
  const secondaryBorderOpacity = secondaryActive ? 0.95 : 0.25 + secondaryProximity * 0.5;
  const secondaryGlow = secondaryActive
    ? "0 0 28px rgba(200, 243, 102, 0.7)"
    : `0 8px 24px rgba(200, 243, 102, ${secondaryProximity * 0.25})`;

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden min-h-[680px] flex items-center bg-[#0A4533]"
    >
      {/* ===== DÉGRADÉ DE FOND : vert forêt majoritaire ===== */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-gradient-to-br from-[#0A4533] via-[#0A4533]/95 to-[#C8F366]/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-gradient-to-t from-[#F7F6F5]/30 via-transparent to-[#C8F366]/10"
      />

      {/* Halos décoratifs (uniquement sur les côtés) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-24 h-80 w-80 rounded-full bg-[#C8F366]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-[#C8F366]/15 blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full py-12 lg:py-16">
        <div className="flex flex-col items-center text-center">
          {/* ===== TEXTE ===== */}
          <div className="relative z-30 flex flex-col items-center space-y-5 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl lg:leading-[1.1] tracking-tight font-bold text-[#F7F6F5] drop-shadow-lg">
              Donnez une seconde vie à vos objets.{" "}
              <br className="hidden sm:inline" />
              <span className="text-[#C8F366] font-extrabold">
                100% Gratuit
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-[#F7F6F5]/90 max-w-2xl leading-relaxed drop-shadow">
              Rejoignez la communauté pour donner et recevoir des objets du
              quotidien sans intermédiaire marchand. Zéro frais, zéro commission,
              100% gratuit.
            </p>
          </div>

          {/* ===== IMAGE AGRANDIE SANS LUEUR DERRIÈRE ===== */}
          <div className="relative z-10 w-full max-w-6xl h-[380px] sm:h-[500px] lg:h-[650px] -mt-4 sm:-mt-6">
            <img
              src="/images/image3.png"
              alt="Objets à donner"
              className="relative z-10 w-full h-full object-contain object-center scale-110 sm:scale-125
                         [mask-image:radial-gradient(ellipse_75%_68%_at_50%_52%,black_38%,transparent_76%)]
                         [-webkit-mask-image:radial-gradient(ellipse_75%_68%_at_50%_52%,black_38%,transparent_76%)]
                         mix-blend-multiply contrast-125 brightness-110
                         drop-shadow-[0_0_28px_rgba(255,255,255,0.45)]"
            />
          </div>

          {/* ===== BOUTONS ===== */}
          <div className="relative z-30 flex flex-wrap items-center justify-center gap-4 -mt-16 sm:-mt-24 mb-8">
            <Link
              ref={primaryBtnRef}
              href="/auth"
              onMouseDown={() => setPrimaryActive(true)}
              onMouseUp={() => setPrimaryActive(false)}
              onMouseLeave={() => setPrimaryActive(false)}
              style={{
                backgroundColor: `rgba(200, 243, 102, ${primaryOpacity})`,
                boxShadow: primaryGlow,
                transform: primaryActive
                  ? "scale(0.98)"
                  : `translateY(${-primaryProximity * 3}px) scale(${1 + primaryProximity * 0.03})`,
              }}
              className="inline-flex items-center justify-center gap-2 text-[#0A4533] text-base px-8 py-3.5 rounded-xl font-bold backdrop-blur-md border border-[#C8F366]/60 transition-[transform,filter] duration-150"
            >
              <img
                src="/icons/plus-circle-solid.svg"
                alt="Ajouter"
                className="w-4 h-4"
              />
              <span>Commencer à donner</span>
            </Link>

            <Link
              ref={secondaryBtnRef}
              href="#dons-disponibles"
              onMouseDown={() => setSecondaryActive(true)}
              onMouseUp={() => setSecondaryActive(false)}
              onMouseLeave={() => setSecondaryActive(false)}
              style={{
                backgroundColor: secondaryActive
                  ? "rgba(200, 243, 102, 0.35)"
                  : `rgba(255, 255, 255, ${secondaryBgOpacity})`,
                borderColor: secondaryActive
                  ? "rgba(200, 243, 102, 1)"
                  : `rgba(247, 246, 245, ${secondaryBorderOpacity})`,
                boxShadow: secondaryGlow,
                transform: secondaryActive
                  ? "scale(0.98)"
                  : `translateY(${-secondaryProximity * 3}px) scale(${1 + secondaryProximity * 0.03})`,
              }}
              className="inline-flex items-center justify-center gap-2 text-[#F7F6F5] border text-base px-8 py-3.5 rounded-xl font-semibold backdrop-blur-md transition-[transform,filter] duration-150"
            >
              <img
                src="/icons/compass-solid.svg"
                alt="Explorer"
                className="w-4 h-4 opacity-90 filter invert"
              />
              <span>Parcourir les dons disponibles</span>
            </Link>
          </div>

          {/* ===== BADGES ===== */}
          <div className="relative z-20 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 max-w-2xl w-full">
            {[
              { icon: "piggy-bank-solid.svg", label: "Gratuité intégrale" },
              { icon: "handshake-solid.svg", label: "Attribution équitable" },
              { icon: "shield-alt-solid.svg", label: "Vie privée protégée" },
              { icon: "bolt-solid.svg", label: "Connexions légères" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-[#F7F6F5] bg-[#0A4533]/60 border border-[#C8F366]/25 py-2.5 px-3 rounded-lg backdrop-blur-sm"
              >
                <img
                  src={`/icons/${badge.icon}`}
                  alt={badge.label}
                  className="w-4 h-4 filter invert opacity-80"
                />
                <span className="text-xs font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}