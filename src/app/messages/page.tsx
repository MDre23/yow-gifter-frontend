// "use client";

// import { useState } from "react";
// import AppHeader from "@/components/layout/AppHeader";
// import Footer from "@/components/layout/Footer";
// import { INITIAL_CONVERSATION } from "@/lib/data";
// import { ChatMessage } from "@/types";
// import {
//   ConversationSummary,
//   AppointmentBox,
//   ChatWindow,
//   CloseTransactionModal,
// } from "@/components/messages";

// export default function MessagesPage() {
//   const [conversation, setConversation] = useState(INITIAL_CONVERSATION);
//   const [newMessage, setNewMessage] = useState("");
//   const [appointment, setAppointment] = useState(INITIAL_CONVERSATION.appointment);
//   const [isGiven, setIsGiven] = useState(false);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);

//   // Édition du rendez-vous
//   const [editDate, setEditDate] = useState("Mardi 10 Novembre 2026");
//   const [editTime, setEditTime] = useState("12h30");
//   const [editLocation, setEditLocation] = useState(
//     "Campus principal (Devant le portail)"
//   );
//   const [isEditingAppointment, setIsEditingAppointment] = useState(false);

//   const handleSendMessage = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;

//     const msg: ChatMessage = {
//       id: `msg-${Date.now()}`,
//       senderId: "usr-current",
//       senderName: "Alex K.",
//       text: newMessage.trim(),
//       timestamp: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };

//     setConversation((prev) => ({
//       ...prev,
//       messages: [...prev.messages, msg],
//     }));
//     setNewMessage("");
//   };

//   const handleSaveAppointment = (e: React.FormEvent) => {
//     e.preventDefault();
//     setAppointment({
//       date: editDate,
//       time: editTime,
//       location: editLocation,
//       confirmed: true,
//     });
//     setIsEditingAppointment(false);

//     // Ajouter un message système
//     const sysMsg: ChatMessage = {
//       id: `msg-${Date.now()}`,
//       senderId: "system",
//       senderName: "Système",
//       text: `Rendez-vous convenu pour le ${editDate} à ${editTime} au lieu suivant : ${editLocation}.`,
//       timestamp: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//       isSystem: true,
//     };
//     setConversation((prev) => ({
//       ...prev,
//       messages: [...prev.messages, sysMsg],
//     }));
//   };

//   const handleMarkAsGiven = () => {
//     setIsGiven(true);
//     setShowConfirmModal(false);

//     const closeMsg: ChatMessage = {
//       id: `msg-${Date.now()}`,
//       senderId: "system",
//       senderName: "Système",
//       text: "L'objet a été marqué comme « Donné ». La remise a été enregistrée avec succès.",
//       timestamp: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//       isSystem: true,
//     };
//     setConversation((prev) => ({
//       ...prev,
//       status: "CONCLUDED",
//       messages: [...prev.messages, closeMsg],
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col">
//       <AppHeader />

//       <main className="flex-1 pt-24 pb-16">
//         <div className="max-w-6xl mx-auto px-4 sm:px-8">
          
//           {/* En-tête */}
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//             <div>
//               <div className="flex items-center gap-2">
//                 <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
//                   Messagerie Privée
//                 </h1>
//                 <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
//                   Canal Direct
//                 </span>
//               </div>
//               <p className="text-slate-500 text-xs mt-1">
//                 Espace sécurisé pour organiser la remise en main propre de l&apos;objet.
//               </p>
//             </div>

//             {/* Statut clôture transactionnelle */}
//             {isGiven ? (
//               <span className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-xs flex items-center gap-2">
//                 <span>Statut : Donné</span>
//                 <span className="text-emerald-400">✓ Remis</span>
//               </span>
//             ) : (
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmModal(true)}
//                 className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
//               >
//                 <img src="/icons/check-solid.svg" alt="" className="w-3.5 h-3.5 filter invert" />
//                 <span>Marquer comme « Donné »</span>
//               </button>
//             )}
//           </div>

//           <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
//             {/* Volet gauche */}
//             <div className="lg:col-span-4 border-r border-slate-100 bg-slate-50/50 flex flex-col">
//               <ConversationSummary
//                 image={conversation.donationImage}
//                 title={conversation.donationTitle}
//                 donorName={conversation.donorName}
//               />

//               <AppointmentBox
//                 isGiven={isGiven}
//                 isEditing={isEditingAppointment}
//                 appointment={appointment}
//                 editDate={editDate}
//                 editTime={editTime}
//                 editLocation={editLocation}
//                 onToggleEdit={() => setIsEditingAppointment(!isEditingAppointment)}
//                 onChangeDate={setEditDate}
//                 onChangeTime={setEditTime}
//                 onChangeLocation={setEditLocation}
//                 onSaveAppointment={handleSaveAppointment}
//               />
//             </div>

//             {/* Volet droit : Chat */}
//             <ChatWindow
//               donorName={conversation.donorName}
//               donationId={conversation.donationId}
//               messages={conversation.messages}
//               newMessage={newMessage}
//               isGiven={isGiven}
//               onChangeMessage={setNewMessage}
//               onSendMessage={handleSendMessage}
//             />
//           </div>
//         </div>
//       </main>

//       <CloseTransactionModal
//         isOpen={showConfirmModal}
//         onClose={() => setShowConfirmModal(false)}
//         onConfirm={handleMarkAsGiven}
//       />

//       <Footer />
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import AppHeader from "@/components/layout/AppHeader";
import Footer from "@/components/layout/Footer";
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

      <Footer />
    </div>
  );
}