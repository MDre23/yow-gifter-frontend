"use client";

import { useState } from "react";
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
  title = "Mes conversations",
}: ConversationListProps) {
  const [query, setQuery] = useState("");
  const visible = conversations.filter((c) => matchesSearch(c, query));

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white">
      <div className="px-4 pt-4 pb-3 border-b border-slate-100 space-y-3 shrink-0">
        <h2 className="text-base font-extrabold text-slate-900">{title}</h2>
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Rechercher un donateur, un bénéficiaire, un objet"
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