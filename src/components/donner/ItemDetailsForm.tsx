import { CategoryType, ConditionType } from "@/types";

interface ItemDetailsFormProps {
  title: string;
  category: CategoryType;
  condition: ConditionType;
  quantity: number;
  description: string;
  onChangeTitle: (val: string) => void;
  onChangeCategory: (val: CategoryType) => void;
  onChangeCondition: (val: ConditionType) => void;
  onChangeQuantity: (val: number) => void;
  onChangeDescription: (val: string) => void;
}

export default function ItemDetailsForm({
  title,
  category,
  condition,
  quantity,
  description,
  onChangeTitle,
  onChangeCategory,
  onChangeCondition,
  onChangeQuantity,
  onChangeDescription,
}: ItemDetailsFormProps) {
  return (
    <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-100 space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold">
            2
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            Description de l&apos;article
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-1 pl-9">
          Renseignez des détails précis pour aider les futurs receveurs.
        </p>
      </div>

      {/* Titre */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Titre de l&apos;annonce <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-slate-400">
            {title.length} / 100 caractères
          </span>
        </div>
        <input
          type="text"
          required
          maxLength={100}
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          placeholder="Ex: Manuel de mathématiques ou Bureau d'étude compact"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600"
        />
      </div>

      {/* Catégorie & État */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Catégorie <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => onChangeCategory(e.target.value as CategoryType)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600"
          >
            <option value="Livres & Manuels">Livres & Manuels</option>
            <option value="Informatique & Tech">Informatique & Tech</option>
            <option value="Mobilier & Logement">Mobilier & Logement</option>
            <option value="Vêtements & Textiles">Vêtements & Textiles</option>
            <option value="Équipements domestiques">Équipements domestiques</option>
            <option value="Autres">Autres</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            État d&apos;usure <span className="text-red-500">*</span>
          </label>
          <select
            value={condition}
            onChange={(e) => onChangeCondition(e.target.value as ConditionType)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600"
          >
            <option value="NEUF">Neuf (jamais utilisé)</option>
            <option value="COMME_NEUF">Comme neuf (impeccable)</option>
            <option value="TRES_BON">Très bon état (légère marque d&apos;usage)</option>
            <option value="BON">Bon état (pleinement fonctionnel)</option>
            <option value="POUR_PIECES">Pour pièces / À bricoler</option>
          </select>
        </div>
      </div>

      {/* Quantité */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Quantité offerte
        </label>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
            <button
              type="button"
              onClick={() => onChangeQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 flex items-center justify-center hover:bg-slate-200 text-slate-700 font-bold text-base cursor-pointer"
            >
              -
            </button>
            <span className="w-12 text-center text-sm font-bold text-slate-800">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => onChangeQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center hover:bg-slate-200 text-slate-700 font-bold text-base cursor-pointer"
            >
              +
            </button>
          </div>
          <span className="text-xs text-slate-500">
            (Article individuel ou taille du lot)
          </span>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Description détaillée <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={4}
          value={description}
          onChange={(e) => onChangeDescription(e.target.value)}
          placeholder="Précisez la taille, les fonctionnalités, les éventuels défauts d'usure ou conseils d'utilisation..."
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600"
        />
      </div>
    </section>
  );
}
