import Link from "next/link";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryLabel,
  secondaryHref,
}: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 gap-3 bg-emerald-50/40">
      {icon && (
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">{icon}</div>
      )}
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      {description && (
        <p className="text-xs text-slate-500 max-w-sm leading-relaxed">{description}</p>
      )}

      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            {actionLabel}
          </button>
        )}
        {secondaryLabel && secondaryHref && (
          <Link
            href={secondaryHref}
            className="px-5 py-2.5 border border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-xs font-bold rounded-xl transition-colors"
          >
            {secondaryLabel}
          </Link>
        )}
      </div>
    </div>
  );
}