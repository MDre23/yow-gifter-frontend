import { Donation, Conversation, UserProfile, CategoryType, ConditionType } from '@/types';

export const CATEGORIES: { label: CategoryType; count: number; icon: string }[] = [
  { label: 'Livres & Manuels', count: 184, icon: 'book-solid.svg' },
  { label: 'Informatique & Tech', count: 142, icon: 'laptop-solid.svg' },
  { label: 'Mobilier & Logement', count: 96, icon: 'chair-solid.svg' },
  { label: 'Vêtements & Textiles', count: 210, icon: 'tshirt-solid.svg' },
  { label: 'Équipements domestiques', count: 68, icon: 'blender-solid.svg' },
  { label: 'Autres', count: 35, icon: 'box-open-solid.svg' },
];

export const YAOUNDE_NEIGHBORHOODS = [
  'Melen',
  'Ngoa-Ekellé',
  'Bastos',
  'Biyem-Assi',
  'Mokolo',
  'Essos',
  'Mvog-Ada',
  'Mvog-Mbi',
  'Nlongkak',
  'Omnisport',
  'Etoudi',
  'Odza',
  'Nkolbisson',
  'Obili',
];

export const INITIAL_DONATIONS: Donation[] = [
  {
    id: '1',
    title: 'Manuel complet d\'Algorithmique et Structures de Données',
    description: 'Manuel de référence pour étudiants et passionnés. Édition récente, couverture propre, aucun surlignage gênant. Idéal pour préparer les cours et projets.',
    category: 'Livres & Manuels',
    condition: 'TRES_BON',
    status: 'AVAILABLE',
    city: 'Yaoundé',
    neighborhood: 'Melen',
    quantity: 1,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80'
    ],
    createdAt: 'Il y a 2 heures',
    donor: {
      id: 'usr-1',
      username: 'Alex_K',
      city: 'Yaoundé',
      neighborhood: 'Melen',
      campusBadge: 'Membre vérifié',
    },
    queueCount: 2,
    currentPriorityExpiresAt: '2026-11-09T18:00:00Z',
  },
  {
    id: '2',
    title: 'Ordinateur portable Dell Latitude E7470',
    description: 'Processeur Core i5, 8 Go de RAM, SSD 256 Go. Cédé avec son chargeur d\'origine. Batterie fonctionnelle (~2h en bureautique). Clavier AZERTY propre.',
    category: 'Informatique & Tech',
    condition: 'BON',
    status: 'RESERVED',
    city: 'Yaoundé',
    neighborhood: 'Ngoa-Ekellé',
    quantity: 1,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80'
    ],
    createdAt: 'Il y a 5 heures',
    donor: {
      id: 'usr-2',
      username: 'Marc_Dev',
      city: 'Yaoundé',
      neighborhood: 'Ngoa-Ekellé',
      campusBadge: 'Membre vérifié',
    },
    queueCount: 4,
    currentPriorityExpiresAt: '2026-11-09T14:30:00Z',
  },
  {
    id: '3',
    title: 'Bureau d\'étude en bois compact avec tiroir',
    description: 'Dimensions 90x50 cm, parfait pour petite pièce ou studio. Solide et stable. Possibilité de démontage rapide pour le transport.',
    category: 'Mobilier & Logement',
    condition: 'TRES_BON',
    status: 'AVAILABLE',
    city: 'Yaoundé',
    neighborhood: 'Biyem-Assi',
    quantity: 1,
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80'
    ],
    createdAt: 'Il y a 1 jour',
    donor: {
      id: 'usr-3',
      username: 'Sandrine_K',
      city: 'Yaoundé',
      neighborhood: 'Biyem-Assi',
      campusBadge: 'Membre actif',
    },
    queueCount: 0,
  },
  {
    id: '4',
    title: 'Lot de 3 pulls d\'hiver et vestes légères',
    description: 'Taille M, en parfait état, lavés et repassés. Deux pulls en coton épais et une veste coupe-vent, parfait pour la saison des pluies.',
    category: 'Vêtements & Textiles',
    condition: 'COMME_NEUF',
    status: 'AVAILABLE',
    city: 'Yaoundé',
    neighborhood: 'Bastos',
    quantity: 3,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80'
    ],
    createdAt: 'Il y a 2 jours',
    donor: {
      id: 'usr-4',
      username: 'Elodie_Bastos',
      city: 'Yaoundé',
      neighborhood: 'Bastos',
    },
    queueCount: 1,
  },
  {
    id: '5',
    title: 'Bouilloire électrique inox 1.8L',
    description: 'Fonctionne parfaitement. Arrêt automatique après ébullition. Base pivotante 360°. Utilisée un an avec soin.',
    category: 'Équipements domestiques',
    condition: 'BON',
    status: 'AVAILABLE',
    city: 'Yaoundé',
    neighborhood: 'Melen',
    quantity: 1,
    images: [
      'https://images.unsplash.com/photo-1594213114663-ddf4f240f084?auto=format&fit=crop&w=800&q=80'
    ],
    createdAt: 'Il y a 3 jours',
    donor: {
      id: 'usr-1',
      username: 'Alex_K',
      city: 'Yaoundé',
      neighborhood: 'Melen',
      campusBadge: 'Membre vérifié',
    },
    queueCount: 0,
  },
  {
    id: '6',
    title: 'Calculatrice scientifique Casio fx-991ES PLUS',
    description: 'Deux lignes d\'affichage naturel, idéale pour études scientifiques. Pile en bon état, capot de protection inclus.',
    category: 'Informatique & Tech',
    condition: 'COMME_NEUF',
    status: 'GIVEN',
    city: 'Yaoundé',
    neighborhood: 'Ngoa-Ekellé',
    quantity: 1,
    images: [
      'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80'
    ],
    createdAt: 'Il y a 5 jours',
    donor: {
      id: 'usr-5',
      username: 'Thierry_T',
      city: 'Yaoundé',
      neighborhood: 'Ngoa-Ekellé',
      campusBadge: 'Membre vérifié',
    },
    queueCount: 0,
  }
];

export const CURRENT_USER: UserProfile = {
  id: 'usr-current',
  username: 'Alex K.',
  fullName: 'Alexandre Kamdem',
  email: 'alexandre.k@exemple.cm',
  phone: '699 12 34 56',
  city: 'Yaoundé',
  neighborhood: 'Melen',
  age: 23,
  gender: 'Homme',
  campusBadge: 'Membre vérifié',
  bio: 'Adepte du réemploi et du partage solidaire.',
  donationsCount: 4,
  receivedCount: 2,
};

export const INITIAL_CONVERSATION: Conversation = {
  id: 'conv-101',
  donationId: '1',
  donationTitle: 'Manuel complet d\'Algorithmique et Structures de Données',
  donationImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
  donorId: 'usr-1',
  donorName: 'Alex_K',
  beneficiaryId: 'usr-current',
  beneficiaryName: 'Alex K.',
  status: 'ACTIVE',
  appointment: {
    date: 'Mardi 10 Novembre 2026',
    time: '12h30',
    location: 'Devant la poste de Melen',
    confirmed: true,
  },
  messages: [
    {
      id: 'msg-1',
      senderId: 'usr-current',
      senderName: 'Alex K.',
      text: 'Bonjour ! Je suis le premier demandeur prioritaire pour le manuel d\'algorithmique. Est-ce qu\'il est toujours disponible ?',
      timestamp: '10:15',
    },
    {
      id: 'msg-2',
      senderId: 'usr-1',
      senderName: 'Alex_K',
      text: 'Bonjour ! Oui tout à fait, ta priorité est confirmée. Quand serais-tu disponible pour le récupérer ?',
      timestamp: '10:18',
    },
    {
      id: 'msg-3',
      senderId: 'usr-current',
      senderName: 'Alex K.',
      text: 'Super ! Je passe vers Melen mardi midi vers 12h30. Devant la poste de Melen ça te conviendrait ?',
      timestamp: '10:22',
    },
    {
      id: 'msg-4',
      senderId: 'usr-1',
      senderName: 'Alex_K',
      text: 'Parfait pour moi, devant la poste à 12h30. Je valide le point de rendez-vous.',
      timestamp: '10:25',
    },
  ],
};
