import Link from "next/link";
import Icon from "@/components/ui/Icon";

export default function ConversationClosed({ backHref = "/dons" }: { backHref?: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 gap-3">
      <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
        <Icon name="check-solid" className="w-6 h-6 opacity-70" />
      </div>
      <h2 className="text-lg font-bold text-slate-900">Don remis avec succès</h2>
      <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
        La conversation a été supprimée, conformément à la clôture du don.
        Merci d&apos;avoir participé !
      </p>
      <Link
        href={backHref}
        className="mt-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs"
      >
        Retour aux annonces
      </Link>
    </div>
  );
}