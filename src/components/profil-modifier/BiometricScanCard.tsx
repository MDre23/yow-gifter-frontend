"use client";

import { useState } from "react";

export default function BiometricScanCard() {
  const [scanStep, setScanStep] = useState<"idle" | "scanning" | "liveness" | "smile" | "success">("idle");

  const triggerScan = () => {
    if (scanStep !== "idle") return;
    setScanStep("scanning");

    setTimeout(() => {
      setScanStep("liveness");
    }, 2000);

    setTimeout(() => {
      setScanStep("smile");
    }, 4000);

    setTimeout(() => {
      setScanStep("success");
    }, 6000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col relative overflow-hidden">
      {/* En-tête */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#a3f2d8] flex items-center justify-center">
            <img src="/icons/video-solid.svg" alt="" className="w-4 h-4 opacity-80" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Vérification d&apos;authenticité par caméra
          </h3>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold shrink-0">
          15 sec
        </span>
      </div>

      <p className="text-xs text-slate-500 mb-4 leading-relaxed">
        Faites vérifier votre profil en 15 secondes grâce à votre caméra pour obtenir le badge officiel de confiance citoyenne.
      </p>

      {/* Viseur caméra interactif (Fond sombre) */}
      <div className="relative w-full aspect-4/3 rounded-xl bg-slate-900 overflow-hidden flex flex-col items-center justify-center shadow-inner">
        {/* Grille radar subtile */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#79f6f5_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Ovale de guidage biométrique */}
        <div
          className={`relative z-10 w-40 h-52 rounded-[50%] flex items-center justify-center transition-all duration-500 ${
            scanStep === "success"
              ? "border-4 border-[#00a8a8] bg-[#00a8a8]/20 shadow-[0_0_36px_rgba(0,168,168,0.5)]"
              : scanStep === "scanning" || scanStep === "liveness" || scanStep === "smile"
              ? "border-2 border-emerald-400 bg-emerald-500/10 shadow-[0_0_24px_rgba(52,211,153,0.3)] animate-pulse"
              : "border-2 border-dashed border-slate-600 bg-white/5"
          }`}
        >
          {/* Repères visuels coins */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-[#79f6f5] rounded-full"></div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-[#79f6f5] rounded-full"></div>
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 h-6 w-1 bg-[#79f6f5] rounded-full"></div>
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 h-6 w-1 bg-[#79f6f5] rounded-full"></div>

          {/* Silhouette & instruction */}
          <div className="flex flex-col items-center text-center p-3">
            <img
              src="/icons/user-solid.svg"
              alt=""
              className={`w-12 h-12 transition-opacity duration-300 filter invert ${
                scanStep === "success"
                  ? "opacity-90"
                  : scanStep !== "idle"
                  ? "opacity-75 animate-pulse"
                  : "opacity-40"
              }`}
            />

            <span className="text-[11px] font-semibold text-white mt-2 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-xs flex items-center gap-1.5">
              {scanStep === "idle" && "Regardez l'objectif et souriez"}
              {scanStep === "scanning" && "Alignement du visage détecté..."}
              {scanStep === "liveness" && "Tournez doucement la tête (1/2)"}
              {scanStep === "smile" && "Parfait ! Souriez à l'écran (2/2)"}
              {scanStep === "success" && (
                <>
                  <span>Authentification validée</span>
                  <img src="/icons/check-solid.svg" alt="" className="w-2.5 h-2.5 filter invert" />
                </>
              )}
            </span>
          </div>
        </div>

        {/* Barre basse du viseur */}
        <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between px-3 py-1.5 bg-black/80 backdrop-blur-xs rounded-lg text-white text-[11px]">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                scanStep === "success"
                  ? "bg-emerald-400"
                  : scanStep !== "idle"
                  ? "bg-[#79f6f5] animate-ping"
                  : "bg-emerald-500"
              }`}
            ></span>
            <span className="text-slate-200">
              {scanStep === "success" ? "Vérification terminée" : "Prêt pour la capture"}
            </span>
          </div>
          <span className="text-slate-400 flex items-center gap-1.5 text-[10px]">
            <img src="/icons/lock-solid.svg" alt="" className="w-2.5 h-2.5 filter invert opacity-60" />
            <span>Chiffrement AES-256</span>
          </span>
        </div>
      </div>

      {/* Bouton d'action */}
      <div className="mt-4 flex flex-col gap-1.5">
        <button
          type="button"
          onClick={triggerScan}
          disabled={scanStep !== "idle" && scanStep !== "success"}
          className={`w-full h-12 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer ${
            scanStep === "success"
              ? "bg-[#a3f2d8] text-[#004e3e]"
              : scanStep !== "idle"
              ? "bg-[#0d6854] text-white opacity-80 cursor-wait"
              : "bg-[#004e3e] hover:bg-[#0d6854] text-white"
          }`}
        >
          {scanStep === "success" ? (
            <>
              <img src="/icons/check-solid.svg" alt="" className="w-3.5 h-3.5 opacity-80" />
              <span>Vérification complétée avec succès</span>
            </>
          ) : scanStep !== "idle" ? (
            <span>Analyse biométrique en cours...</span>
          ) : (
            <>
              <img src="/icons/expand-solid.svg" alt="" className="w-3.5 h-3.5 filter invert" />
              <span>Démarrer la vérification vidéo / selfie</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-slate-500 text-center mt-1">
          Protégé par biométrie locale. Vos traits faciaux ne sont jamais conservés sur nos serveurs.
        </p>
      </div>

      {/* Avantage Communautaire */}
      <div className="mt-6 p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
          <img src="/icons/bolt-solid.svg" alt="" className="w-4 h-4 opacity-80" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-bold text-slate-900">Avantage Communautaire</div>
          <p className="text-[11px] text-slate-600 mt-0.5">
            Les membres vérifiés reçoivent <strong className="text-emerald-800 font-semibold">3x plus rapidement</strong> des confirmations de dons d&apos;objets.
          </p>
        </div>
      </div>
    </div>
  );
}
