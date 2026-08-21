import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import AspirasiButton from "@/components/AspirasiButton";

export const metadata: Metadata = {
  title: "Visi & Misi | PMII Rayon Hasyim Asy'ari",
  description: "Visi dan misi strategis PMII Rayon Hasyim Asy'ari FST UNUGIRI Bojonegoro.",
};

const misi = [
  "Memperkuat pemahaman dan pengamalan nilai-nilai Ahlussunnah wal Jama'ah An-Nahdliyah di kalangan mahasiswa FST UNUGIRI Bojonegoro.",
  "Menyelenggarakan kaderisasi yang sistematis dan berkesinambungan melalui MAPABA, PKD, dan PKL untuk membentuk kader yang militan dan berintegritas.",
  "Mengembangkan potensi intelektual dan keilmuan mahasiswa FST melalui kajian, pelatihan, dan riset berbasis sains dan teknologi.",
  "Mendorong kreativitas dan inovasi kader dalam bidang teknologi informasi, sains terapan, dan kewirausahaan sosial.",
  "Membangun sinergi dan kolaborasi dengan berbagai elemen kampus, organisasi kemahasiswaan, dan masyarakat dalam mewujudkan kegiatan positif dan progresif.",
  "Menjaga dan merawat tradisi intelektual Islam Nusantara sebagai identitas gerakan mahasiswa yang berkarakter dan berwawasan kebangsaan.",
];

export default function VisiMisiPage() {
  return (
    <div className="bg-white text-[#0f0f0f] overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />
      <MobileNav />

      <main className="flex-grow max-w-5xl mx-auto w-full px-6 pb-16 pt-24">

        {/* Breadcrumb */}
        <nav className="bg-white rounded-xl shadow-[6px_6px_12px_rgba(0,30,64,0.15)] max-w-2xl mx-auto mt-2 mb-10">
          <ol className="flex items-center gap-1 text-[#0f0f0f]/70 font-semibold text-[15px] rounded-xl px-6 py-4 flex-wrap">
            <li><Link href="/" className="hover:text-[#001e40] transition-colors">Beranda</Link></li>
            <li className="text-[#0059bb]">›</li>
            <li className="text-[#0059bb]">Informasi</li>
            <li><span className="text-[#0059bb]/60"> › Visi &amp; Misi</span></li>
          </ol>
        </nav>

        <section className="max-w-3xl mx-auto space-y-14">

          {/* ── VISI ── */}
          <div>
            {/* Label bar kiri */}
            <div className="flex justify-start">
              <div
                className="w-[220px] text-center py-1.5 rounded-r-lg text-white font-bold text-[17px] tracking-wide"
                style={{ background: "linear-gradient(to right, transparent, #0059bb, #fbbf24, transparent)" }}
              >
                Visi
              </div>
            </div>

            <p className="mt-7 text-center text-[#3a4a5e] text-[15px] sm:text-[16px] font-normal leading-[1.9] px-2 sm:px-0 max-w-[600px] mx-auto italic">
              &ldquo;Terwujudnya kader PMII Rayon Hasyim Asy&apos;ari yang bertaqwa, berilmu, dan berakhlak mulia, serta mampu menjadi agen perubahan yang berlandaskan Ahlussunnah wal Jama&apos;ah An-Nahdliyah di lingkungan Fakultas Sains dan Teknologi UNUGIRI Bojonegoro.&rdquo;
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#001e40]/15 to-transparent" />

          {/* ── MISI ── */}
          <div>
            {/* Label bar kanan */}
            <div className="flex justify-end">
              <div
                className="w-[220px] text-center py-1.5 rounded-l-lg text-white font-bold text-[17px] tracking-wide"
                style={{ background: "linear-gradient(to left, transparent, #0059bb, #fbbf24, transparent)" }}
              >
                Misi
              </div>
            </div>

            <ol className="mt-7 list-decimal list-inside text-[#3a4a5e] text-[15px] sm:text-[16px] font-normal leading-[1.9] space-y-4 px-2 sm:px-4 max-w-[720px] mx-auto">
              {misi.map((m, i) => (
                <li key={i} className="pl-1">
                  <span>{m}</span>
                </li>
              ))}
            </ol>
          </div>

        </section>
      </main>

      {/* Tombol Aspirasi floating */}
      <AspirasiButton />

      <Footer />
    </div>
  );
}
