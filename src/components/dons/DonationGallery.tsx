"use client";

interface DonationGalleryProps {
  title: string;
  images: string[];
  status: string;
  activeImageIndex: number;
  onSelectImage: (idx: number) => void;
}

export default function DonationGallery({
  title,
  images,
  status,
  activeImageIndex,
  onSelectImage,
}: DonationGalleryProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs relative aspect-4/3">
        <img
          src={images[activeImageIndex] || images[0]}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Badge statut */}
        <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs text-slate-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          {status === "AVAILABLE"
            ? "Disponible"
            : status === "RESERVED"
            ? "En cours de réservation"
            : "Objet donné"}
        </span>
      </div>

      {/* Sélecteur de miniatures (Max 2 photos) */}
      {images.length > 1 && (
        <div className="flex items-center gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectImage(idx)}
              className={`relative w-24 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                activeImageIndex === idx
                  ? "border-emerald-600 ring-2 ring-emerald-500/30"
                  : "border-slate-200 opacity-70 hover:opacity-100"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
              <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1 rounded font-bold">
                Photo {idx + 1}
              </span>
            </button>
          ))}
          <div className="text-xs text-slate-400 pl-2">
            <span className="font-semibold text-slate-600">{images.length}/2 photos</span>
          </div>
        </div>
      )}
    </div>
  );
}
