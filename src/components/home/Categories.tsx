import Link from 'next/link';
import { Category } from '@/types';

export default function Categories() {
  const categories: Category[] = [
    { id: 'livres', name: 'Livres & Manuels', subtitle: 'Romans, cours & lecture', count: '142 objets', icon: '/icons/book-solid.svg', href: '#livres' },
    { id: 'vetements', name: 'Vêtements & Textiles', subtitle: 'Vestiaire polyvalent', count: '285 objets', icon: '/icons/tshirt-solid.svg', href: '#vetements' },
    { id: 'mobilier', name: 'Mobilier & Logement', subtitle: 'Maison, salons & studios', count: '78 objets', icon: '/icons/couch-solid.svg', href: '#mobilier' },
    { id: 'informatique', name: 'Informatique & Tech', subtitle: 'Matériel & câbles', count: '119 objets', icon: '/icons/laptop-code-solid.svg', href: '#informatique' },
    { id: 'equipements', name: 'Cuisine & Foyer', subtitle: 'Ustensiles & équipement', count: '94 objets', icon: '/icons/utensils-solid.svg', href: '#equipements' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            
            <h2 className="text-2xl lg:text-3xl text-slate-900 mt-1 font-bold">Explorer par catégorie</h2>
          </div>
          <p className="text-sm text-slate-500 max-w-sm">Toutes les rubriques répondent aux besoins essentiels du quotidien et des foyers.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={cat.href} 
              id={cat.id} 
              className="group bg-slate-50 hover:bg-emerald-50/60 border border-slate-100 hover:border-emerald-200 transition-all duration-200 p-6 rounded-2xl shadow-sm flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-white group-hover:bg-emerald-100/60 flex items-center justify-center text-emerald-600 transition-colors mb-4 shadow-xs">
                <img src={cat.icon} alt={cat.name} className="w-8 h-8 object-contain" />
              </div>
              <span className="text-base text-slate-900 group-hover:text-emerald-700 font-semibold transition-colors">{cat.name}</span>
              <span className="text-xs text-slate-500 mt-1">{cat.subtitle}</span>
              <span className="mt-4 text-xs bg-white border border-slate-200/80 text-emerald-800 px-3 py-0.5 rounded-full font-medium">
                {cat.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}