interface ProfileTabsProps {
  activeTab: "donations" | "requests";
  donationsCount: number;
  requestsCount: number;
  onSelectTab: (tab: "donations" | "requests") => void;
}

export default function ProfileTabs({
  activeTab,
  donationsCount,
  requestsCount,
  onSelectTab,
}: ProfileTabsProps) {
  return (
    <div className="flex items-center gap-2 border-b border-slate-200 mb-6 pb-2">
      <button
        type="button"
        onClick={() => onSelectTab("donations")}
        className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
          activeTab === "donations"
            ? "bg-emerald-700 text-white shadow-xs"
            : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
        }`}
      >
        <img
          src="/icons/gift-solid.svg"
          alt=""
          className={`w-3.5 h-3.5 ${activeTab === "donations" ? "filter invert" : "opacity-60"}`}
        />
        <span>Mes dons publiés ({donationsCount})</span>
      </button>

      <button
        type="button"
        onClick={() => onSelectTab("requests")}
        className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
          activeTab === "requests"
            ? "bg-emerald-700 text-white shadow-xs"
            : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
        }`}
      >
        <img
          src="/icons/hand-holding-heart-solid.svg"
          alt=""
          className={`w-3.5 h-3.5 ${activeTab === "requests" ? "filter invert" : "opacity-60"}`}
        />
        <span>Mes demandes ({requestsCount})</span>
      </button>
    </div>
  );
}
