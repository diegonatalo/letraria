import type { Metadata } from "next";
import { GalleryScreen } from "@/components/gallery-screen";

export const metadata: Metadata = { title: "Galeria · Letraria", alternates: { canonical: "/app" } };

export default function Page() {
  return <GalleryScreen />;
}
