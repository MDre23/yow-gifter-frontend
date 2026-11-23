"use client";

import { useState } from "react";
import AppHeader from "@/components/layout/AppHeader";
import EmptyState from "@/components/ui/EmptyState";
import Icon from "@/components/ui/Icon";
import { CURRENT_USER_ID, INITIAL_CONVERSATIONS } from "@/lib/data";
import type { ChatMessage, Conversation } from "@/types";
import { ConversationList, ConversationView } from "@/components/messages";

type Appointment = NonNullable<Conversation["appointment"]>;

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [closedNotice, setClosedNotice] = useState(false);

  const selected = conversations.find((c) => c.id === selectedId) ?? null;
  const showChat = selected !== null || closedNotice;

  const updateConversation = (id: string, change: (c: Conversation) => Conversation) =>
    setConversations((prev) => prev.map((c) => (c.id === id ? change(c) : c)));

  const handleSelect = (id: string) => {
    setClosedNotice(false);
    setSelectedId(id);
  };

  const handleAddMessage = (id: string, msg: ChatMessage) =>
    updateConversation(id, (c) => ({ ...c, messages: [...c.messages, msg] }));

  const handleSaveAppointment = (id: string, appointment: Appointment, sysMsg: ChatMessage) =>
    updateConversation(id, (c) => ({
      ...c,
      appointment,
      messages: [...c.messages, sysMsg],
    }));

  const handleMarkAsGiven = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    setSelectedId(null);
    setClosedNotice(true);
    // TODO backend
  };

  return (
    <div className="h-dvh flex flex-col overflow-hidden bg-slate-100">
      {/* Header uniquement sur PC */}
      <div className="hidden lg:block shrink-0">
        <AppHeader />
      </div>

      {/* La messagerie descend proprement sous le header sur PC et prend TOUT l'espace restant */}
      <div className="flex-1 min-h-0 w-full lg:pt-20">
        <div className="h-full max-w-6xl w-full mx-auto bg-white lg:border-x border-slate-200/80 lg:shadow-sm grid grid-cols-1 lg:grid-cols-12">
          
          {/* Liste */}
          <div
            className={`lg:col-span-4 lg:border-r border-slate-100 min-h-0 h-full flex flex-col ${
              showChat ? "hidden lg:flex" : "flex"
            }`}
          >
            <ConversationList
              conversations={conversations}
              currentUserId={CURRENT_USER_ID}
              selectedId={selectedId}
              onSelect={handleSelect}
            />
          </div>

          {/* Chat */}
          <div
            className={`lg:col-span-8 min-h-0 h-full flex flex-col ${
              showChat ? "flex" : "hidden lg:flex"
            }`}
          >
            {selected ? (
              <ConversationView
                key={selected.id}
                conversation={selected}
                currentUserId={CURRENT_USER_ID}
                onBack={() => setSelectedId(null)}
                onAddMessage={(msg) => handleAddMessage(selected.id, msg)}
                onSaveAppointment={(appt, msg) =>
                  handleSaveAppointment(selected.id, appt, msg)
                }
                onMarkAsGiven={() => handleMarkAsGiven(selected.id)}
              />
            ) : closedNotice ? (
              <EmptyState
                icon={<Icon name="check-solid" className="w-6 h-6 opacity-70" />}
                title="Don remis avec succès"
                description="La conversation a été clôturée. Merci d'avoir participé !"
                actionLabel="Retour aux conversations"
                onAction={() => setClosedNotice(false)}
                secondaryLabel="Explorer les dons"
                secondaryHref="/explorer"
              />
            ) : (
              <EmptyState
                title="Vos conversations"
                description="Sélectionnez une conversation pour discuter avec un donateur ou un bénéficiaire."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}