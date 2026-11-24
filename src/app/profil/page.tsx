"use client";

import { useState, useEffect } from "react";
import AppHeader from "@/components/layout/AppHeader";
import Footer from "@/components/layout/Footer";
import { authService, UserProfile } from "@/services/auth.service";
import { donationService } from "@/services/donation.service";
import { requestService, RequestItem as ApiRequestItem } from "@/services/request.service";
import { Donation } from "@/types";
import {
  ProfileCard,
  ProfileTabs,
  UserDonationsList,
  UserRequestsList,
} from "@/components/profil";
import { RequestItem } from "@/components/profil/UserRequestsList";

export default function ProfilPage() {
  const [activeTab, setActiveTab] = useState<"donations" | "requests">("donations");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [myDonations, setMyDonations] = useState<Donation[]>([]);
  const [myRequests, setMyRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfileData() {
      try {
        const me = await authService.getMe();
        if (me) {
          setProfile(me);
        }
      } catch {
        // Fallback local avec identifiants enregistrés
        if (typeof window !== "undefined") {
          const storedName = localStorage.getItem("yg_username") || "Mon Compte";
          const storedEmail = localStorage.getItem("yg_user_email") || "";
          setProfile({
            id: 1,
            email: storedEmail,
            username: storedName,
            firstName: storedName.split(" ")[0] || "Citoyen",
            lastName: "",
            city: "Yaoundé",
            neighborhood: "Melen / Campus UY1",
            isVerified: true,
            createdAt: new Date().toISOString(),
          });
        }
      }

      // Chargement des demandes réelles
      try {
        const reqs = await requestService.getMyRequests();
        if (reqs && reqs.length > 0) {
          const mapped: RequestItem[] = reqs.map((r: ApiRequestItem) => ({
            id: String(r.id),
            donationId: String(r.donationId),
            title: r.donationTitle,
            image: "/images/default_objet.png",
            donorName: "Donateur",
            status: r.status,
            position: r.positionInQueue,
            requestedAt: new Date(r.requestedAt).toLocaleDateString("fr-FR"),
            expiresAt: r.expiresAt ? new Date(r.expiresAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) : undefined,
          }));
          setMyRequests(mapped);
        }
      } catch {
        // Pas de requêtes actives
      }

      // Chargement des dons réels
      try {
        const dons = await donationService.getDonations();
        if (dons && dons.content && dons.content.length > 0) {
          setMyDonations([]);
        }
      } catch {
        // Pas de dons créés
      } finally {
        setLoading(false);
      }
    }

    loadProfileData();
  }, []);

  const displayName = profile
    ? `${profile.firstName} ${profile.lastName ? profile.lastName : ""}`.trim()
    : "Mon Profil Citoyen";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppHeader />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <ProfileCard
            username={displayName || "Alex Kamga"}
            city={profile?.city || "Yaoundé"}
            neighborhood={profile?.neighborhood || "Melen"}
            donationsCount={myDonations.length}
            receivedCount={myRequests.filter((r) => r.status === "COMPLETED").length}
          />

          <ProfileTabs
            activeTab={activeTab}
            donationsCount={myDonations.length}
            requestsCount={myRequests.length}
            onSelectTab={setActiveTab}
          />

          {loading ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              Chargement de votre activité solidaire...
            </div>
          ) : activeTab === "donations" ? (
            myDonations.length > 0 ? (
              <UserDonationsList donations={myDonations} />
            ) : (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/80 mt-4">
                <p className="text-sm font-semibold text-slate-700">Vous n&apos;avez pas encore publié de don.</p>
                <p className="text-xs text-slate-400 mt-1">Donnez une seconde vie à vos objets inutilisés en 0 FCFA.</p>
              </div>
            )
          ) : myRequests.length > 0 ? (
            <UserRequestsList requests={myRequests} />
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/80 mt-4">
              <p className="text-sm font-semibold text-slate-700">Vous n&apos;avez aucune demande active pour le moment.</p>
              <p className="text-xs text-slate-400 mt-1">Explorez les dons disponibles pour réserver des objets utiles à vos études ou projets.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
