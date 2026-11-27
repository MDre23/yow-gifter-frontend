"use client";

import { useState } from "react";
import {
  AuthHeader,
  AuthTabs,
  SocialButtons,
  LoginForm,
  RegisterForm,
  AuthSidePanel,
} from "@/components/auth";
import Footer from "@/components/layout/Footer";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#11634A] via-[#0A4533] to-[#062B20] flex flex-col">
      {/* Cercles géométriques en arrière-plan (variantes de #0A4533) */}
      <div className="pointer-events-none select-none absolute inset-0 overflow-hidden">
        {/* Grand cercle sombre en haut à droite */}
        <div className="absolute -top-32 -right-24 w-[500px] h-[500px] sm:w-[740px] sm:h-[740px] rounded-full bg-[#062B20]/55" />
        {/* Grand cercle lumineux à gauche */}
        <div className="absolute top-12 -left-40 w-[440px] h-[440px] sm:w-[660px] sm:h-[660px] rounded-full bg-[#1A8766]/30" />
        {/* Cercle intermédiaire en bas */}
        <div className="absolute -bottom-44 left-1/4 w-[480px] h-[480px] sm:w-[700px] sm:h-[700px] rounded-full bg-[#11634A]/40" />
      </div>

      {/* Header simple */}
      <AuthHeader />

      {/* Contenu principal */}
      <main className="relative z-10 flex-1 pt-20 pb-10 flex items-center">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Texte libre à gauche (sans boîte) */}
            <AuthSidePanel />

            {/* Formulaire compact à droite */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="bg-white rounded-3xl shadow-2xl p-5 sm:p-6 max-w-md w-full mx-auto border border-white/60">
                <AuthTabs mode={mode} onChange={setMode} />

                <div className="mb-4">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {mode === "login"
                      ? "Bienvenue sur Yow Gifter"
                      : "Bienvenue sur Yow Gifter"}
                  </h1>
                  <p className="text-slate-500 mt-0.5 text-xs sm:text-sm">
                    {mode === "login"
                      ? "Connectez-vous pour continuer vos échanges et retrouver vos voisins."
                      : "Rejoignez vos voisins et participez au cercle vertueux du don libre."}
                  </p>
                </div>

                <SocialButtons />

                <div className="relative flex items-center justify-center mb-4">
                  <div className="w-full h-px bg-slate-200" />
                  <span className="absolute bg-white px-3 text-[11px] text-slate-400">
                    ou avec votre adresse e-mail
                  </span>
                </div>

                {mode === "login" ? <LoginForm /> : <RegisterForm />}

                <div className="mt-4 pt-3 text-center">
                  <p className="text-xs sm:text-sm text-slate-500">
                    {mode === "login" ? (
                      <>
                        Pas encore de compte ?{" "}
                        <button
                          onClick={() => setMode("register")}
                          className="text-[#0A4533] font-semibold hover:underline"
                        >
                          S&apos;inscrire gratuitement
                        </button>
                      </>
                    ) : (
                      <>
                        Déjà membre ?{" "}
                        <button
                          onClick={() => setMode("login")}
                          className="text-[#0A4533] font-semibold hover:underline"
                        >
                          Se connecter
                        </button>
                      </>
                    )}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <img
                      src="/icons/shield-alt-solid.svg"
                      alt=""
                      className="w-3 h-3 opacity-60"
                    />
                    Protection SSL 256-bit
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <img
                      src="/icons/lock-solid.svg"
                      alt=""
                      className="w-3 h-3 opacity-60"
                    />
                    Vie privée respectée
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

     
    </div>
  );
}