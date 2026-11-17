import AppHeader from "@/components/layout/AppHeader";
import Footer from "@/components/layout/Footer";
import {
  EditProfileHeader,
  AvatarIdentityCard,
  BiometricScanCard,
  PersonalInfoForm,
  SecurityPrivacyCard,
  SessionManagementCard,
} from "@/components/profil-modifier";

export default function ModifierProfilPage() {
  return (
    <div className="min-h-screen bg-[#f0fcfa] text-slate-900 flex flex-col font-sans">
      <AppHeader />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-8 py-4">
          <EditProfileHeader />

          {/* Grille Asymétrique 5 colonnes / 7 colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Colonne Gauche : Avatar & Vérification biométrique (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <AvatarIdentityCard />
              <BiometricScanCard />
            </div>

            {/* Colonne Droite : Formulaire & Confidentialité (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <PersonalInfoForm />
              <SecurityPrivacyCard />
              <SessionManagementCard />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
