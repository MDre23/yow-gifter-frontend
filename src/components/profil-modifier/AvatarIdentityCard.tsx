"use client";

import { useState, useEffect } from "react";
import { authService } from "@/services/auth.service";

export default function AvatarIdentityCard() {
  const [userName, setUserName] = useState("Mon Profil Citoyen");
  const [avatar, setAvatar] = useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("yg_username");
      if (storedName) setUserName(storedName);
      authService.getMe().then((me) => {
        if (me) {
          setUserName(`${me.firstName} ${me.lastName || ""}`.trim());
          if (me.avatarUrl) setAvatar(me.avatarUrl);
        }
      }).catch(() => {});
    }
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setAvatar(url);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col items-center text-center relative overflow-hidden">
      <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-emerald-100/40 blur-2xl pointer-events-none"></div>

      {/* Avatar avec bouton caméra */}
      <div className="relative group mb-4">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-slate-100 shadow-sm transition-transform duration-300 group-hover:scale-[1.02] overflow-hidden">
          <img
            src={avatar}
            alt={userName}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <label
          htmlFor="avatar-input"
          className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-[#004e3e] hover:bg-[#0d6854] text-white flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95"
          title="Modifier la photo"
        >
          <img
            src="/icons/camera-solid.svg"
            alt=""
            className="w-4 h-4 filter invert"
          />
        </label>
        <input
          id="avatar-input"
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          onChange={handleAvatarChange}
        />
      </div>

      <h2 className="text-xl font-bold text-slate-900">{userName}</h2>
      <p className="text-xs text-slate-500 mt-0.5">Membre engagé pour l&apos;économie circulaire</p>
      <p className="text-[11px] text-slate-400 mt-1">
        Formats acceptés : JPG, PNG ou WebP (max 5 Mo)
      </p>

      {/* Badge Officiellement Vérifié */}
      <div className="mt-6 w-full bg-[#eaf6f4] p-4 rounded-xl flex items-start gap-3 text-left border border-emerald-100">
        <div className="w-8 h-8 rounded-full bg-[#a3f2d8] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
          <img src="/icons/check-solid.svg" alt="" className="w-3.5 h-3.5 opacity-80" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-[#004e3e]">
              Profil Officiellement Vérifié
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white text-[#006a6a] text-[10px] font-bold shadow-2xs">
              Certifié
            </span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1 leading-snug">
            Identité authentifiée par scan vidéo facial dynamique. Prochain renouvellement automatique en 2026.
          </p>
          <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-medium mt-2">
            <img src="/icons/calendar-alt-solid.svg" alt="" className="w-3 h-3 opacity-50" />
            <span>Validé pour l&apos;année académique en cours</span>
          </div>
        </div>
      </div>
    </div>
  );
}
