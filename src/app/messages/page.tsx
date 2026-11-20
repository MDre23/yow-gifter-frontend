"use client";

import { useState } from "react";
import AppHeader from "@/components/layout/AppHeader";
// import Footer from "@/components/layout/Footer";
import EmptyState from "@/components/ui/EmptyState";
import Icon from "@/components/ui/Icon";
import { CURRENT_USER_ID, INITIAL_CONVERSATIONS } from "@/lib/data";
import type { ChatMessage, Conversation } from "@/types";
import { ConversationList, ConversationView } from "@/components/messages";

type Appointment = NonNullable<Conversation["appointment"]>;

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [closedNotice, setClosedNotice] = useState(false); // écran affiché après une remise

  const selected = conversations.find((c) => c.id === selectedId) ?? null;
  const showRight = selected !== null || closedNotice; // sur mobile : chat OU liste

  const updateConversation = (id: string, change: (c: Conversation) => Conversation) =>
    setConversations((prev) => prev.map((c) => (c.id === id ? change(c) : c)));

  const handleSelect = (id: string) => {
    setClosedNotice(false);
    setSelectedId(id);
  };

  const handleAddMessage = (id: string, msg: ChatMessage) =>
    updateConversation(id, (c) => ({ ...c, messages: [...c.messages, msg] }));

  const handleSaveAppointment = (id: string, appointment: Appointment, sysMsg: ChatMessage) =>
    updateConversation(id, (c) => ({ ...c, appointment, messages: [...c.messages, sysMsg] }));

  const handleMarkAsGiven = (id: string) => {
    // La conversation est supprimée de la liste ; les autres restent disponibles
    setConversations((prev) => prev.filter((c) => c.id !== id));
    setSelectedId(null);
    setClosedNotice(true);
    // TODO backend : marquer le don "Donné" et supprimer la conversation côté Spring Boot
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppHeader />

      <main className="flex-1 pt-24 pb-8">
        <div className="max-w-6xl mx-auto px-0 sm:px-8">
          <div className="bg-white sm:rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 h-[calc(100dvh-8rem)] min-h-[520px]">
            {/* Volet gauche : liste des conversations */}
            <div
              className={`lg:col-span-4 lg:border-r border-slate-100 min-h-0 flex-col ${
                showRight ? "hidden lg:flex" : "flex"
              }`}
            >
              <ConversationList
                conversations={conversations}
                currentUserId={CURRENT_USER_ID}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
            </div>

            {/* Volet droit : chat, écran de fin ou invitation à choisir */}
            <div
              className={`lg:col-span-8 min-h-0 flex-col ${showRight ? "flex" : "hidden lg:flex"}`}
            >
              {selected ? (
                <ConversationView
                  key={selected.id}
                  conversation={selected}
                  currentUserId={CURRENT_USER_ID}
                  onBack={() => setSelectedId(null)}
                  onAddMessage={(msg) => handleAddMessage(selected.id, msg)}
                  onSaveAppointment={(appt, msg) => handleSaveAppointment(selected.id, appt, msg)}
                  onMarkAsGiven={() => handleMarkAsGiven(selected.id)}
                />
              ) : closedNotice ? (
                <EmptyState
                  icon={<Icon name="check-solid" className="w-6 h-6 opacity-70" />}
                  title="Don remis avec succès"
                  description="La conversation a été supprimée, conformément à la clôture du don. Merci d'avoir participé !"
                  actionLabel="Retour au chat"
                  onAction={() => setClosedNotice(false)}
                  secondaryLabel="Voir les annonces"
                  secondaryHref="/"
                />
              ) : (
                <EmptyState
                  title="Vos conversations"
                  description="Sélectionnez une conversation dans la liste pour échanger avec un donateur ou un bénéficiaire."
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}