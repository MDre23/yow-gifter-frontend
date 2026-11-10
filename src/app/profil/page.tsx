import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

type DonationStatus = 'rdv' | 'disponible' | 'donne';

type Donation = {
  id: string;
  title: string;
  description: string;
  location: string;
  status: DonationStatus;
  statusLabel: string;
  emoji: string;
};

type DonationRequest = {
  id: string;
  title: string;
  position: number;
  statusLabel: string;
  message: string;
};

const DONATIONS: Donation[] = [
  {
    id: '1',
    title: 'Écran PC Dell 24" UltraSharp',
    description: "Avec câble HDMI et alimentation d'origine.",
    location: 'Carrefour Melen Emia',
    status: 'rdv',
    statusLabel: 'En cours de rendez-vous',
    emoji: '🖥️',
  },
  {
    id: '2',
    title: 'Lot de 3 chaises',
    description: 'Chaises en bon état, idéales pour étudier.',
    location: 'Yaoundé - Melen',
    status: 'disponible',
    statusLabel: 'Disponible (0 demande)',
    emoji: '🪑',
  },
  {
    id: '3',
    title: 'Mixeur plongeant Moulinex',
    description: 'Transmis à une voisine du quartier.',
    location: 'Yaoundé - Melen',
    status: 'donne',
    statusLabel: 'Donné • Clôturé',
    emoji: '🥣',
  },
];

const REQUESTS: DonationRequest[] = [
  {
    id: '1',
    title: "Bureau d'étude en bois et tiroirs",
    position: 1,
    statusLabel: 'Position 1 • Bénéficiaire prioritaire',
    message:
      'Le donateur a validé votre position. Confirmez le créneau de rendez-vous avant expiration du délai.',
  },
  {
    id: '2',
    title: 'Four micro-ondes Sharp Compact',
    position: 2,
    statusLabel: 'Position 2 • En réserve',
    message:
      "Si le premier demandeur se désiste ou dépasse le délai, l'objet vous sera attribué automatiquement.",
  },
];

const STATS = [
  { label: 'Dons accordés', value: '8', emoji: '🎁' },
  { label: 'Dons reçus', value: '3', emoji: '📦' },
  { label: 'Ponctualité RDV', value: '100%', emoji: '⏱️' },
  { label: 'Rôle', value: 'Donateur & bénéficiaire', emoji: '🔄' },
];

const STATUS_STYLES: Record<DonationStatus, string> = {
  rdv: 'bg-amber-100 text-amber-900',
  disponible: 'bg-emerald-100 text-emerald-900',
  donne: 'bg-slate-200 text-slate-700',
};

export default function ProfilPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Header />
      <main className="pt-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8">
          {/* En-tête du profil */}
          <section className="bg-slate-50 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-emerald-100 flex items-center justify-center text-4xl">
                🌿
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold">Alex M.</h1>
                <p className="text-sm text-slate-600">
                  Membre depuis octobre 2024 • Yaoundé - Melen
                </p>
                <p className="text-xs text-slate-500">
                  Identifiant anonymisé • Coordonnées privées non affichées
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="h-11 px-5 rounded-full bg-emerald-700 text-white text-sm font-semibold">
                Publier un don
              </button>
              <button className="h-11 px-5 rounded-full bg-slate-200 text-slate-800 text-sm font-semibold">
                Modifier le profil
              </button>
            </div>
          </section>

          {/* Statistiques */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-slate-50 rounded-xl p-4">
                <div className="text-2xl">{stat.emoji}</div>
                <p className="text-lg font-bold text-emerald-800">{stat.value}</p>
                <p className="text-xs text-slate-600">{stat.label}</p>
              </div>
            ))}
          </section>

          {/* Double historique */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Historique des dons */}
            <div className="bg-slate-50 rounded-xl p-5 space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Mes dons proposés</h2>
                <p className="text-sm text-slate-600">Historique des dons</p>
              </div>
              {DONATIONS.map((don) => (
                <article key={don.id} className="bg-white rounded-xl p-4 space-y-3 border border-slate-200">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[don.status]}`}>
                    {don.statusLabel}
                  </span>
                  <div className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg bg-slate-100 flex items-center justify-center text-3xl shrink-0">
                      {don.emoji}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold truncate">{don.title}</h3>
                      <p className="text-sm text-slate-600">{don.description}</p>
                      <p className="text-xs text-teal-700 mt-1">📍 {don.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {don.status === 'rdv' && (
                      <>
                        <button className="flex-1 h-10 rounded-lg bg-emerald-700 text-white text-sm font-semibold">
                          Gérer le RDV
                        </button>
                        <button className="flex-1 h-10 rounded-lg bg-slate-200 text-emerald-800 text-sm font-semibold">
                          Marquer comme donné
                        </button>
                      </>
                    )}
                    {don.status === 'disponible' && (
                      <button className="flex-1 h-10 rounded-lg bg-slate-200 text-slate-800 text-sm font-semibold">
                        Modifier l&apos;annonce
                      </button>
                    )}
                    {don.status === 'donne' && (
                      <button className="flex-1 h-10 rounded-lg bg-slate-200 text-slate-800 text-sm font-semibold">
                        Voir le détail
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Historique des demandes */}
            <div className="bg-slate-50 rounded-xl p-5 space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Mes demandes</h2>
                <p className="text-sm text-slate-600">Suivi de vos positions dans la file</p>
              </div>
              {REQUESTS.map((req) => (
                <article key={req.id} className="bg-white rounded-xl p-4 space-y-3 border border-slate-200">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      req.position === 1 ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {req.statusLabel}
                  </span>
                  <h3 className="font-bold">{req.title}</h3>
                  <p className="text-sm text-slate-600">{req.message}</p>
                  <div className="flex gap-2">
                    {req.position === 1 ? (
                      <>
                        <button className="flex-1 h-10 rounded-lg bg-emerald-700 text-white text-sm font-semibold">
                          Confirmer mon créneau
                        </button>
                        <button className="h-10 px-4 rounded-lg bg-red-50 text-red-700 text-sm font-semibold">
                          Me désister
                        </button>
                      </>
                    ) : (
                      <button className="flex-1 h-10 rounded-lg bg-slate-200 text-slate-700 text-sm font-semibold">
                        Quitter la file
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Confidentialité */}
          <section className="bg-emerald-50 rounded-xl p-5 text-sm text-slate-700">
            🔒 Vos coordonnées personnelles et le lieu précis du rendez-vous ne sont jamais
            affichés publiquement. Ils sont partagés uniquement dans la messagerie privée.
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

