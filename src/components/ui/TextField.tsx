//Nouveau fichier pour faire apparaitre les ecrit de l'onglet rendez vous 

"use client";

import { useId } from "react";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: "text" | "date" | "time" | "email";
}

export default function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: TextFieldProps) {
  const id = useId(); // relie le label au champ (cliquer sur le label active le champ)

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] font-bold uppercase text-slate-500"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{ colorScheme: "light" }}
        className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/30"
      />
    </div>
  );
}