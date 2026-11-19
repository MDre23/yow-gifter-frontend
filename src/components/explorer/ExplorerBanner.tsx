interface ExplorerBannerProps {
  searchQuery: string;
  onChangeSearch: (val: string) => void;
}

export default function ExplorerBanner({
  searchQuery,
  onChangeSearch,
}: ExplorerBannerProps) {
  return (
    <div className="max-w-3xl">
      
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        Explorer les dons disponibles
      </h1>
      

      {/* Barre de recherche */}
      <div className="mt-6 relative">
        <img
          src="/icons/search-solid.svg"
          alt=""
          className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 opacity-40"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onChangeSearch(e.target.value)}
          placeholder="Rechercher par mot-clé (ex: manuel, PC, bureau, pull, calculatrice...)"
          className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 focus:bg-white transition-all shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => onChangeSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            Effacer
          </button>
        )}
      </div>
    </div>
  );
}
