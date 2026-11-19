"use client";

import { useState, useMemo, useEffect } from "react";
import AppHeader from "@/components/layout/AppHeader";
import Footer from "@/components/layout/Footer";
import { INITIAL_DONATIONS } from "@/lib/data";
import { donationService } from "@/services/donation.service";
import { Donation, CategoryType, ConditionType, DonationStatus } from "@/types";
import {
  ExplorerBanner,
  CategoryPills,
  FilterBar,
  DonationGrid,
} from "@/components/explorer";

export default function ExplorerPage() {
  const [donations, setDonations] = useState<Donation[]>(INITIAL_DONATIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [selectedCondition, setSelectedCondition] = useState<string>("all");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isLiveApi, setIsLiveApi] = useState(false);

  // Connexion API Spring Boot : Chargement des dons réels depuis PostgreSQL
  useEffect(() => {
    async function fetchLiveDonations() {
      try {
        const response = await donationService.getDonations({ size: 50 });
        if (response && response.content && response.content.length > 0) {
          const mapped: Donation[] = response.content.map((item) => ({
            id: String(item.id),
            title: item.title,
            description: item.description,
            category: item.categoryName as CategoryType,
            condition: item.condition as ConditionType,
            status: item.status as DonationStatus,
            city: item.city,
            neighborhood: item.neighborhood,
            quantity: item.quantity,
            images: item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls : ["/images/default_objet.png"],
            createdAt: item.createdAt,
            donor: {
              id: String(item.donor.id),
              username: item.donor.firstName || item.donor.username,
              city: item.donor.city,
              neighborhood: item.donor.neighborhood,
            },
            queueCount: item.waitingRequestsCount,
          }));
          setDonations(mapped);
          setIsLiveApi(true);
        }
      } catch {
        // Fallback transparent vers les données locales si le backend n'est pas encore démarré
        console.info("Utilisation des données locales (Backend non connecté ou hors ligne).");
      }
    }
    fetchLiveDonations();
  }, []);

  const filteredDonations = useMemo(() => {
    return donations.filter((item) => {
      // Recherche textuelle
      if (
        searchQuery &&
        !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Catégorie
      if (selectedCategory !== "Tous" && item.category !== selectedCategory) {
        return false;
      }

      // État
      if (selectedCondition !== "all" && item.condition !== selectedCondition) {
        return false;
      }

      // Quartier
      if (
        selectedNeighborhood !== "all" &&
        !item.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase())
      ) {
        return false;
      }

      // Statut
      if (selectedStatus !== "all" && item.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [donations, searchQuery, selectedCategory, selectedCondition, selectedNeighborhood, selectedStatus]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Tous");
    setSelectedCondition("all");
    setSelectedNeighborhood("all");
    setSelectedStatus("all");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppHeader />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* Panneau de recherche et de filtres */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-100 mb-6">
            <ExplorerBanner
              searchQuery={searchQuery}
              onChangeSearch={setSearchQuery}
            />

            <CategoryPills
              selectedCategory={selectedCategory}
              totalCount={donations.length}
              onSelectCategory={setSelectedCategory}
            />

            <FilterBar
              selectedCondition={selectedCondition}
              selectedNeighborhood={selectedNeighborhood}
              selectedStatus={selectedStatus}
              onChangeCondition={setSelectedCondition}
              onChangeNeighborhood={setSelectedNeighborhood}
              onChangeStatus={setSelectedStatus}
            />
          </div>

          {/* En-tête des résultats */}
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {filteredDonations.length} {filteredDonations.length > 1 ? "articles disponibles" : "article disponible"}
              </span>
              {isLiveApi && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#004e3e] text-[10px] font-bold">
                  ● Connecté API Live
                </span>
              )}
            </div>
           
          </div>

          {/* Grille */}
          <DonationGrid
            items={filteredDonations}
            onResetFilters={handleResetFilters}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
