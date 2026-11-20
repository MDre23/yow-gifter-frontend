interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: "w-8 h-8 text-[10px]",
  md: "w-10 h-10 text-xs",
  lg: "w-12 h-12 text-sm",
};

export default function Avatar({ name, size = "md" }: AvatarProps) {
  return (
    <div
      className={`${SIZES[size]} shrink-0 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center`}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}