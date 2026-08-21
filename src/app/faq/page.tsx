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
      <div className={`rounded-2xl overflow-hidden transition-all duration-200 bg-white/70 backdrop-blur-sm ${open ? "border border-[#0059bb]/30 shadow-sm" : "border border-[#d0e4ff]"}`}>
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-4 text-left">
          <span className={`text-[15px] font-semibold leading-snug pr-4 ${open ? "text-[#001e40]" : "text-[#0f0f0f]"}`}>{faq.q}</span>
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}
            className="flex-shrink-0 w-6 h-6 rounded-full bg-[#001e40]/[0.06] flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke="#001e40" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }}>
              <div className="px-6 pb-5">
                <div className="h-px bg-[#d0e4ff] mb-4" />
                <p className="text-[14px] text-[#4a5a6e] leading-relaxed">{faq.a}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeInUp>
  );
}

export default function FAQPage() {
  return (
    <div className="text-[#0f0f0f] overflow-x-hidden min-h-screen flex flex-col"
      style={{ background: "linear-gradient(to bottom, #ddeeff 0%, #eef5ff 30%, #ffffff 60%)" }}>
      <Navbar />
      <MobileNav />
      <MobileHeader crumbs={[{ label: "Informasi", href: "/faq" }, { label: "FAQ" }]} />

      <main className="flex-grow max-w-5xl mx-auto w-full px-6 pb-16 pt-6 md:pt-24">

        <section className="max-w-3xl mx-auto space-y-14">

          <div>
            <div className="flex justify-start">
              <div className="w-[220px] text-center py-1.5 rounded-r-lg text-white font-bold text-[17px] tracking-wide"
                style={{ background: "linear-gradient(to right, transparent, #0059bb, #fbbf24, transparent)" }}>
                FAQ
              </div>
            </div>
            <p className="mt-5 text-center text-[#3a4a5e] text-[15px] leading-relaxed max-w-lg mx-auto">
              Kumpulan pertanyaan yang sering diajukan seputar PMII Rayon Hasyim Asy&apos;ari FST.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#001e40]/15 to-transparent" />

          <div className="text-center">
            <p className="text-[14px] text-[#4a5a6e] mb-4">Tidak menemukan jawaban yang kamu cari?</p>
            <p className="text-[13px] text-[#0059bb] font-semibold">
              Gunakan tombol <strong>Aspirasi</strong> di pojok kiri bawah untuk menghubungi kami.
            </p>
          </div>

        </section>
      </main>

      <AspirasiButton />
      <Footer />
    </div>
  );
}
