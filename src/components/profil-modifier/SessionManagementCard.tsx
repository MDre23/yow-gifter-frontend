"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SessionManagementCard() {
  const router = useRouter();

  const handleLogout = () => {
    if (confirm("Confirmez-vous la fermeture de session sur cet appareil ?")) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("yg_authenticated");
        localStorage.removeItem("yg_username");
        localStorage.removeItem("yg_user_email");
      }
      router.push("/auth");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-1">
        <h4 className="text-base font-bold text-slate-900">
          Gestion de session
        </h4>
        <p className="text-xs text-slate-500">
          Terminez votre session sur cet appareil ou sollicitez le support technique bénévole.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <button
          type="button"
          onClick={handleLogout}
          className="h-11 px-5 rounded-full bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 transition-all font-semibold text-xs flex items-center gap-2.5 cursor-pointer border border-red-200/60"
        >
          <img
            src="/icons/sign-out-alt-solid.svg"
            alt=""
            className="w-4 h-4 opacity-75"
          />
          <span>Se déconnecter de la session</span>
        </button>

        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (confirm("Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible.")) {
              if (typeof window !== "undefined") {
                localStorage.removeItem("yg_authenticated");
              }
              router.push("/");
            }
          }}
          className="text-xs text-slate-400 hover:text-red-600 transition-colors underline underline-offset-4"
        >
          Supprimer mon compte citoyen
        </Link>
      </div>
    </div>
  );
}
