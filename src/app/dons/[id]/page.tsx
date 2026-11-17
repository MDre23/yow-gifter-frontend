import DonationDetailClient from "./DonationDetailClient";
import { INITIAL_DONATIONS } from "@/lib/data";

export function generateStaticParams() {
  return INITIAL_DONATIONS.map((d) => ({
    id: d.id,
  }));
}

export default async function DonationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DonationDetailClient id={id} />;
}
