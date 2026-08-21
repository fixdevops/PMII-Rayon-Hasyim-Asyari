import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import MobileHeader from "@/components/MobileHeader";
import Footer from "@/components/Footer";
import FadeInUp from "@/components/FadeInUp";
import ProfileCardAzam from "@/components/ProfileCardAzam";
import GaleriSlider from "@/components/GaleriSlider";
import AspirasiButton from "@/components/AspirasiButton";

const ndpValues = [
  {
    icon: "mosque",
    tag: "Habluminallah",
    title: "Tauhid",
    desc: "Mengesakan Allah sebagai titik tolak segala keyakinan. Transformasi nilai ketuhanan ke dalam praksis kehidupan kampus dan masyarakat.",
  },
  {
    icon: "diversity_3",
    tag: "Habluminannas",
    title: "Hubungan Sosial",
    desc: "Kesetaraan, keadilan, dan persaudaraan. Membangun tatanan sosial yang inklusif melalui teknologi tepat guna.",
  },
  {
    icon: "public",
    tag: "Habluminal'alam",
    title: "Hubungan Alam",
    desc: "Manusia sebagai khalifah fil ard. Memanfaatkan sains untuk merawat bumi dan menjaga keseimbangan ekologis.",
  },
];

const features = [
  {
    icon: "menu_book",
    title: "Visi & Misi",
    desc: "Gambaran visi organisasi dan misi strategis PMII Rayon dalam menjalankan perannya.",
    href: "/visi-misi",
    soon: false,
  },
  {
    icon: "diversity_3",
    title: "Anggota",
    desc: "Lihat daftar anggota dan pengurus PMII Rayon Hasyim Asy'ari beserta departemennya.",
    href: "/anggota",
    soon: false,
  },
  {
    icon: "route",
    title: "Roadmap Proker",
    desc: "Rangkaian tahapan program kerja PMII Rayon selama satu periode kepengurusan.",
    href: "/roadmap",
    soon: false,
  },
  {
    icon: "help",
    title: "FAQ",
    desc: "Kumpulan pertanyaan yang sering diajukan seputar PMII Rayon Hasyim Asy'ari FST.",
    href: "/faq",
    soon: false,
  },
];

const steps = [
  {
    num: "01",
    title: "Ikuti MAPABA",
    desc: "Masa Penerimaan Anggota Baru — pintu masuk mengenal nilai-nilai dasar pergerakan dan ideologi PMII.",
  },
  {
    num: "02",
    title: "Ikut Kajian & Kegiatan",
    desc: "Bergabung dalam diskusi, pelatihan, dan aksi sosial yang dijalankan setiap pekan.",
  },
  {
    num: "03",
    title: "Tumbuh Bersama",
    desc: "Kembangkan diri melalui kaderisasi lanjutan, riset, dan kolaborasi lintas disiplin.",
  },
];

const prodi = [
  { label: "Teknik Informatika", icon: "computer", href: "https://ti.unugiri.ac.id/" },
  { label: "Sistem Informasi", icon: "storage", href: "https://si.unugiri.ac.id/" },
  { label: "Sistem Komputer", icon: "memory", href: "https://sk.unugiri.ac.id/" },
  { label: "Statistika & Sains Data", icon: "bar_chart", href: "https://statistika.unugiri.ac.id/" },
  { label: "Teknik Mesin", icon: "settings", href: "https://tm.unugiri.ac.id/" },
  { label: "Farmasi", icon: "science", href: "http://farmasi.unugiri.ac.id/" },
];

export default function BerandaPage() {
  return (
    <div className="text-[#0f0f0f] overflow-x-hidden">
      <Navbar />
      <MobileNav />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden md:pt-16" style={{ minHeight: "100svh" }}>

        {/* Gambar karakter — hanya desktop */}
        <div
          className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none overflow-hidden md:w-[38vw] lg:w-[34vw] xl:w-[30vw]"
          style={{ height: "82svh" }}
        >
          <Image
            src="/lutfibirupmii.png"
            alt="Maskot PMII Rayon Hasyim Asy'ari"
            width={900}
            height={1100}
            className="w-full h-auto object-cover object-top"
            priority
          />
        </div>

        {/* ── MOBILE: layout baru sesuai desain ── */}
        <div className="relative z-10 flex flex-col md:hidden min-h-[100svh]">

          {/* Top bar: logo kiri + hamburger kanan */}
          <div className="flex items-center justify-between px-5 pt-5 pb-0">
            <div className="flex items-center gap-1">
              {/* ↓ LOGO GABUNGAN — ubah w-14 h-14 untuk ganti ukuran */}
              <Image src="/logojadisatu.svg" alt="Logo PMII Rayon Hasyim Asy'ari" width={112} height={56} className="object-contain" />
            </div>
            {/* hamburger ada di MobileNav (pojok kanan atas) */}
          </div>

          {/* Konten utama */}
          <div className="flex-1 flex flex-col px-5 pt-4 pb-10">

            <FadeInUp>
              {/* Judul besar */}
              <h1 className="text-[clamp(1.9rem,8vw,2.6rem)] font-black text-[#001e40] leading-[1.1] tracking-tight mb-4">
                SELAMAT DATANG<br />
                DI WEBSITE RESMI PMII<br />
                RAYON HASYIM ASY&apos;ARI
              </h1>

              {/* Paragraf deskripsi */}
              <p className="text-[13.5px] text-[#0f0f0f]/65 font-normal leading-[1.75] mb-8">
                PMII Rayon Hasyim Asy'ari FST UNUGIRI adalah organisasi eksekutif mahasiswa Fakultas Sains dan Teknologi yang berlandaskan Aswaja An-Nahdliyah, berfokus mengembangkan kreativitas, potensi keilmuan, serta mewujudkan kegiatan positif bagi mahasiswa FST.
              </p>
            </FadeInUp>

            {/* Profile card center */}
            <FadeInUp delay={120} className="flex justify-center">
              <ProfileCardAzam />
            </FadeInUp>

          </div>
        </div>

        {/* ── DESKTOP: kiri-kanan dengan gambar ── */}
        <div className="relative z-10 hidden md:flex w-full items-center min-h-[100svh] px-8 lg:px-16 xl:px-20">
          <div className="w-full flex justify-between items-center">

            {/* LEFT: judul font Amanojaku */}
            <FadeInUp>
              <h1
                className="text-[clamp(2.6rem,4.5vw,6.5rem)] leading-[1.0] text-[#0f0f0f] select-none"
                style={{ fontFamily: "'Amanojaku', cursive" }}
              >
                PMII
                <br />
                RAYON
                <br />
                HASYIM
                <br />
                ASY&apos;ARI
              </h1>
            </FadeInUp>

            {/* RIGHT: profile card */}
            <FadeInUp delay={150} className="flex items-center">
              <ProfileCardAzam />
            </FadeInUp>

          </div>
        </div>

      </section>

      {/* ── APA YANG KAMI TAWARKAN ── */}
      <section id="tentang" className="py-20">
        <div className="w-full px-[var(--page-padding)]">
          <div className="mx-auto max-w-[var(--container-width)]">

            {/* Header */}
            <FadeInUp className="text-center mb-12">
              <h2 className="text-[clamp(1.6rem,4vw,2.4rem)] font-bold text-[#0a1628] text-balance">
                Informasi <span className="text-[#0059bb]">PMII</span> Rayon Hasyim Asy&apos;ari
              </h2>
              <p className="text-[14px] text-[#4a5a6e] font-medium mt-3 max-w-sm mx-auto leading-relaxed">
                Beragam informasi dan layanan kemahasiswaan yang dapat membantu kader dalam berorganisasi dan beraktivitas.
              </p>
            </FadeInUp>

            {/* Items — formasi zigzag: item 1&4 atas, item 2&3 turun */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 items-start">
              {features.map((f, i) => (
                <FadeInUp key={f.title} delay={i * 80}>
                  <Link
                    href={f.href}
                    className={`flex flex-col items-center text-center group ${
                      (i === 1 || i === 2) ? "md:mt-16" : ""
                    }`}
                  >
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-md transition-transform duration-200 group-hover:scale-110"
                      style={{ background: "#0059bb" }}
                    >
                      <span className="material-symbols-outlined text-white text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {f.icon}
                      </span>
                    </div>
                    <h3 className="text-[15px] font-bold text-[#0a1628] mb-2">{f.title}</h3>
                    <p className="text-[13px] text-[#4a5a6e] font-medium leading-relaxed max-w-[180px]">{f.desc}</p>
                  </Link>
                </FadeInUp>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── GALERI ── */}
      <GaleriSlider />

      {/* ── ASPIRASI FLOATING ── */}
      <AspirasiButton />

      <Footer />
    </div>
  );
}
