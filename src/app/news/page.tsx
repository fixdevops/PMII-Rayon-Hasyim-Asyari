import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import MobileHeader from "@/components/MobileHeader";
import Footer from "@/components/Footer";
import AspirasiButton from "@/components/AspirasiButton";
import { supabase } from "@/lib/supabase";
import NewsListClient from "./NewsListClient";

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "News | PMII Rayon Hasyim Asy'ari",
  description: "Berita dan kegiatan terkini PMII Rayon Hasyim Asy'ari FST UNUGIRI Bojonegoro.",
};

interface Activity {
  id: string
  judul: string
  slug?: string | null
  tanggal: string
  deskripsi?: string | null
  foto_url?: string | null
  lokasi?: string | null
}

async function getKegiatan(): Promise<Activity[]> {
  const { data } = await supabase
    .from("kegiatan")
    .select("id, judul, slug, tanggal, deskripsi, foto_url, lokasi")
    .order("tanggal", { ascending: false });
  return data ?? [];
}

const fallbackActivities: Activity[] = [
  {
    id: "1",
    tanggal: "2026-10-15",
    judul: "Bedah Buku: Filsafat Sains Modern",
    deskripsi: "Mendiskusikan kaitan antara perkembangan sains kontemporer dengan nilai-nilai dasar pergerakan.",
    foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUR7ZbaVAIia8Bt114DxvSJW5aDoIdw1riRrHI9lw9LWIjE3LgkBJjiIG-bXhYftRW85YooH_QPbb7GbiIqPeXAduz39wmo-ibyYcflnWkr7HwsE8PdP-09AF3zsXmSIdvC909ErQ19jGJCsAE4jQSnFONEYNfekiybGqR9G6IIaEG6r3QUJECNRvEi_6tqdzMx31M8pog3u_KCGnBDDDT9dXXnfagSeJch7N_v17XBFJBsRk2e_l0",
    lokasi: null,
  },
  {
    id: "2",
    tanggal: "2026-10-22",
    judul: "Workshop Data Analitik Dasar",
    deskripsi: "Pelatihan keterampilan praktis analisis data menggunakan Python untuk kader PMII Rayon FST.",
    foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrH0fW16CNvX_-XnpCfodtx9fnljl95YlPcYuFheATjYjVCPjtSlJsqPGwL0z6jI-Y5zcKvXMlBbA92SPYghG4u1OKK0Vx0VqKA_lyfZLQhqW6U0iV-tt2WLHyuU2QTn5GDSCg-qPe8QDhXJ3abwLThyQfpL4In_Bs_oz2TpMKGcxo5w4HDnPshnD4iMP_gh9QFxnulsNiuLKCCHJ7-AB8zwSmoQT5h3dPdSyRxaSps5dSdVqkdaVl",
    lokasi: null,
  },
  {
    id: "3",
    tanggal: "2026-11-05",
    judul: "Gerakan Bersih Lingkungan Kampus",
    deskripsi: "Implementasi nilai Hablum Minal Alam melalui aksi nyata menjaga kelestarian ekosistem kampus.",
    foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDS1wSpVf88qF1irAzxwac8aivUKijPlvpICAdo7BjS7S76_DJXjUwo2EV_DFNE1OojLClw7pmkhQjz9508_BR2QO5i6G9dlVOPzz6Wy6g8gUgVA6QGHrnFhRLr-v64pie93MyzEtYQrS25uIxrIHwTyt105lBlaCAvha3a6IeBp5_H-5DswpEpBVYBU5CGmmPxB_d7gLWLjmVSPoKIOU_DWtE46AXLY8ifNTqiOF7F6c5ebV-Y5vB-",
    lokasi: null,
  },
];

export default async function NewsPage() {
  const kegiatanList = await getKegiatan();
  const activities = kegiatanList.length > 0 ? kegiatanList : fallbackActivities;

  return (
    <div className="bg-white text-[#1a1a1a] overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />
      <MobileNav />
      <MobileHeader crumbs={[{ label: "News" }]} />

      <main className="flex-grow max-w-[900px] mx-auto w-full px-6 pb-16 pt-6 md:pt-24">
        {/* Header section */}
        <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Berita Terkini</h1>
        <p className="text-[#6b6b6b] text-base mb-8">
          Kegiatan, kajian, pelatihan, dan aksi sosial PMII Rayon Hasyim Asy&apos;ari.
        </p>

        <NewsListClient activities={activities} />
      </main>

      <AspirasiButton />
      <Footer />
    </div>
  );
}
