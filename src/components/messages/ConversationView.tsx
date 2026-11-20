"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { formatNow, getParticipants } from "@/lib/chat";
import type { ChatMessage, Conversation } from "@/types";
import AppointmentBar from "./AppointmentBar";
import ChatHeader from "./ChatHeader";
import ChatWindow from "./ChatWindow";
import CloseTransactionModal from "./CloseTransactionModal";
import DonationBanner from "./DonationBanner";

type Appointment = NonNullable<Conversation["appointment"]>;

interface ConversationViewProps {
  conversation: Conversation;
  currentUserId: string;
  onBack: () => void; // retour à la liste (mobile)
  onAddMessage: (msg: ChatMessage) => void;
  onSaveAppointment: (appointment: Appointment, systemMessage: ChatMessage) => void;
  onMarkAsGiven: () => void;
}

export default function ConversationView({
  conversation,
  currentUserId,
  onBack,
  onAddMessage,
  onSaveAppointment,
  onMarkAsGiven,
}: ConversationViewProps) {
  const { myName, otherName, otherRole } = getParticipants(conversation, currentUserId);

  const [newMessage, setNewMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Édition du rendez-vous
  const [isEditing, setIsEditing] = useState(false);
  const [editDate, setEditDate] = useState(conversation.appointment?.date ?? "");
  const [editTime, setEditTime] = useState(conversation.appointment?.time ?? "");
  const [editLocation, setEditLocation] = useState(conversation.appointment?.location ?? "");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    onAddMessage({
      id: `msg-${Date.now()}`,
      senderId: currentUserId,
      senderName: myName,
      text: newMessage.trim(),
      timestamp: formatNow(),
    });
    setNewMessage("");
  };

  const handleSaveAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveAppointment(
      { date: editDate, time: editTime, location: editLocation, confirmed: true },
      {
        id: `msg-${Date.now()}`,
        senderId: "system",
        senderName: "Système",
        text: `Rendez-vous convenu pour le ${editDate} à ${editTime} au lieu suivant : ${editLocation}.`,
        timestamp: formatNow(),
        isSystem: true,
      }
    );
    setIsEditing(false);
  };

  return (
    <>
      <ChatWindow
        header={
          <ChatHeader name={otherName} subtitle={`En ligne • ${otherRole}`} onBack={onBack}>
            <button
              type="button"
              onClick={() => setShowConfirmModal(true)}
              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Icon name="check-solid" className="w-3.5 h-3.5 invert" />
              <span className="hidden sm:inline">Marquer comme « Donné »</span>
              <span className="sm:hidden">Donné</span>
            </button>
          </ChatHeader>
        }
        banner={
          <DonationBanner
            image={conversation.donationImage}
            title={conversation.donationTitle}
            href={`/dons/${conversation.donationId}`}
          />
        }
        pinned={
          <AppointmentBar
            isEditing={isEditing}
            appointment={conversation.appointment}
            editDate={editDate}
            editTime={editTime}
            editLocation={editLocation}
            onToggleEdit={() => setIsEditing(!isEditing)}
            onChangeDate={setEditDate}
            onChangeTime={setEditTime}
            onChangeLocation={setEditLocation}
            onSaveAppointment={handleSaveAppointment}
          />
        }
        messages={conversation.messages}
        currentUserId={currentUserId}
        newMessage={newMessage}
        onChangeMessage={setNewMessage}
        onSendMessage={handleSend}
      />

      <CloseTransactionModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          setShowConfirmModal(false);
          onMarkAsGiven();
        }}
      />
    </>
  );
}