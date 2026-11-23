import Icon from "@/components/ui/Icon";

interface MessageInputProps {
  value: string;
  disabled?: boolean;
  placeholder?: string;
  onChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function MessageInput({
  value,
  disabled = false,
  placeholder = "Écrivez un message",
  onChange,
  onSubmit,
}: MessageInputProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="px-3 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center gap-2 shrink-0"
    >
      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-full text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        aria-label="Envoyer"
        className="w-10 h-10 shrink-0 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 flex items-center justify-center transition-colors cursor-pointer"
      >
        <Icon name="send-solid" className="w-4 h-4 invert" />
      </button>
    </form>
  );
}