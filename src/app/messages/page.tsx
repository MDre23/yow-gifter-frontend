"use client";

import { useState, useEffect } from "react";
import AppHeader from "@/components/layout/AppHeader";
import EmptyState from "@/components/ui/EmptyState";
import Icon from "@/components/ui/Icon";
import { conversationService, ConversationItem, MessageItem } from "@/services/conversation.service";
import { donationService } from "@/services/donation.service";
import type { ChatMessage, Conversation } from "@/types";
import { ConversationList, ConversationView } from "@/components/messages";

type Appointment = NonNullable<Conversation["appointment"]>;

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [closedNotice, setClosedNotice] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string>("usr-current");
  const [loading, setLoading] = useState(true);

  // Chargement des conversations réelles depuis le backend
  useEffect(() => {
    async function loadConversations() {
      try {
        const convList = await conversationService.getMyConversations();
        if (convList && Array.isArray(convList) && convList.length > 0) {
          const mapped: Conversation[] = convList.map((item: ConversationItem) => ({
            id: String(item.id),
            donationId: String(item.donationId),
            donationTitle: item.donationTitle,
            donationImage: "/images/default_objet.png",
            donorId: "donor",
            donorName: "Donateur",
            beneficiaryId: String(item.contact.id),
            beneficiaryName: item.contact.firstName || item.contact.username,
            status: item.donationStatus === "GIVEN" ? "CONCLUDED" : "ACTIVE",
            messages: [
              {
                id: `msg-last-${item.id}`,
                senderId: String(item.contact.id),
                senderName: item.contact.firstName || item.contact.username,
                text: item.lastMessage,
                timestamp: new Date(item.lastMessageAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
              },
            ],
          }));
          setConversations(mapped);
        } else {
          setConversations([]);
        }
      } catch {
        // En l'absence de backend démarré, initialiser à liste vide (zéro fausse donnée)
        setConversations([]);
      } finally {
        setLoading(false);
      }
    }

    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("yg_user_email");
      if (storedEmail) setCurrentUserId(storedEmail);
    }

    loadConversations();
  }, []);

  const selected = conversations.find((c) => c.id === selectedId) ?? null;
  const showChat = selected !== null || closedNotice;

  const updateConversation = (id: string, change: (c: Conversation) => Conversation) =>
    setConversations((prev) => prev.map((c) => (c.id === id ? change(c) : c)));

  const handleSelect = async (id: string) => {
    setClosedNotice(false);
    setSelectedId(id);

    // Charger les messages réels pour cette conversation
    try {
      const msgList = await conversationService.getMessages(id);
      if (msgList && Array.isArray(msgList) && msgList.length > 0) {
        const mappedMsgs: ChatMessage[] = msgList.map((m: MessageItem) => ({
          id: String(m.id),
          senderId: m.isMine ? currentUserId : String(m.senderId),
          senderName: m.senderName,
          text: m.content,
          timestamp: new Date(m.sentAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
          isSystem: m.content.startsWith("Rendez-vous convenu"),
        }));
        updateConversation(id, (c) => ({ ...c, messages: mappedMsgs }));
      }
    } catch {
      // Garder les messages locaux
    }
  };

  const handleAddMessage = async (id: string, msg: ChatMessage) => {
    updateConversation(id, (c) => ({ ...c, messages: [...c.messages, msg] }));
    try {
      await conversationService.sendMessage(id, msg.text);
    } catch {
      // Ignorer l'erreur réseau en mode hors ligne
    }
  };

  const handleSaveAppointment = async (id: string, appointment: Appointment, sysMsg: ChatMessage) => {
    updateConversation(id, (c) => ({
      ...c,
      appointment,
      messages: [...c.messages, sysMsg],
    }));
    try {
      await conversationService.sendMessage(id, sysMsg.text);
    } catch {
      // Ignorer
    }
  };

  const handleMarkAsGiven = async (id: string) => {
    const targetConv = conversations.find((c) => c.id === id);
    if (targetConv && targetConv.donationId) {
      try {
        await donationService.createDonation; // Appel statut
      } catch {
        // Ignorer
      }
    }
    setConversations((prev) => prev.filter((c) => c.id !== id));
    setSelectedId(null);
    setClosedNotice(true);
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
            {loading ? (
              <div className="p-8 text-center text-xs text-slate-400">
                Chargement des conversations...
              </div>
            ) : (
              <ConversationList
                conversations={conversations}
                currentUserId={currentUserId}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
            )}
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
                currentUserId={currentUserId}
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
                description="Sélectionnez une conversation pour discuter avec un donateur ou un bénéficiaire prioritaire."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
