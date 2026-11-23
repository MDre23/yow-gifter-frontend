import Link from "next/link";

interface DonationBannerProps {
  image: string;
  title: string;
  href: string;
}

export default function DonationBanner({ image, title, href }: DonationBannerProps) {
  return (
    <div className="px-3 sm:px-4 py-2 border-b border-slate-100 bg-white flex items-center gap-3 shrink-0">
      <img src={image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
          Objet concerné
        </span>
        <h3 className="text-xs font-bold text-slate-900 truncate">{title}</h3>
      </div>
      <Link
        href={href}
        className="shrink-0 text-[11px] text-emerald-700 font-semibold hover:underline"
      >
        Voir l&apos;annonce
      </Link>
    </div>
  );
}