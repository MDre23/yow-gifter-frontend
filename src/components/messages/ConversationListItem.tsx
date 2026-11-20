import Avatar from "@/components/ui/Avatar";
import { getParticipants } from "@/lib/chat";
import type { Conversation } from "@/types";

interface ConversationListItemProps {
  conversation: Conversation;
  currentUserId: string;
  isSelected: boolean;
  onSelect: () => void;
}

export default function ConversationListItem({
  conversation,
  currentUserId,
  isSelected,
  onSelect,
}: ConversationListItemProps) {
  const { otherName, relation } = getParticipants(conversation, currentUserId);
  const last = conversation.messages[conversation.messages.length - 1];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left flex items-center gap-3 px-3 py-3 border-b border-slate-100 transition-colors cursor-pointer ${
        isSelected ? "bg-emerald-50" : "bg-white hover:bg-slate-50"
      }`}
    >
      <Avatar name={otherName} />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <h4 className="text-sm font-bold text-slate-900 truncate">{otherName}</h4>
          <span className="text-[10px] text-slate-400 shrink-0">{last?.timestamp}</span>
        </div>
        <p className="text-[11px] font-semibold text-emerald-700 truncate">
          {conversation.donationTitle}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="shrink-0 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
            {relation}
          </span>
          <p className="text-[11px] text-slate-500 truncate">{last?.text}</p>
        </div>
      </div>
    </button>
  );
}