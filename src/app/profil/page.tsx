"use client";

import { useState } from "react";
import AppHeader from "@/components/layout/AppHeader";
import Footer from "@/components/layout/Footer";
import { CURRENT_USER, INITIAL_DONATIONS } from "@/lib/data";
import {
  ProfileCard,
  ProfileTabs,
  UserDonationsList,
  UserRequestsList,
} from "@/components/profil";

export default function ProfilPage() {
  const [activeTab, setActiveTab] = useState<"donations" | "requests">("donations");

  // Dons publiés par l'utilisateur
  const myDonations = INITIAL_DONATIONS.slice(0, 3);

  // Demandes d'objets formulées par l'utilisateur
  const myRequests = [
    {
      id: "req-1",
      donationId: "1",
      title: "Manuel complet d'Algorithmique et Structures de Données",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      donorName: "Alex_Polytech",
      status: "PRIORITY",
      position: 1,
      requestedAt: "Aujourd'hui à 09:45",
      expiresAt: "Dans 42 minutes",
    },
    {
      id: "req-2",
      donationId: "2",
      title: "Ordinateur portable Dell Latitude E7470",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
      donorName: "Marc_Dev",
      status: "WAITING",
      position: 3,
      requestedAt: "Hier à 14:20",
      expiresAt: undefined,
    },
    {
      id: "req-3",
      donationId: "6",
      title: "Calculatrice scientifique Casio fx-991ES PLUS",
      image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80",
      donorName: "Thierry_T",
      status: "COMPLETED",
      position: 1,
      requestedAt: "Il y a 5 jours",
      expiresAt: undefined,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppHeader />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <ProfileCard
            username={CURRENT_USER.username}
            city={CURRENT_USER.city}
            neighborhood={CURRENT_USER.neighborhood}
            donationsCount={CURRENT_USER.donationsCount}
            receivedCount={CURRENT_USER.receivedCount}
          />

          <ProfileTabs
            activeTab={activeTab}
            donationsCount={myDonations.length}
            requestsCount={myRequests.length}
            onSelectTab={setActiveTab}
          />

          {activeTab === "donations" ? (
            <UserDonationsList donations={myDonations} />
          ) : (
            <UserRequestsList requests={myRequests} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
