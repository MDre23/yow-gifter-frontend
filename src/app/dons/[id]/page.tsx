import DonationDetailClient from "./DonationDetailClient";
export const dynamic = 'force-dynamic';
export default async function DonationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DonationDetailClient id={id} />;
}