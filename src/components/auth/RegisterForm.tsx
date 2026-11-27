"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
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
] as const;

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

/** Limites strictes */
const LIMITS = {
  username: { min: 3, max: 30 },
  firstName: { min: 2, max: 50 },
  lastName: { min: 2, max: 50 },
  email: { max: 100 },
  password: { min: 8, max: 64 },
  phone: { min: 9, max: 9 }, // 9 chiffres (sans indicatif)
  age: { min: 16, max: 99 },
} as const;

/** Nettoyage basique : trim + suppression caractères de contrôle */
function sanitizeText(value: string): string {
  return value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
}

/** Username : lettres, chiffres, underscore, tiret uniquement */
function isValidUsername(value: string): boolean {
  return /^[a-zA-Z0-9_-]+$/.test(value);
}

/** Prénom / Nom : lettres (accents OK), espaces, tirets, apostrophes */
function isValidName(value: string): boolean {
  return /^[a-zA-ZÀ-ÿ\s'-]+$/.test(value);
}

/** Email simple mais strict */
function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) && !value.includes("..");
}

/** Téléphone Cameroun : 9 chiffres, commence par 6 */
function isValidCameroonPhone(digits: string): boolean {
  return /^6\d{8}$/.test(digits);
}

/** Mot de passe : min 8, au moins 1 lettre et 1 chiffre */
function isValidPassword(value: string): boolean {
  return (
    value.length >= LIMITS.password.min &&
    value.length <= LIMITS.password.max &&
    /[a-zA-Z]/.test(value) &&
    /\d/.test(value)
  );
}

/** Ne garde que les chiffres */
function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

type FieldErrors = Partial<
  Record<
    | "username"
    | "firstName"
    | "lastName"
    | "age"
    | "phone"
    | "email"
    | "password"
    | "neighborhood"
    | "charte",
    string
  >
>;

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>("Yaoundé");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(""); // stocké en chiffres uniquement
  const [neighborhood, setNeighborhood] = useState("Melen");
  const [age, setAge] = useState("");
  const [charteAccepted, setCharteAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const neighborhoods = useMemo(
    () => neighborhoodsByCity[selectedCity] || neighborhoodsByCity.default,
    [selectedCity]
  );

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};

    const u = sanitizeText(username);
    if (u.length < LIMITS.username.min || u.length > LIMITS.username.max) {
      errors.username = `Entre ${LIMITS.username.min} et ${LIMITS.username.max} caractères.`;
    } else if (!isValidUsername(u)) {
      errors.username = "Lettres, chiffres, _ et - uniquement.";
    }

    const fn = sanitizeText(firstName);
    if (fn.length < LIMITS.firstName.min || fn.length > LIMITS.firstName.max) {
      errors.firstName = `Entre ${LIMITS.firstName.min} et ${LIMITS.firstName.max} caractères.`;
    } else if (!isValidName(fn)) {
      errors.firstName = "Caractères non autorisés.";
    }

    const ln = sanitizeText(lastName);
    if (ln.length < LIMITS.lastName.min || ln.length > LIMITS.lastName.max) {
      errors.lastName = `Entre ${LIMITS.lastName.min} et ${LIMITS.lastName.max} caractères.`;
    } else if (!isValidName(ln)) {
      errors.lastName = "Caractères non autorisés.";
    }

    const ageNum = parseInt(age, 10);
    if (!age || Number.isNaN(ageNum)) {
      errors.age = "Âge obligatoire.";
    } else if (ageNum < LIMITS.age.min || ageNum > LIMITS.age.max) {
      errors.age = `Entre ${LIMITS.age.min} et ${LIMITS.age.max} ans.`;
    }

    if (!isValidCameroonPhone(phone)) {
      errors.phone = "Numéro camerounais invalide (9 chiffres, commence par 6).";
    }

    const em = sanitizeText(email).toLowerCase();
    if (!em || em.length > LIMITS.email.max) {
      errors.email = "E-mail obligatoire (max 100 caractères).";
    } else if (!isValidEmail(em)) {
      errors.email = "Format d'e-mail invalide.";
    }

    if (!neighborhood) {
      errors.neighborhood = "Sélectionnez un quartier.";
    }

    if (!isValidPassword(password)) {
      errors.password =
        "Min. 8 caractères, au moins une lettre et un chiffre (max 64).";
    }

    if (!charteAccepted) {
      errors.charte = "Vous devez accepter la charte.";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      await authService.register({
        email: sanitizeText(email).toLowerCase(),
        password, // ne pas "sanitizer" le mot de passe (caractères spéciaux utiles)
        username: sanitizeText(username),
        firstName: sanitizeText(firstName),
        lastName: sanitizeText(lastName),
        neighborhood: `${selectedCity} - ${neighborhood}`,
        phone: `+237${phone}`, // format international côté API
        age: parseInt(age, 10),
      });
      router.push("/explorer");
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Email ou mot de passe incorrect.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1A8766]/30 focus:border-[#0A4533]";
  const inputClassNoIcon =
    "w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1A8766]/30 focus:border-[#0A4533]";
  const errorText = "text-[11px] text-red-600 mt-0.5 font-medium";

  return (
    <div className="h-[310px] overflow-y-auto pr-1 custom-scrollbar">
      <form className="space-y-3" onSubmit={handleSubmit} noValidate>
        {error && (
          <div
            role="alert"
            className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold"
          >
            {error}
          </div>
        )}

        {/* Nom d'utilisateur */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Nom d&apos;utilisateur
          </label>
          <div className="relative">
            <img
              src="/icons/user-solid.svg"
              alt=""
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-50 pointer-events-none"
            />
            <input
              type="text"
              required
              autoComplete="username"
              maxLength={LIMITS.username.max}
              value={username}
              onChange={(e) => {
                // Filtre immédiat : caractères autorisés seulement
                const v = e.target.value.replace(/[^a-zA-Z0-9_-]/g, "");
                setUsername(v.slice(0, LIMITS.username.max));
              }}
              placeholder="Ex: Marie_K"
              className={inputClass}
            />
          </div>
          {fieldErrors.username && (
            <p className={errorText}>{fieldErrors.username}</p>
          )}
        </div>

        {/* Prénom & Nom */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Prénom (visible)
            </label>
            <input
              type="text"
              required
              autoComplete="given-name"
              maxLength={LIMITS.firstName.max}
              value={firstName}
              onChange={(e) =>
                setFirstName(
                  e.target.value
                    .replace(/[^a-zA-ZÀ-ÿ\s'-]/g, "")
                    .slice(0, LIMITS.firstName.max)
                )
              }
              placeholder="Ex: Marie"
              className={inputClassNoIcon}
            />
            {fieldErrors.firstName && (
              <p className={errorText}>{fieldErrors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Nom (masqué)
            </label>
            <input
              type="text"
              required
              autoComplete="family-name"
              maxLength={LIMITS.lastName.max}
              value={lastName}
              onChange={(e) =>
                setLastName(
                  e.target.value
                    .replace(/[^a-zA-ZÀ-ÿ\s'-]/g, "")
                    .slice(0, LIMITS.lastName.max)
                )
              }
              placeholder="Ex: Mvesso"
              className={inputClassNoIcon}
            />
            {fieldErrors.lastName && (
              <p className={errorText}>{fieldErrors.lastName}</p>
            )}
          </div>
        </div>

        {/* Âge & Téléphone côte à côte pour gagner en hauteur */}
        <div className="grid grid-cols-3 gap-2.5">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Âge
            </label>
            <input
              type="number"
              required
              min={LIMITS.age.min}
              max={LIMITS.age.max}
              inputMode="numeric"
              value={age}
              onChange={(e) => {
                const digits = onlyDigits(e.target.value).slice(0, 2);
                setAge(digits);
              }}
              placeholder="24"
              className={inputClassNoIcon}
            />
            {fieldErrors.age && <p className={errorText}>{fieldErrors.age}</p>}
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Téléphone
            </label>
            <div className="relative">
              <img
                src="/icons/phone-solid.svg"
                alt=""
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-50 pointer-events-none"
              />
              <span className="absolute left-8 top-1/2 -translate-y-1/2 text-[11px] text-slate-500 font-medium select-none">
                +237
              </span>
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={9}
                value={phone}
                onChange={(e) => {
                  const digits = onlyDigits(e.target.value).slice(0, 9);
                  setPhone(digits);
                }}
                placeholder="6XXXXXXXX"
                className="w-full pl-[4rem] pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1A8766]/30 focus:border-[#0A4533]"
              />
            </div>
            {fieldErrors.phone && (
              <p className={errorText}>{fieldErrors.phone}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Adresse e-mail
          </label>
          <div className="relative">
            <img
              src="/icons/envelope-solid.svg"
              alt=""
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-50 pointer-events-none"
            />
            <input
              type="email"
              required
              autoComplete="email"
              maxLength={LIMITS.email.max}
              value={email}
              onChange={(e) =>
                setEmail(e.target.value.slice(0, LIMITS.email.max))
              }
              placeholder="votre.email@domaine.com"
              className={inputClass}
            />
          </div>
          {fieldErrors.email && (
            <p className={errorText}>{fieldErrors.email}</p>
          )}
        </div>

        {/* Ville & Quartier côte à côte */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Ville
            </label>
            <div className="relative">
              <img
                src="/icons/map-marker-alt-solid.svg"
                alt=""
                className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-50 pointer-events-none"
              />
              <select
                required
                value={selectedCity}
                onChange={(e) => {
                  const city = e.target.value;
                  setSelectedCity(city);
                  const list =
                    neighborhoodsByCity[city] || neighborhoodsByCity.default;
                  setNeighborhood(list[0] ?? "");
                }}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1A8766]/30 focus:border-[#0A4533] appearance-none"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Quartier
            </label>
            <select
              required
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className={inputClassNoIcon}
            >
              <option value="">Sélectionner</option>
              {neighborhoods.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            {fieldErrors.neighborhood && (
              <p className={errorText}>{fieldErrors.neighborhood}</p>
            )}
          </div>
        </div>

        {/* Mot de passe */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Créer un mot de passe
          </label>
          <div className="relative">
            <img
              src="/icons/key-solid.svg"
              alt=""
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-50 pointer-events-none"
            />
            <input
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              minLength={LIMITS.password.min}
              maxLength={LIMITS.password.max}
              value={password}
              onChange={(e) =>
                setPassword(e.target.value.slice(0, LIMITS.password.max))
              }
              placeholder="Min. 8 caractères, lettre + chiffre"
              className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1A8766]/30 focus:border-[#0A4533]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              aria-label={
                showPassword
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }
            >
              <img
                src={
                  showPassword
                    ? "/icons/eye-slash-solid.svg"
                    : "/icons/eye-solid.svg"
                }
                alt=""
                className="w-3.5 h-3.5 opacity-50"
              />
            </button>
          </div>
          {fieldErrors.password && (
            <p className={errorText}>{fieldErrors.password}</p>
          )}
        </div>

        {/* Charte */}
        <label className="flex items-start gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={charteAccepted}
            onChange={(e) => setCharteAccepted(e.target.checked)}
            className="w-3.5 h-3.5 mt-0.5 rounded accent-[#0A4533]"
          />
          <span className="text-xs text-slate-600">
            J&apos;accepte la{" "}
            <Link
              href="#"
              className="text-[#0A4533] font-semibold hover:underline"
            >
              charte éthique citoyenne
            </Link>{" "}
            et de réemploi solidaire.
          </span>
        </label>
        {fieldErrors.charte && (
          <p className={errorText}>{fieldErrors.charte}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-[#0A4533] hover:bg-[#062B20] text-white text-sm font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-70"
        >
          <span>
            {loading
              ? "Création du compte..."
              : "Créer mon compte & Accéder à l'application"}
          </span>
          <img
            src="/icons/check-solid.svg"
            alt=""
            className="w-3.5 h-3.5 filter invert"
          />
        </button>
      </form>
    </div>
  );
}