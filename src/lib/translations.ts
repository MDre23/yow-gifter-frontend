// src/lib/translations.ts

// Traduction des états des dons
export const DonationStatusLabels: Record<string, string> = {
    AVAILABLE: "Disponible",
    RESERVED: "Réservé",
    GIVEN: "Donné ✓",
    SUSPENDED: "Suspendu",
  };
  
  // Traduction de l'état d'usure
  export const ConditionLabels: Record<string, string> = {
    NEUF: "Neuf",
    COMME_NEUF: "Comme neuf",
    TRES_BON: "Très bon état",
    BON: "Bon état",
    POUR_PIECES: "Pour pièces",
  };
  
  // Traduction des statuts des demandes (File d'attente)
  export const RequestStatusLabels: Record<string, string> = {
    WAITING: "En attente",
    PRIORITY: "Prioritaire (#1)",
    CANCELLED: "Annulé",
    EXPIRED: "Délai expiré",
    COMPLETED: "Objet récupéré ✓",
  };