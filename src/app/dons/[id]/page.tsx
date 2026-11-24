import DonationDetailClient from "./DonationDetailClient";

export default async function DonationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DonationDetailClient id={id} />;
}