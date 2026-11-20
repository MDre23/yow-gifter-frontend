export default function DateSeparator({ label }: { label: string }) {
  return (
    <div className="flex justify-center my-3">
      <span className="px-3 py-1 rounded-lg bg-white text-[10px] font-semibold uppercase tracking-wide text-slate-500 shadow-2xs border border-slate-200/70">
        {label}
      </span>
    </div>
  );
}