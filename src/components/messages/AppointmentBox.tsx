// "use client";

// //Importation de Icon et de TextField
// import Icon from "@/components/ui/Icon";
// import TextField from "@/components/ui/TextField";


// interface AppointmentBoxProps {
//   isGiven: boolean;
//   isEditing: boolean;
//   appointment?: {
//     date: string;
//     time: string;
//     location: string;
//     confirmed: boolean;
//   };
//   editDate: string;
//   editTime: string;
//   editLocation: string;
//   onToggleEdit: () => void;
//   onChangeDate: (val: string) => void;
//   onChangeTime: (val: string) => void;
//   onChangeLocation: (val: string) => void;
//   onSaveAppointment: (e: React.FormEvent) => void;
// }

// export default function AppointmentBox({
//   isGiven,
//   isEditing,
//   appointment,
//   editDate,
//   editTime,
//   editLocation,
//   onToggleEdit,
//   onChangeDate,
//   onChangeTime,
//   onChangeLocation,
//   onSaveAppointment,
// }: AppointmentBoxProps) {
//   return (
//     <div className="p-4 flex-1 flex flex-col justify-between">
//       <div>
//         <div className="flex items-center justify-between mb-2">
//           <span className="text-xs font-bold text-slate-800">
//             Rendez-vous de remise
//           </span>
//           {!isGiven && (
//             <button
//               type="button"
//               onClick={onToggleEdit}
//               className="text-[11px] text-emerald-700 font-semibold hover:underline cursor-pointer"
//             >
//               {isEditing ? "Fermer" : "Modifier"}
//             </button>
//           )}
//         </div>

//         {isEditing ? (
//           <form
//             onSubmit={onSaveAppointment}
//             className="bg-white p-3 rounded-xl border border-emerald-200 space-y-2.5 text-xs"
//           >
//             <div>
//               <label className="block text-[10px] font-bold uppercase text-slate-500">
//                 Date
//               </label>
//               <input
//                 type="text"
//                 value={editDate}
//                 onChange={(e) => onChangeDate(e.target.value)}
//                 className="w-full px-2 py-1.5 border border-slate-200 rounded text-xs mt-0.5"
//               />
//             </div>
//             <div>
//               <label className="block text-[10px] font-bold uppercase text-slate-500">
//                 Heure
//               </label>
//               <input
//                 type="text"
//                 value={editTime}
//                 onChange={(e) => onChangeTime(e.target.value)}
//                 className="w-full px-2 py-1.5 border border-slate-200 rounded text-xs mt-0.5"
//               />
//             </div>
//             <div>
//               <label className="block text-[10px] font-bold uppercase text-slate-500">
//                 Lieu de rendez-vous
//               </label>
//               <input
//                 type="text"
//                 value={editLocation}
//                 onChange={(e) => onChangeLocation(e.target.value)}
//                 className="w-full px-2 py-1.5 border border-slate-200 rounded text-xs mt-0.5"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full py-1.5 bg-emerald-600 text-white font-bold rounded text-xs cursor-pointer"
//             >
//               Enregistrer le rendez-vous
//             </button>
//           </form>
//         ) : (
//           <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 space-y-2 text-xs">
//             <div className="flex items-center gap-2 text-slate-700">
//               <img src="/icons/calendar-alt-solid.svg" alt="" className="w-3.5 h-3.5 opacity-60" />
//               <span className="font-medium">{appointment?.date}</span>
//             </div>
//             <div className="flex items-center gap-2 text-slate-700">
//               <img src="/icons/clock-solid.svg" alt="" className="w-3.5 h-3.5 opacity-60" />
//               <span className="font-medium">{appointment?.time}</span>
//             </div>
//             <div className="flex items-start gap-2 text-slate-700">
//               <img src="/icons/map-marker-alt-solid.svg" alt="" className="w-3.5 h-3.5 opacity-60 mt-0.5" />
//               <span className="font-semibold text-emerald-800 leading-tight">
//                 {appointment?.location}
//               </span>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="p-3 bg-amber-50 border border-amber-200/60 rounded-xl text-[11px] text-amber-900 mt-4 leading-relaxed">
//         <strong>Conseil de sécurité :</strong> Privilégiez un espace public pour la rencontre (ex: parvis, arrêt de bus, hall).
//       </div>
//     </div>
//   );
// }

"use client";

import Icon from "@/components/ui/Icon";
import TextField from "@/components/ui/TextField";

interface AppointmentBoxProps {
  isGiven: boolean;
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

export default function AppointmentBox({
  isGiven,
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
}: AppointmentBoxProps) {
  return (
    <div className="p-4 flex-1 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-800">
            Rendez-vous de remise
          </span>
          {!isGiven && (
            <button
              type="button"
              onClick={onToggleEdit}
              className="text-[11px] text-emerald-700 font-semibold hover:underline cursor-pointer"
            >
              {isEditing ? "Fermer" : "Modifier"}
            </button>
          )}
        </div>

        {isEditing ? (
          <form
            onSubmit={onSaveAppointment}
            className="bg-white p-4 rounded-xl border border-emerald-200 space-y-3"
          >
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
              label="Lieu de rendez-vous"
              value={editLocation}
              onChange={onChangeLocation}
              placeholder="Ex : Devant la poste de Melen"
            />
            <button
              type="submit"
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
            >
              Enregistrer le rendez-vous
            </button>
          </form>
        ) : (
          <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Icon name="calendar-alt-solid" className="w-3.5 h-3.5 opacity-60" />
              <span className="font-medium">{appointment?.date}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Icon name="clock-solid" className="w-3.5 h-3.5 opacity-60" />
              <span className="font-medium">{appointment?.time}</span>
            </div>
            <div className="flex items-start gap-2 text-slate-700">
              <Icon name="map-marker-alt-solid" className="w-3.5 h-3.5 opacity-60 mt-0.5" />
              <span className="font-semibold text-emerald-800 leading-tight">
                {appointment?.location}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 bg-amber-50 border border-amber-200/60 rounded-xl text-[11px] text-amber-900 mt-4 leading-relaxed">
        <strong>Conseil de sécurité :</strong> Privilégiez un espace public pour la rencontre (ex: parvis, arrêt de bus, hall).
      </div>
    </div>
  );
}
