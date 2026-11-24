"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

export default function PersonalInfoForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState<number>(22);
  const [location, setLocation] = useState("yaounde-melen");
  const [bio, setBio] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("yg_username") || "Citoyen";
      const parts = storedName.split(" ");
      setFirstName(parts[0] || "Citoyen");
      setLastName(parts.slice(1).join(" ") || "");

      authService.getMe().then((me) => {
        if (me) {
          if (me.firstName) setFirstName(me.firstName);
          if (me.lastName) setLastName(me.lastName);
          if (me.age) setAge(me.age);
          if (me.bio) setBio(me.bio);
          if (me.neighborhood) {
            if (me.neighborhood.toLowerCase().includes("bastos")) setLocation("yaounde-bastos");
            else if (me.neighborhood.toLowerCase().includes("polytech") || me.neighborhood.toLowerCase().includes("ngoa")) setLocation("yaounde-polytech");
            else if (me.neighborhood.toLowerCase().includes("biyem")) setLocation("yaounde-biyemassi");
            else setLocation("yaounde-melen");
          }
        }
      }).catch(() => {});
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (typeof window !== "undefined") {
      localStorage.setItem("yg_username", `${firstName} ${lastName ? lastName[0] + "." : ""}`.trim());
    }

    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 4000);
    }, 500);
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
            <img
              src="/icons/address-card-solid.svg"
              alt=""
              className="w-4 h-4 opacity-75"
            />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Informations personnelles
          </h3>
        </div>
        <span className="text-[11px] font-bold text-emerald-800 bg-[#eaf6f4] px-3 py-1 rounded-full">
          Données civiles protégées
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Prénom et Nom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-800 flex items-center justify-between">
              <span>Prénom</span>
              <span className="text-emerald-700 text-[11px] font-bold">Visible par tous</span>
            </label>
            <div className="relative flex items-center">
              <img
                src="/icons/user-solid.svg"
                alt=""
                className="absolute left-3.5 w-4 h-4 opacity-40 pointer-events-none"
              />
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Votre prénom"
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 text-slate-900 text-xs font-medium border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004e3e]/30"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-800 flex items-center justify-between">
              <span>Nom</span>
              <span className="text-slate-400 text-[11px]">Masqué au public</span>
            </label>
            <div className="relative flex items-center">
              <img
                src="/icons/address-card-solid.svg"
                alt=""
                className="absolute left-3.5 w-4 h-4 opacity-40 pointer-events-none"
              />
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Votre nom de famille"
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 text-slate-900 text-xs font-medium border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004e3e]/30"
              />
            </div>
          </div>
        </div>

        {/* Âge & Secteur Géographique */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-800 flex items-center justify-between">
              <span>Âge indicatif</span>
              <span className="text-slate-400 text-[11px]">Confiance</span>
            </label>
            <div className="relative flex items-center">
              <img
                src="/icons/birthday-cake-solid.svg"
                alt=""
                className="absolute left-3.5 w-4 h-4 opacity-40 pointer-events-none"
              />
              <input
                type="number"
                min={16}
                max={100}
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) || 18)}
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 text-slate-900 text-xs font-medium border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004e3e]/30"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-800 flex items-center justify-between">
              <span>Ville / Secteur principal</span>
              <span className="text-emerald-700 text-[11px] font-bold">Périmètre dons</span>
            </label>
            <div className="relative flex items-center">
              <img
                src="/icons/map-marker-alt-solid.svg"
                alt=""
                className="absolute left-3.5 w-4 h-4 opacity-40 pointer-events-none"
              />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-11 pl-10 pr-8 rounded-xl bg-slate-50 text-slate-900 text-xs font-medium border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004e3e]/30 appearance-none cursor-pointer"
              >
                <option value="yaounde-melen">Yaoundé - Melen / Campus UY1</option>
                <option value="yaounde-polytech">Yaoundé - ENSPY / Ngoa-Ekellé</option>
                <option value="yaounde-bastos">Yaoundé - Bastos</option>
                <option value="yaounde-biyemassi">Yaoundé - Biyem-Assi</option>
                <option value="yaounde-omnisport">Yaoundé - Omnisports</option>
                <option value="autre">Autre secteur au Cameroun</option>
              </select>
              <img
                src="/icons/chevron-down-solid.svg"
                alt=""
                className="absolute right-3.5 w-3 h-3 opacity-40 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-800">
              Bio / Courte présentation citoyenne
            </label>
            <span className="text-slate-400 text-[11px]">
              {bio.length} / 300 caractères
            </span>
          </div>
          <textarea
            rows={4}
            maxLength={300}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Racontez pourquoi vous donnez ou ce que vous recherchez sur Yow Gifter..."
            className="w-full p-3 rounded-xl bg-slate-50 text-slate-900 text-xs leading-relaxed border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004e3e]/30 resize-none"
          />
          <p className="text-[11px] text-slate-400">
            Conseil : Une bio conviviale permet aux donneurs de mieux comprendre vos besoins d&apos;études ou de projets.
          </p>
        </div>

        {/* Toast de succès */}
        {saved && (
          <div className="p-3.5 rounded-xl bg-[#a3f2d8] text-[#004e3e] flex items-center gap-2 animate-in fade-in text-xs font-bold shadow-xs">
            <img src="/icons/check-solid.svg" alt="" className="w-3.5 h-3.5 opacity-80" />
            <span>Modifications de profil enregistrées avec succès !</span>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.push("/profil")}
            className="w-full sm:w-auto h-11 px-6 rounded-full text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto h-11 px-6 rounded-full bg-[#004e3e] hover:bg-[#0d6854] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <img src="/icons/save-solid.svg" alt="" className="w-3.5 h-3.5 filter invert" />
            <span>{loading ? "Enregistrement..." : "Enregistrer les modifications"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
