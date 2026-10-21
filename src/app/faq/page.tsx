"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import MobileHeader from "@/components/MobileHeader";
import Footer from "@/components/Footer";
import FadeInUp from "@/components/FadeInUp";
import { motion, AnimatePresence } from "framer-motion";
import AspirasiButton from "@/components/AspirasiButton";

const faqs = [
  { q: "Apa itu PMII Rayon Hasyim Asy'ari?", a: "PMII Rayon Hasyim Asy'ari adalah organisasi eksekutif mahasiswa di Fakultas Sains dan Teknologi (FST) Universitas Nahdlatul Ulama Sunan Giri yang berlandaskan nilai Ahlussunnah wal Jama'ah An-Nahdliyah. Organisasi ini berperan sebagai wadah pengembangan kreativitas, keilmuan, dan kegiatan positif bagi mahasiswa FST." },
  { q: "Bagaimana cara bergabung dengan PMII Rayon Hasyim Asy'ari?", a: "Untuk bergabung, kamu perlu mengikuti MAPABA (Masa Penerimaan Anggota Baru) yang diselenggarakan setiap tahun. Informasi pendaftaran bisa didapatkan melalui media sosial kami atau langsung menghubungi pengurus melalui WhatsApp." },
  { q: "Apa saja program kerja PMII Rayon Hasyim Asy'ari?", a: "Program kerja kami meliputi kaderisasi formal (MAPABA, PKD, PKL), kajian keagamaan rutin, pelatihan sains dan teknologi, aksi sosial, seminar dan workshop, serta berbagai kegiatan kreatif dan inovatif lainnya." },
  { q: "Apa itu MAPABA?", a: "MAPABA adalah singkatan dari Masa Penerimaan Anggota Baru. Ini adalah tahap pertama kaderisasi formal PMII yang bertujuan mengenalkan nilai-nilai dasar pergerakan, ideologi PMII, dan wawasan keorganisasian kepada anggota baru." },
  { q: "Apakah harus mahasiswa FST untuk bergabung?", a: "Ya, PMII Rayon Hasyim Asy'ari khusus untuk mahasiswa Fakultas Sains dan Teknologi (FST) UNUGIRI Bojonegoro. Namun, kami terbuka untuk berkolaborasi dengan mahasiswa dari fakultas lain." },
  { q: "Di mana sekretariat PMII Rayon Hasyim Asy'ari?", a: "Sekretariat kami berada di lingkungan kampus FST Universitas Nahdlatul Ulama Sunan Giri (UNUGIRI) Bojonegoro. Untuk info lebih lanjut, silakan hubungi kami melalui WhatsApp atau media sosial." },
  { q: "Apa manfaat bergabung dengan PMII?", a: "Dengan bergabung PMII, kamu akan mendapatkan pengembangan karakter dan kepemimpinan, jaringan pertemanan yang luas, pelatihan keterampilan organisasi, wawasan keislaman yang mendalam, serta pengalaman berorganisasi yang berharga untuk masa depan." },
  { q: "Bagaimana cara menghubungi pengurus PMII Rayon Hasyim Asy'ari?", a: "Kamu bisa menghubungi kami melalui WhatsApp di nomor yang tertera di website, atau melalui akun Instagram dan media sosial resmi kami. Kami siap menjawab pertanyaan dan menerima aspirasi dari seluruh mahasiswa FST." },
];

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeInUp delay={index * 50}>
      <div className="border-b border-[#e5e5e5]">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-5 text-left gap-4"
        >
          <span className="text-[17px] font-semibold text-[#1a1a1a] leading-snug">{faq.q}</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 6l5 5 5-5" stroke="#1a1a1a" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="text-[15px] text-[#292929] leading-[1.8] pb-5">{faq.a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeInUp>
  );
}

export default function FAQPage() {
  return (
    <div className="bg-white text-[#1a1a1a] overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />
      <MobileNav />
      <MobileHeader crumbs={[{ label: "Informasi", href: "/faq" }, { label: "FAQ" }]} />

      <main className="flex-grow w-full px-6 pb-16 pt-6 md:pt-24">
        <div className="max-w-[680px] mx-auto">

          <div className="border-b border-[#e5e5e5] pb-8 mb-2">
            <h1 className="text-3xl font-bold text-[#1a1a1a] mb-3">FAQ</h1>
            <p className="text-[#6b6b6b] text-[17px]">Kumpulan pertanyaan yang sering diajukan seputar PMII Rayon Hasyim Asy&apos;ari FST.</p>
          </div>

          <div>
            {faqs.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
          </div>

          <div className="mt-12 pt-8 border-t border-[#e5e5e5] text-center">
            <p className="text-[14px] text-[#6b6b6b] mb-2">Tidak menemukan jawaban yang kamu cari?</p>
            <p className="text-[14px] text-[#1a1a1a] font-semibold">
              Gunakan tombol <strong>Aspirasi</strong> di pojok kiri bawah untuk menghubungi kami.
            </p>
          </div>

        </div>
      </main>

      <AspirasiButton />
      <Footer />
    </div>
  );
}
