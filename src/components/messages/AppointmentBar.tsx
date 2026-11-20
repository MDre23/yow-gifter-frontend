"use client";

import Icon from "@/components/ui/Icon";
import TextField from "@/components/ui/TextField";

interface AppointmentBarProps {
  isEditing: boolean;
  appointment?: {
    date: string;
    time: string;
    location: string;
    confirmed: boolean;
  };
  editDate: string;
  editTime: string;
  editLocation: string;
  onToggleEdit: () => void;
  onChangeDate: (val: string) => void;
  onChangeTime: (val: string) => void;
  onChangeLocation: (val: string) => void;
  onSaveAppointment: (e: React.FormEvent) => void;
}

export default function AppointmentBar({
  isEditing,
  appointment,
  editDate,
  editTime,
  editLocation,
  onToggleEdit,
  onChangeDate,
  onChangeTime,
  onChangeLocation,
  onSaveAppointment,
}: AppointmentBarProps) {
  return (
    <div className="border-t border-emerald-200 bg-white px-3 sm:px-4 py-2.5 shrink-0">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
          Rendez-vous de remise
        </span>
        <button
          type="button"
          onClick={onToggleEdit}
          className="text-[11px] text-emerald-700 font-semibold hover:underline cursor-pointer"
        >
          {isEditing ? "Fermer" : "Modifier"}
        </button>
      </div>

      {isEditing ? (
        <form
          onSubmit={onSaveAppointment}
          className="mt-2 max-h-56 overflow-y-auto space-y-3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <TextField
              label="Date"
              value={editDate}
              onChange={onChangeDate}
              placeholder="Ex : Mardi 10 Novembre 2026"
            />
            <TextField
              label="Heure"
              value={editTime}
              onChange={onChangeTime}
              placeholder="Ex : 12h30"
            />
            <TextField
              label="Lieu"
              value={editLocation}
              onChange={onChangeLocation}
              placeholder="Ex : Devant la poste de Melen"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
          >
            Enregistrer le rendez-vous
          </button>
          <p className="text-[10px] text-amber-900 bg-amber-50 border border-amber-200/60 rounded-lg px-2.5 py-1.5 leading-relaxed">
            <strong>Conseil de sécurité :</strong> privilégiez un espace public (parvis, arrêt de bus, hall).
          </p>
        </form>
      ) : (
        <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-700">
          <span className="flex items-center gap-1.5">
            <Icon name="calendar-alt-solid" className="w-3.5 h-3.5 opacity-60" />
            <span className="font-medium">{appointment?.date}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="clock-solid" className="w-3.5 h-3.5 opacity-60" />
            <span className="font-medium">{appointment?.time}</span>
          </span>
          <span className="flex items-center gap-1.5 min-w-0">
            <Icon name="map-marker-alt-solid" className="w-3.5 h-3.5 opacity-60" />
            <span className="font-semibold text-emerald-800 truncate">
              {appointment?.location}
            </span>
          </span>
        </div>
      )}
    </div>
  );
}