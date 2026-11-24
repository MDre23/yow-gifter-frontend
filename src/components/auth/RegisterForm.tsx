"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

const cities = [
  "Yaoundé",
  "Douala",
  "Bafoussam",
  "Garoua",
  "Maroua",
  "Bamenda",
  "Ngaoundéré",
  "Bertoua",
  "Ebolowa",
  "Kribi",
  "Limbe",
  "Buea",
  "Dschang",
  "Foumban",
  "Kumba",
];

const neighborhoodsByCity: Record<string, string[]> = {
  Yaoundé: [
    "Melen",
    "Ngoa-Ekellé",
    "Bastos",
    "Biyem-Assi",
    "Essos",
    "Mvog-Ada",
    "Mvog-Mbi",
    "Mokolo",
    "Elig-Edzoa",
    "Nlongkak",
    "Omnisport",
    "Emana",
    "Etoudi",
    "Odza",
    "Nkoldongo",
    "Mimboman",
    "Simbock",
    "Ahala",
    "Nkolbisson",
    "Obili",
  ],
  Douala: [
    "Akwa",
    "Bonanjo",
    "Bonapriso",
    "Deido",
    "New-Bell",
    "Bassa",
    "Makepe",
    "Logbessou",
    "Yassa",
    "Bonamoussadi",
    "Kotto",
    "PK 8",
    "PK 11",
    "Cité des Palmiers",
  ],
  default: ["Centre-ville", "Quartier résidentiel", "Autre"],
};

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Yaoundé");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [neighborhood, setNeighborhood] = useState("Melen");
  const [age, setAge] = useState<number | undefined>(22);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const neighborhoods =
    neighborhoodsByCity[selectedCity] || neighborhoodsByCity.default;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Appel réel à l'API Spring Boot
      await authService.register({
        email,
        password,
        username,
        firstName: firstName || username,
        lastName: lastName || "Citoyen",
        neighborhood: `${selectedCity} - ${neighborhood}`,
        phone,
        age,
      });
      router.push("/explorer");
    } catch (err: unknown) {
      // Affichage de la vraie erreur (ex: "Email déjà utilisé")
      const msg = err instanceof Error ? err.message : "Erreur lors de l'inscription";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[380px] overflow-y-auto pr-1 custom-scrollbar">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Nom d'utilisateur */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Nom d&apos;utilisateur
          </label>
          <div className="relative">
            <img
              src="/icons/user-solid.svg"
              alt=""
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50"
            />
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ex: Marie_K ou Paul_Citoyen"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Prénom & Nom */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Prénom (visible)
            </label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Ex: Marie"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nom (masqué au public)
            </label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Ex: Mvesso"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Âge */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Âge
          </label>
          <input
            type="number"
            min={16}
            max={99}
            value={age || ""}
            onChange={(e) => setAge(parseInt(e.target.value) || undefined)}
            placeholder="Ex: 24"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          />
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Numéro de téléphone
          </label>
          <div className="relative">
            <img
              src="/icons/phone-solid.svg"
              alt=""
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ex: 6XX XX XX XX"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Adresse e-mail
          </label>
          <div className="relative">
            <img
              src="/icons/envelope-solid.svg"
              alt=""
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre.email@domaine.com"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Ville */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Ville de résidence
          </label>
          <div className="relative">
            <img
              src="/icons/map-marker-alt-solid.svg"
              alt=""
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50 pointer-events-none"
            />
            <select
              required
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 appearance-none"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quartier */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Quartier
          </label>
          <select
            required
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          >
            <option value="">Sélectionner un quartier</option>
            {neighborhoods.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <img
              src="/icons/shield-alt-solid.svg"
              alt=""
              className="w-3 h-3 opacity-60"
            />
            Localisation indicative, sans géolocalisation intrusive.
          </p>
        </div>

        {/* Mot de passe */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Créer un mot de passe
          </label>
          <div className="relative">
            <img
              src="/icons/key-solid.svg"
              alt=""
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50"
            />
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Au moins 6 caractères"
              className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <img
                src={
                  showPassword
                    ? "/icons/eye-slash-solid.svg"
                    : "/icons/eye-solid.svg"
                }
                alt=""
                className="w-4 h-4 opacity-50"
              />
            </button>
          </div>
        </div>

        {/* Charte */}
        <label className="flex items-start gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            required
            className="w-4 h-4 mt-0.5 rounded accent-emerald-600"
          />
          <span className="text-sm text-slate-600">
            J&apos;accepte la{" "}
            <Link
              href="#"
              className="text-emerald-600 font-semibold hover:underline"
            >
              charte éthique citoyenne
            </Link>{" "}
            et de réemploi solidaire.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-70"
        >
          <span>{loading ? "Création du compte..." : "Créer mon compte & Accéder à l'application"}</span>
          <img
            src="/icons/check-solid.svg"
            alt=""
            className="w-4 h-4 filter invert"
          />
        </button>
      </form>
    </div>
  );
}