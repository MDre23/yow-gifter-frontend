"use client";

import { useState } from "react";
import AppHeader from "@/components/layout/AppHeader";
import Footer from "@/components/layout/Footer";
import { INITIAL_CONVERSATION } from "@/lib/data";
import { ChatMessage } from "@/types";
import {
  ConversationSummary,
  AppointmentBox,
  ChatWindow,
  CloseTransactionModal,
} from "@/components/messages";

export default function MessagesPage() {
  const [conversation, setConversation] = useState(INITIAL_CONVERSATION);
  const [newMessage, setNewMessage] = useState("");
  const [appointment, setAppointment] = useState(INITIAL_CONVERSATION.appointment);
  const [isGiven, setIsGiven] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Édition du rendez-vous
  const [editDate, setEditDate] = useState("Mardi 10 Novembre 2026");
  const [editTime, setEditTime] = useState("12h30");
  const [editLocation, setEditLocation] = useState(
    "Campus principal (Devant le portail)"
  );
  const [isEditingAppointment, setIsEditingAppointment] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: "usr-current",
      senderName: "Alex K.",
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversation((prev) => ({
      ...prev,
      messages: [...prev.messages, msg],
    }));
    setNewMessage("");
  };

  const handleSaveAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setAppointment({
      date: editDate,
      time: editTime,
      location: editLocation,
      confirmed: true,
    });
    setIsEditingAppointment(false);

    // Ajouter un message système
    const sysMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: "system",
      senderName: "Système",
      text: `Rendez-vous convenu pour le ${editDate} à ${editTime} au lieu suivant : ${editLocation}.`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSystem: true,
    };
    setConversation((prev) => ({
      ...prev,
      messages: [...prev.messages, sysMsg],
    }));
  };

  const handleMarkAsGiven = () => {
    setIsGiven(true);
    setShowConfirmModal(false);

    const closeMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: "system",
      senderName: "Système",
      text: "L'objet a été marqué comme « Donné ». La remise a été enregistrée avec succès.",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSystem: true,
    };
    setConversation((prev) => ({
      ...prev,
      status: "CONCLUDED",
      messages: [...prev.messages, closeMsg],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppHeader />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          
          {/* En-tête */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Conversation
                </h1>
               
              </div>
          
            </div>

            {/* Statut clôture transactionnelle */}
            {isGiven ? (
              <span className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-xs flex items-center gap-2">
                <span>Statut : Donné</span>
                <span className="text-emerald-400">✓ Remis</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <img src="/icons/check-solid.svg" alt="" className="w-3.5 h-3.5 filter invert" />
                <span>Marquer comme « Donné »</span>
              </button>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
            {/* Volet gauche */}
            <div className="lg:col-span-4 border-r border-slate-100 bg-slate-50/50 flex flex-col">
              <ConversationSummary
                image={conversation.donationImage}
                title={conversation.donationTitle}
                donorName={conversation.donorName}
              />

              <AppointmentBox
                isGiven={isGiven}
                isEditing={isEditingAppointment}
                appointment={appointment}
                editDate={editDate}
                editTime={editTime}
                editLocation={editLocation}
                onToggleEdit={() => setIsEditingAppointment(!isEditingAppointment)}
                onChangeDate={setEditDate}
                onChangeTime={setEditTime}
                onChangeLocation={setEditLocation}
                onSaveAppointment={handleSaveAppointment}
              />
            </div>

            {/* Volet droit : Chat */}
            <ChatWindow
              donorName={conversation.donorName}
              donationId={conversation.donationId}
              messages={conversation.messages}
              newMessage={newMessage}
              isGiven={isGiven}
              onChangeMessage={setNewMessage}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </main>

      <CloseTransactionModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleMarkAsGiven}
      />

      <Footer />
    </div>
  );
}
