import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import MobileHeader from "@/components/MobileHeader";
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
    <div className="bg-white text-[#1a1a1a] overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />
      <MobileNav />
      <MobileHeader crumbs={[{ label: "Informasi", href: "/visi-misi" }, { label: "Visi & Misi" }]} />

      <main className="flex-grow w-full px-6 pb-16 pt-6 md:pt-24">
        <article className="max-w-[680px] mx-auto">

          <div className="border-b border-[#e5e5e5] pb-8 mb-10">
            <h1 className="text-3xl font-bold text-[#1a1a1a] mb-3">Visi &amp; Misi</h1>
            <p className="text-[#6b6b6b] text-[17px]">Landasan arah gerakan PMII Rayon Hasyim Asy&apos;ari FST UNUGIRI Bojonegoro.</p>
          </div>

          <h2 className="text-xl font-bold text-[#1a1a1a] mb-5">Visi</h2>
          <blockquote className="border-l-4 border-[#1a1a1a] pl-5 my-6">
            <p className="italic text-[#292929] text-[17px] leading-[1.8]">
              &ldquo;Terwujudnya kader PMII Rayon Hasyim Asy&apos;ari yang bertaqwa, berilmu, dan berakhlak mulia, serta mampu menjadi agen perubahan yang berlandaskan Ahlussunnah wal Jama&apos;ah An-Nahdliyah di lingkungan Fakultas Sains dan Teknologi UNUGIRI Bojonegoro.&rdquo;
            </p>
          </blockquote>

          <div className="flex items-center justify-center gap-4 my-12 text-[#1a1a1a]">
            <span className="text-2xl leading-none">&bull;</span>
            <span className="text-2xl leading-none">&bull;</span>
            <span className="text-2xl leading-none">&bull;</span>
          </div>

          <h2 className="text-xl font-bold text-[#1a1a1a] mb-5">Misi</h2>
          <ol className="list-decimal list-outside ml-6 space-y-4 text-[#292929] text-[17px] leading-[1.8]">
            {misi.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ol>

        </article>
      </main>

      <AspirasiButton />
      <Footer />
    </div>
  );
}
