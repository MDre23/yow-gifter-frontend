"use client";

import { useState } from "react";
import Link from "next/link";
import SearchInput from "@/components/ui/SearchInput";
import { matchesSearch } from "@/lib/chat";
import type { Conversation } from "@/types";
import ConversationListItem from "./ConversationListItem";

interface ConversationListProps {
  conversations: Conversation[];
  currentUserId: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
  title?: string;
}

export default function ConversationList({
  conversations,
  currentUserId,
  selectedId,
  onSelect,
  title = "Messagerie",
}: ConversationListProps) {
  const [query, setQuery] = useState("");
  const visible = conversations.filter((c) => matchesSearch(c, query));

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white">
      <div className="px-3 pt-3 pb-3 border-b border-slate-100 space-y-3 shrink-0 bg-emerald-700 text-white">
        <div className="flex items-center gap-2">
          {/* Mobile uniquement : retour vers Explorer */}
          <Link
            href="/explorer"
            aria-label="Retour à Explorer les dons"
            className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center hover:bg-emerald-600 active:bg-emerald-800 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <h2 className="text-base font-bold flex-1 tracking-tight">{title}</h2>
        </div>
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Rechercher une conversation"
        />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
        {visible.length === 0 ? (
          <p className="p-6 text-center text-xs text-slate-500">
            {conversations.length === 0
              ? "Aucune conversation en cours."
              : "Aucun résultat pour cette recherche."}
          </p>
        ) : (
          visible.map((c) => (
            <ConversationListItem
              key={c.id}
              conversation={c}
              currentUserId={currentUserId}
              isSelected={c.id === selectedId}
              onSelect={() => onSelect(c.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}