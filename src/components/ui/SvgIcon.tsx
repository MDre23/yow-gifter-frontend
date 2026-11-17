import React from "react";

interface SvgIconProps {
  name: string; // Nom du fichier SVG sans l'extension dans public/icons/ (ex: "user-solid", "lock-solid")
  className?: string; // Classes Tailwind pour la taille et la couleur (ex: "w-4 h-4 bg-slate-400")
}

export default function SvgIcon({
  name,
  className = "w-4 h-4 bg-current",
}: SvgIconProps) {
  return (
    <span
      role="img"
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
      style={{
        maskImage: `url(/icons/${name}.svg)`,
        WebkitMaskImage: `url(/icons/${name}.svg)`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}
