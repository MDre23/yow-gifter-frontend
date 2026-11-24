import { Suspense } from "react";
import DonationDetailClient from "./DonationDetailClient";

// 🛠️ Composant interne qui lit les params (c'est lui qui est "dynamique")
async function DonationDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DonationDetailClient id={id} />;
}

export default function DonationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    // 🛠️ On enveloppe le composant dynamique dans un Suspense
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <div className="text-center py-32 text-slate-500">Chargement du don...</div>
      </div>
    }>
      <DonationDetailContent params={params} />
    </Suspense>
  );
}