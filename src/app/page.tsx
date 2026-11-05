import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import ImpactMetrics from '@/components/home/ImpactMetrics';
import Categories from '@/components/home/Categories';
import ProductGrid from '@/components/home/ProductGrid';
import HowItWorks from '@/components/home/HowItWorks';
import Manifesto from '@/components/home/Manifesto';
import CTA from '@/components/home/CTA';
import { Product } from '@/types';

// Données fictives locales pour faire tourner le site sans l'API
const LOCAL_DUMMY_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Ordinateur portable Dell Latitude',
    description: 'Core i5, 8GB RAM, SSD 256GB. Batterie tenant 2 heures. Idéal pour bureautique, études et dev.',
    category: 'Informatique',
    location: 'Yaoundé - Melen',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwu7IyHJVFGOWzq6JlDUpo19xo5zv9L9c8HgX1LjEfKVQFwi4PahS3wgB4nwYslj-AkUUmUYlwYRMuJnm66PdEKEyZ1wtylzqsqalLixe-xeTYl_4fNQPmNzkw2NOSrHBh35dHU3OxX_uoETpeViBpix24GRP_59E2EKDcPHsgo7w59bXITul_voe4gXmcy4TyXVhn0UhncNE1F_tQc94ZhUp7ceOhoz5P5oDx3u0m',
    imageAlt: 'PC Portable Dell Latitude'
  },
  {
    id: '2',
    title: 'Lot manuels Algorithmique & Réseaux',
    description: "Manuels de référence complets avec annales corrigées et fiches d'exercices d'informatique générale.",
    category: 'Livres & Cours',
    location: 'Yaoundé - Ngoa-Ekellé',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6t9YHZc63Ja3-GhCshNJYExNYB5Jhu4bTOloGjWXku39DU-MfgKBDDGFsUJc8QlHr6mRMHyOrZSZWk-39CtvpkE1JMqsYNeP8RAJGW8GTVjroC72LUHL2cBahDWBR42Xz0lae0YHfIfycp1Mi2MC-_72lhuRpnEWSy2zWtA_UQJ0A_CMPYG9sSy9ZyLcDCziHIZLQ40Q4LtGVl0JP3Nl6vuVZDuYji-ji0L_7MEkc',
    imageAlt: 'Manuels Algorithmique'
  },
  {
    id: '3',
    title: "Bureau d'étude en bois compact",
    description: "Dimensions 90x50 cm, tiroir fonctionnel. Prêt pour démontage rapide ou retrait sur place.",
    category: 'Mobilier',
    location: 'Yaoundé - Biyem-Assi',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGjD_-4QvVBOpMqgF3yl5Q7s-iX2smAnI5LAwempbraaLjcsPmWxuvMY9ZBOC1pTyPN7iUbS0uKWLXztn-inchE4dqnHRXw23F9h8rOPOfFeK1fh5TBVEsN2119u6-bChiQ0M4moiCjiYGi2Wiwzo_9taIO_APQ9qszLQPPE_E2_pSgDgkr0u8NiN1KlDh0sqa8SVtKS9nt6Fem6jgBKSlZBaDl3ceU2KKH7ozjKb4',
    imageAlt: 'Bureau en bois'
  },
  {
    id: '4',
    title: "Veste d'hiver et pulls chauds",
    description: 'Taille M/L, lavés et impeccables. Parfaits pour les soirées fraîches ou la saison des pluies sur Yaoundé.',
    category: 'Vêtements',
    location: 'Yaoundé - Bastos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSGl402dRPXf_a4DjkcukPV9dV6xMoo1SrbBlp3-fpZAgldafvr2cEQxyrNMQ0gG06u7t-asaDbUv003OSJrpafIpAW670W5MZzij3_gd-DG3ltjFn9tS0uPWSVOm97kfilSgD6W8y4kFAdVmPVf5M7TCZxAuWxGswswvC5lUaltdD7yi7wwBwVwXInawXPbekkLHHGqsxs5h2Ovl_UJOcA_sMfWYqBPVOV4bO3f6U',
    imageAlt: 'Veste et pulls'
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Header />
      <main className="pt-28">
        <Hero />
        <ImpactMetrics />
        <Categories />
        <ProductGrid initialProducts={LOCAL_DUMMY_PRODUCTS} />
        <HowItWorks />
        <Manifesto />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}