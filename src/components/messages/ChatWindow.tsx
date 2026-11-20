// "use client";

// import Link from "next/link";
// import { ChatMessage } from "@/types";

// interface ChatWindowProps {
//   donorName: string;
//   donationId: string;
//   messages: ChatMessage[];
//   newMessage: string;
//   isGiven: boolean;
//   onChangeMessage: (val: string) => void;
//   onSendMessage: (e: React.FormEvent) => void;
// }

// export default function ChatWindow({
//   donorName,
//   donationId,
//   messages,
//   newMessage,
//   isGiven,
//   onChangeMessage,
//   onSendMessage,
// }: ChatWindowProps) {
//   return (
//     <div className="lg:col-span-8 flex flex-col justify-between h-[620px]">
//       {/* En-tête du chat */}
//       <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
//             {donorName.slice(0, 2).toUpperCase()}
//           </div>
//           <div>
//             <h3 className="text-xs font-bold text-slate-900">
//               {donorName} (Donateur)
//             </h3>
//             <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
//               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
//               En ligne • Canal direct privé
//             </span>
//           </div>
//         </div>

//         <Link
//           href={`/dons/${donationId}`}
//           className="text-xs text-slate-500 hover:text-emerald-700 font-medium"
//         >
//           Voir l&apos;annonce →
//         </Link>
//       </div>

//       {/* Zone des messages défilable */}
//       <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/30 custom-scrollbar">
//         {messages.map((msg) => {
//           if (msg.isSystem) {
//             return (
//               <div
//                 key={msg.id}
//                 className="my-3 mx-auto max-w-md bg-emerald-50 border border-emerald-200 text-emerald-900 text-center text-xs py-2 px-4 rounded-xl shadow-2xs"
//               >
//                 <span className="font-semibold">Info :</span> {msg.text}
//               </div>
//             );
//           }

//           const isMe = msg.senderId === "usr-current";

//           return (
//             <div
//               key={msg.id}
//               className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
//             >
//               <span className="text-[10px] font-semibold text-slate-400 mb-1 px-1">
//                 {msg.senderName} • {msg.timestamp}
//               </span>
//               <div
//                 className={`max-w-md px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
//                   isMe
//                     ? "bg-emerald-600 text-white rounded-br-xs"
//                     : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Champ d'envoi */}
//       <form
//         onSubmit={onSendMessage}
//         className="p-3 sm:p-4 bg-white border-t border-slate-100 flex items-center gap-2"
//       >
//         <input
//           type="text"
//           value={newMessage}
//           disabled={isGiven}
//           onChange={(e) => onChangeMessage(e.target.value)}
//           placeholder={
//             isGiven
//               ? "Cette transaction est clôturée."
//               : "Écrivez votre message pour convenir de la rencontre..."
//           }
//           className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 disabled:opacity-50"
//         />
//         <button
//           type="submit"
//           disabled={isGiven || !newMessage.trim()}
//           className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
//         >
//           Envoyer
//         </button>
//       </form>
//     </div>
//   );
// }


"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ChatMessage } from "@/types";
import MessageBubble from "./MessageBubble";
import SystemMessage from "./SystemMessage";
import DateSeparator from "./DateSeparator";
import MessageInput from "./MessageInput";

interface ChatWindowProps {
  header: ReactNode;
  banner?: ReactNode; // élément fixe tout en haut, sous l'en-tête
  pinned?: ReactNode; // élément fixe tout en bas, au-dessus du champ de saisie
  messages: ChatMessage[];
  currentUserId: string;
  newMessage: string;
  onChangeMessage: (val: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  dateLabel?: string;
  patternUrl?: string;
}

export default function ChatWindow({
  header,
  banner,
  pinned,
  messages,
  currentUserId,
  newMessage,
  onChangeMessage,
  onSendMessage,
  dateLabel = "Aujourd'hui",
  patternUrl = "/chat-pattern.svg",
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Comme sur WhatsApp : on descend sur le dernier message à chaque nouveau message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex flex-col flex-1 h-full min-h-0">
      {header}
      {banner}

      <div
        className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-6 py-3 bg-emerald-50 custom-scrollbar"
        style={{ backgroundImage: `url(${patternUrl})`, backgroundSize: "240px 240px" }}
      >
        <DateSeparator label={dateLabel} />

        {messages.map((msg, index) => {
          if (msg.isSystem) {
            return <SystemMessage key={msg.id} text={msg.text} />;
          }

          const previous = messages[index - 1];
          const isFirstOfGroup =
            !previous || previous.isSystem || previous.senderId !== msg.senderId;

          return (
            <MessageBubble
              key={msg.id}
              text={msg.text}
              timestamp={msg.timestamp}
              isMe={msg.senderId === currentUserId}
              isFirstOfGroup={!!isFirstOfGroup}
            />
          );
        })}

        <div ref={bottomRef} />
      </div>

      {pinned}

      <MessageInput
        value={newMessage}
        onChange={onChangeMessage}
        onSubmit={onSendMessage}
        placeholder="Écrivez un message pour convenir de la rencontre"
      />
    </div>
  );
}