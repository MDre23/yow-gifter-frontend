// Ce fichier nous permet évite de répéter <img src="/icons/..."> partout

interface IconProps {
  name: string; // nom du fichier dans public/icons, sans ".svg"
  className?: string;
}

export default function Icon({ name, className = "w-4 h-4" }: IconProps) {
  return <img src={`/icons/${name}.svg`} alt="" aria-hidden="true" className={className} />;
}