"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AppHeader from "@/components/layout/AppHeader";
import Footer from "@/components/layout/Footer";
import { INITIAL_DONATIONS } from "@/lib/data";
import { donationService } from "@/services/donation.service";
import { requestService } from "@/services/request.service";
import { Donation, CategoryType, ConditionType, DonationStatus } from "@/types";
import {
  DonationGallery,
  DonationSpecs,
  FifoQueueSection,
  DonorCard,
} from "@/components/dons";

export default function DonationDetailClient({ id }: { id: string }) {
  const [donation, setDonation] = useState<Donation | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // État local de la demande / File d'attente FIFO
  const [userQueueStatus, setUserQueueStatus] = useState<
    "NONE" | "PRIORITY" | "WAITING"
  >("NONE");
  const [queuePosition, setQueuePosition] = useState<number>(0);
  const [totalQueue, setTotalQueue] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(3600); // TTL en secondes
  const [currentRequestId, setCurrentRequestId] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDonation() {
      try {
        const live = await donationService.getDonationById(id);
        if (live && isMounted) {
          const mapped: Donation = {
            id: String(live.id),
            title: live.title,
            description: live.description,
            category: live.categoryName as CategoryType,
            condition: live.condition as ConditionType,
            status: live.status as DonationStatus,
            city: live.city,
            neighborhood: live.neighborhood,
            quantity: live.quantity,
            images:
              live.imageUrls && live.imageUrls.length > 0
                ? live.imageUrls
                : ["/images/default_objet.png"],
            createdAt: live.createdAt,
            donor: {
              id: String(live.donor.id),
              username: live.donor.firstName || live.donor.username,
              city: live.donor.city,
              neighborhood: live.donor.neighborhood,
              campusBadge: live.donor.isVerified ? "Membre vérifié" : undefined,
            },
            queueCount: live.waitingRequestsCount,
          };
          setDonation(mapped);
          setTotalQueue(live.waitingRequestsCount || 0);

          try {
            const myRequests = await requestService.getMyRequests();
            const myReq = myRequests.find((r) => String(r.donationId) === String(id));
            if (myReq && isMounted) {
              setCurrentRequestId(myReq.id);
              if (myReq.status === "PRIORITY") {
                setUserQueueStatus("PRIORITY");
                setQueuePosition(1);
              } else if (myReq.status === "WAITING") {
                setUserQueueStatus("WAITING");
                setQueuePosition(myReq.positionInQueue || 1);
              }
            }
          } catch {
            // Non authentifié ou hors ligne
          }
          return;
        }
      } catch {
        // Fallback transparent
      }

      if (isMounted) {
        const item =
          INITIAL_DONATIONS.find((d) => d.id === id) ||
          INITIAL_DONATIONS[0];
        setDonation(item);
        setTotalQueue(item.queueCount || 0);
      }
    }

    loadDonation();
    return () => {
      isMounted = false;
    };
  }, [id]);

  // Simulation du décompte TTL
  useEffect(() => {
    if (userQueueStatus !== "PRIORITY") return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [userQueueStatus]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}m ${secs
      .toString()
      .padStart(2, "0")}s`;
  };

  // Action : Rejoindre la file FIFO
  const handleJoinQueue = async () => {
    if (!donation) return;

    try {
      const req = await requestService.joinQueue(id);
      setCurrentRequestId(req.id);
      if (req.status === "PRIORITY") {
        setUserQueueStatus("PRIORITY");
        setQueuePosition(1);
        setTotalQueue((prev) => prev + 1);
        setTimeLeft(48 * 3600);
      } else {
        setUserQueueStatus("WAITING");
        setQueuePosition(req.positionInQueue || totalQueue + 1);
        setTotalQueue((prev) => prev + 1);
      }
    } catch {
      // Mode hors-ligne / fallback
      if (totalQueue === 0 && donation.status === "AVAILABLE") {
        setUserQueueStatus("PRIORITY");
        setQueuePosition(1);
        setTotalQueue(1);
        setTimeLeft(3600);
      } else {
        const newPos = totalQueue + 1;
        setUserQueueStatus("WAITING");
        setQueuePosition(newPos);
        setTotalQueue(newPos);
      }
    }
  };

  // Action : Désistement volontaire
  const handleCancelRequest = async () => {
    if (
      confirm(
        "Êtes-vous sûr de vouloir vous désister ? Le demandeur suivant dans la file d'attente deviendra prioritaire."
      )
    ) {
      if (currentRequestId) {
        try {
          await requestService.cancelRequest(currentRequestId);
        } catch {
          // Erreur réseau ignorée
        }
      }
      setUserQueueStatus("NONE");
      setQueuePosition(0);
      setCurrentRequestId(null);
      setTotalQueue((prev) => Math.max(0, prev - 1));
    }
  };

  if (!donation) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <AppHeader />
        <div className="text-center py-32 text-slate-500">Chargement...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppHeader />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          
          {/* Fil d'ariane */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/explorer" className="hover:text-emerald-700 transition-colors">
              Catalogue des dons
            </Link>
            <span>/</span>
            <span className="text-emerald-700 truncate max-w-xs">{donation.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Colonne gauche : Galerie & Description */}
            <div className="lg:col-span-7 space-y-4">
              <DonationGallery
                title={donation.title}
                images={donation.images}
                status={donation.status}
                activeImageIndex={activeImageIndex}
                onSelectImage={setActiveImageIndex}
              />

              <DonationSpecs
                description={donation.description}
                category={donation.category}
                condition={donation.condition}
                quantity={donation.quantity}
              />
            </div>

            {/* Colonne droite : En-tête + File d'attente + Donateur */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800">
                      {donation.category}
                    </span>
                    <span className="text-xs text-slate-400">• {donation.createdAt}</span>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                    {donation.title}
                  </h1>

                  <div className="flex items-center gap-2 text-xs text-slate-600 mt-3">
                    <img src="/icons/map-marker-alt-solid.svg" alt="" className="w-3.5 h-3.5 opacity-60" />
                    <span className="font-semibold">{donation.city}</span>
                    <span>—</span>
                    <span>{donation.neighborhood}</span>
                  </div>
                </div>

                {/* Section File d'attente */}
                <FifoQueueSection
                  userQueueStatus={userQueueStatus}
                  queuePosition={queuePosition}
                  totalQueue={totalQueue}
                  timeLeft={timeLeft}
                  formatTime={formatTime}
                  onJoinQueue={handleJoinQueue}
                  onCancelRequest={handleCancelRequest}
                />

                {/* Donateur */}
                <DonorCard
                  username={donation.donor.username}
                  neighborhood={donation.donor.neighborhood}
                  campusBadge={donation.donor.campusBadge}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
