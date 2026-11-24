"use client";

import { useState, useEffect } from "react";
import { authService } from "@/services/auth.service";

export default function AvatarIdentityCard() {
  const [userName, setUserName] = useState("Mon Profil Citoyen");
  // On utilise une image par défaut locale au lieu d'Unsplash
  const [avatar, setAvatar] = useState("/images/default_avatar.png"); 

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

      <div className="relative group mb-4">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-slate-100 shadow-sm transition-transform duration-300 group-hover:scale-[1.02] overflow-hidden">
          <img src={avatar} alt={userName} className="w-full h-full object-cover rounded-full bg-slate-200" />
        </div>
        <label htmlFor="avatar-input" className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-[#004e3e] hover:bg-[#0d6854] text-white flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95" title="Modifier la photo">
          <img src="/icons/camera-solid.svg" alt="" className="w-4 h-4 filter invert" />
        </label>
        <input id="avatar-input" type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handleAvatarChange} />
      </div>

      <h2 className="text-xl font-bold text-slate-900">{userName}</h2>
      <p className="text-xs text-slate-500 mt-0.5">Membre engagé pour l&apos;économie circulaire</p>
      {/* ... (le reste du composant reste inchangé) ... */}
    </div>
  );
}