import { notFound } from "next/navigation";
import { Metadata } from "next";
import { invitations } from "@/data/invitations";
import InvitationClient from "@/components/InvitationClient";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ to?: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = invitations[slug];

  if (!data) {
    return {
      title: "Undangan Tidak Ditemukan",
    };
  }

  const groomShort = data.groom.name.split(",")[0];
  const brideShort = data.bride.name.split(",")[0];

  return {
    title:
      data.meta?.title ||
      `Undangan Pernikahan ${groomShort} & ${brideShort}`,
    description:
      data.meta?.description ||
      `Dengan penuh syukur dan kebahagiaan, kami mengundang Anda untuk menyaksikan pernikahan ${groomShort} & ${brideShort}.`,
    openGraph: {
      title: `Undangan Pernikahan ${groomShort} & ${brideShort}`,
      description: `${data.event.akad.date} — ${data.event.akad.venue}`,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(invitations).map((slug) => ({ slug }));
}

export default async function InvitationPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { to } = await searchParams;

  const data = invitations[slug];

  if (!data) {
    notFound();
  }

  // Decode guest name from URL param
  const guestName =
    to && to.trim() !== ""
      ? decodeURIComponent(to.trim())
      : "Tamu Undangan";

  return <InvitationClient data={data} guestName={guestName} />;
}
