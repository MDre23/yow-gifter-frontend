interface MessageBubbleProps {
  text: string;
  timestamp: string;
  isMe: boolean;
  isFirstOfGroup: boolean; // première bulle d'une série du même expéditeur : affiche la "queue"
}

export default function MessageBubble({ text, timestamp, isMe, isFirstOfGroup }: MessageBubbleProps) {
  const tail = isFirstOfGroup ? (isMe ? "rounded-tr-none" : "rounded-tl-none") : "";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} ${isFirstOfGroup ? "mt-2" : "mt-0.5"}`}>
      <div
        className={`max-w-[85%] sm:max-w-md px-3 pt-1.5 pb-1 rounded-lg text-xs leading-relaxed shadow-2xs ${tail} ${
          isMe
            ? "bg-emerald-100 text-slate-900"
            : "bg-white text-slate-800 border border-slate-200/70"
        }`}
      >
        <span className="whitespace-pre-wrap break-words">{text}</span>
        <span className="float-right ml-3 mt-1.5 flex items-center gap-0.5 text-[10px] text-slate-400">
          {timestamp}
          {isMe && (
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M1 13l4 4L14 7" />
              <path d="M9 14l3 3L21 7" />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
}