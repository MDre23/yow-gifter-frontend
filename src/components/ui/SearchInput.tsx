interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function SearchInput({ value, onChange, placeholder = "Rechercher" }: SearchInputProps) {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 24 24"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ colorScheme: "light" }}
        className="w-full pl-9 pr-3 py-2 rounded-full border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/30"
      />
    </div>
  );
}