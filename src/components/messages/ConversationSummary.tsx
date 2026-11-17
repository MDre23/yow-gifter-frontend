interface ConversationSummaryProps {
  image: string;
  title: string;
  donorName: string;
}

export default function ConversationSummary({
  image,
  title,
  donorName,
}: ConversationSummaryProps) {
  return (
    <div className="p-4 border-b border-slate-100 bg-white">
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
        Objet concerné
      </span>
      <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
        <img
          src={image}
          alt=""
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-bold text-slate-900 truncate">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] text-slate-500">
              Donateur : {donorName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
