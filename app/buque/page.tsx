import BackLink from "@/components/back-link";
import HydrangeaBouquet from "@/components/hydrangea-bouquet";

const TITLE = "Buquê de flores · Letraria";
const DESCRIPTION = "Um buquê de hortênsia, girassol, rosa, tulipa, lírio e margaridas coloridas que cresce e floresce, desenhado só com caracteres coloridos.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/buque" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/buque" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function FlowerBouquet() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#050505]">
      <BackLink tone="rose" />
      <HydrangeaBouquet />
    </main>
  );
}
