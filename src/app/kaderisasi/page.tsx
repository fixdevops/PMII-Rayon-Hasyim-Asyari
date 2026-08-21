import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import MobileHeader from "@/components/MobileHeader";
import Footer from "@/components/Footer";
import AspirasiButton from "@/components/AspirasiButton";
import { supabase } from "@/lib/supabase";
import KaderisasiClient from "./KaderisasiClient";

export const metadata: Metadata = {
  title: "Belajar | PMII Rayon Hasyim Asy'ari",
  description: "Kumpulan materi dan roadmap belajar untuk kader PMII Rayon Hasyim Asy'ari FST UNUGIRI.",
};

async function getKursus() {
  const { data } = await supabase
    .from("kursus")
    .select("*")
    .eq("aktif", true)
    .order("no", { ascending: true });
  return data ?? [];
}

export default async function KaderisasiPage() {
  const kursus = await getKursus();

  return (
    <div
      className="text-[#0f0f0f] overflow-x-hidden min-h-screen flex flex-col"
      style={{ background: "linear-gradient(to bottom, #ddeeff 0%, #eef5ff 30%, #ffffff 60%)" }}
    >
      <Navbar />
      <MobileNav />
      <MobileHeader crumbs={[{ label: "Belajar" }]} />

      <main className="flex-grow max-w-5xl mx-auto w-full px-6 pb-16 pt-6 md:pt-24">
        <KaderisasiClient kursus={kursus} />
      </main>

      <AspirasiButton />
      <Footer />
    </div>
  );
}
