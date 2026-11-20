import type { Conversation } from "@/types";

export const formatNow = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// Retire majuscules et accents pour une recherche tolérante
export const normalize = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// Qui est l'autre personne, et quel est mon rôle dans cette conversation ?
export function getParticipants(conversation: Conversation, currentUserId: string) {
  const isDonor = conversation.donorId === currentUserId;
  return {
    isDonor,
    myName: isDonor ? conversation.donorName : conversation.beneficiaryName,
    otherName: isDonor ? conversation.beneficiaryName : conversation.donorName,
    otherRole: isDonor ? "Bénéficiaire" : "Donateur",
    relation: isDonor ? "Vous donnez" : "Vous recevez",
  };
}

export function matchesSearch(conversation: Conversation, query: string) {
  const q = normalize(query.trim());
  if (!q) return true;
  return [conversation.donorName, conversation.beneficiaryName, conversation.donationTitle].some(
    (field) => normalize(field).includes(q)
  );
}