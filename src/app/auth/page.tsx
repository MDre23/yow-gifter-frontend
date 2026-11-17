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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header simple */}
      <AuthHeader />

      {/* Contenu principal */}
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start min-h-[640px]">
            
            {/* Formulaire */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-xl w-full mx-auto border border-slate-100">
                
                <AuthTabs mode={mode} onChange={setMode} />

                <div className="mb-6">
                 
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    {mode === "login"
                      ? "Bienvenue sur Yow Gifter"
                      : "Bienvenue sur Yow Gifter"}
                  </h1>
                  <p className="text-slate-500 mt-1 text-sm">
                    {mode === "login"
                      ? "Connectez-vous pour continuer vos échanges et retrouver vos voisins."
                      : "Rejoignez vos voisins et participez au cercle vertueux du don libre."}
                  </p>
                </div>

                <SocialButtons />

                <div className="relative flex items-center justify-center mb-6">
                  <div className="w-full h-px bg-slate-200" />
                  <span className="absolute bg-white px-3 text-xs text-slate-400">
                    ou avec votre adresse e-mail
                  </span>
                </div>

                {mode === "login" ? <LoginForm /> : <RegisterForm />}

                <div className="mt-6 pt-4 text-center">
                  <p className="text-sm text-slate-500">
                    {mode === "login" ? (
                      <>
                        Pas encore de compte ?{" "}
                        <button
                          onClick={() => setMode("register")}
                          className="text-emerald-600 font-semibold hover:underline"
                        >
                          S&apos;inscrire gratuitement
                        </button>
                      </>
                    ) : (
                      <>
                        Déjà membre ?{" "}
                        <button
                          onClick={() => setMode("login")}
                          className="text-emerald-600 font-semibold hover:underline"
                        >
                          Se connecter
                        </button>
                      </>
                    )}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <img
                      src="/icons/shield-alt-solid.svg"
                      alt=""
                      className="w-3.5 h-3.5 opacity-60"
                    />
                    Protection SSL 256-bit
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <img
                      src="/icons/lock-solid.svg"
                      alt=""
                      className="w-3.5 h-3.5 opacity-60"
                    />
                    Vie privée respectée
                  </span>
                </div>
              </div>
            </div>

            {/* Panneau latéral */}
            <AuthSidePanel />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}