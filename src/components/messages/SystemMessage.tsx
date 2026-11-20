export default function SystemMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-center my-3">
      <div className="max-w-md bg-emerald-50 border border-emerald-200 text-emerald-900 text-center text-[11px] py-1.5 px-4 rounded-lg shadow-2xs">
        {text}
      </div>
    </div>
  );
}