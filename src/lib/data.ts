
import { CategoryType } from '@/types';

export const CATEGORIES: { label: CategoryType; count: number; icon: string }[] = [
  { label: 'Livres & Manuels', count: 0, icon: 'book-solid.svg' },
  { label: 'Informatique & Tech', count: 0, icon: 'laptop-solid.svg' },
  { label: 'Mobilier & Logement', count: 0, icon: 'chair-solid.svg' },
  { label: 'Vêtements & Textiles', count: 0, icon: 'tshirt-solid.svg' },
  { label: 'Équipements domestiques', count: 0, icon: 'blender-solid.svg' },
  { label: 'Autres', count: 0, icon: 'box-open-solid.svg' },
];

export const YAOUNDE_NEIGHBORHOODS = [
  'Melen', 'Ngoa-Ekellé', 'Bastos', 'Biyem-Assi', 'Mokolo', 'Essos', 
  'Mvog-Ada', 'Mvog-Mbi', 'Nlongkak', 'Omnisport', 'Etoudi', 'Odza', 
  'Nkolbisson', 'Obili'
];