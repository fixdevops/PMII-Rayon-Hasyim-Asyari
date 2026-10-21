import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import MobileHeader from "@/components/MobileHeader";
import Footer from "@/components/Footer";
import AspirasiButton from "@/components/AspirasiButton";
import { supabase } from "@/lib/supabase";
import KaderisasiClient from "./KaderisasiClient";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Belajar | PMII Rayon Hasyim Asy'ari",
  description: "Kumpulan materi dan roadmap belajar untuk kader PMII Rayon Hasyim Asy'ari FST UNUGIRI.",
};

async function getKursus() {
  const { data } = await supabase
    .from("kursus")
    .select("*")
    .order("no", { ascending: true });
  return data ?? [];
}

async function getKegiatan3() {
  const { data } = await supabase
    .from('kegiatan')
    .select('id, judul, slug, tanggal, foto_url, deskripsi')
    .order('tanggal', { ascending: false })
    .limit(3);
  return data ?? [];
}

export default async function KaderisasiPage() {
  const [kursus, kegiatan] = await Promise.all([getKursus(), getKegiatan3()]);

  return (
    <div className="bg-white text-[#1a1a1a] overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />
      <MobileNav />
      <MobileHeader crumbs={[{ label: "Belajar" }]} />

      <main className="flex-grow w-full">
        <KaderisasiClient kursus={kursus} kegiatan={kegiatan} />
      </main>

      <AspirasiButton />
      <Footer />
    </div>
  );
}
