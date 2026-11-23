"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { ChatMessage } from "@/types";
import MessageBubble from "./MessageBubble";
import SystemMessage from "./SystemMessage";
import DateSeparator from "./DateSeparator";
import MessageInput from "./MessageInput";

interface ChatWindowProps {
  header: ReactNode;
  banner?: ReactNode;
  pinned?: ReactNode;
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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex flex-col flex-1 h-full min-h-0">
      {header}
      {banner}

      <div
        className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-6 py-3 bg-emerald-50/80 custom-scrollbar"
        style={{
          backgroundImage: `url(${patternUrl})`,
          backgroundSize: "240px 240px",
        }}
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