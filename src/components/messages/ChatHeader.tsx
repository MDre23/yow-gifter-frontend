import type { ReactNode } from "react";
import Avatar from "@/components/ui/Avatar";

interface ChatHeaderProps {
  name: string;
  subtitle?: string;
  onBack?: () => void;
  children?: ReactNode;
}

export default function ChatHeader({ name, subtitle, onBack, children }: ChatHeaderProps) {
  return (
    <div className="px-2 sm:px-4 py-3 border-b border-slate-100 bg-white flex items-center justify-between gap-2 shrink-0">
      <div className="flex items-center gap-2.5 min-w-0">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Retour aux conversations"
            className="lg:hidden w-10 h-10 shrink-0 rounded-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <Avatar name={name} />
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-slate-900 truncate">{name}</h3>
          {subtitle && (
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {subtitle}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">{children}</div>
    </div>
  );
}