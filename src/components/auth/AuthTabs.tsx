// AuthTabs.tsx
type AuthTabsProps = {
  mode: "login" | "register";
  onChange: (mode: "login" | "register") => void;
};

export default function AuthTabs({ mode, onChange }: AuthTabsProps) {
  return (
    <div className="flex items-center p-1 bg-slate-100 rounded-full mb-4">
      <button
        onClick={() => onChange("login")}
        className={`flex-1 py-2 px-3 rounded-full text-xs sm:text-sm font-semibold transition-all ${
          mode === "login"
            ? "bg-white text-[#0A4533] shadow-sm"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        Se connecter
      </button>
      <button
        onClick={() => onChange("register")}
        className={`flex-1 py-2 px-3 rounded-full text-xs sm:text-sm font-semibold transition-all ${
          mode === "register"
            ? "bg-white text-[#0A4533] shadow-sm"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        Créer un compte
      </button>
    </div>
  );
}