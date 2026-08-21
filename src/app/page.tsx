import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import FadeInUp from "@/components/FadeInUp";
import ProfileCardAzam from "@/components/ProfileCardAzam";

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
    icon: "school",
    title: "Kaderisasi Terstruktur",
    desc: "MAPABA, PKD, hingga PKL — alur pembentukan kader yang sistematis dan berkesinambungan.",
  },
  {
    icon: "menu_book",
    title: "Kajian Ke-Islaman",
    desc: "Kajian rutin mingguan mendalami teks klasik, sejarah pergerakan, dan implementasi NDP.",
  },
  {
    icon: "terminal",
    title: "Pengembangan Sains & Teknologi",
    desc: "Wadah riset, pemrograman, dan inovasi berbasis disiplin Fakultas Sains dan Teknologi.",
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

export default function BerandaPage() {
  return (
    <div className="bg-white text-[#0f0f0f] overflow-x-hidden">
      <Navbar />
      <MobileNav />

      {/* ── HERO ── */}
      <section className="relative bg-white overflow-hidden md:pt-16" style={{ minHeight: "100svh" }}>

        {/* Gambar karakter — hanya desktop */}
        <div
          className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none overflow-hidden md:w-[55vw] lg:w-[48vw] xl:w-[44vw]"
          style={{ height: "92svh" }}
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
        <div className="relative z-10 flex flex-col md:hidden min-h-[100svh] bg-white">

          {/* Top bar: logo kiri + hamburger kanan */}
          <div className="flex items-center justify-between px-5 pt-5 pb-2">
            <div className="flex items-center gap-2.5">
              {/* ↓ LOGO PMII — ubah w-9 h-9 untuk ganti ukuran (w-8=32px, w-9=36px, w-10=40px, w-12=48px) */}
              <Image src="/logoi pmii.png" alt="Logo PMII" width={36} height={36} className="object-contain w-9 h-9" />
              {/* ↓ LOGO KOMISARIAT — ubah w-9 h-9 untuk ganti ukuran */}
              <Image src="/logokomis.png" alt="Logo Komisariat" width={36} height={36} className="object-contain w-9 h-9" />
              {/* ↓ LOGO RAYON — ubah w-9 h-9 untuk ganti ukuran */}
              <Image src="/logorayon.png" alt="Logo Rayon" width={36} height={36} className="object-contain w-9 h-9" />
              {/* ↑ gap-2.5 di atas = jarak antar logo, ubah ke gap-2, gap-3, gap-4 dst */}
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
                PMII Rayon Hasyim Asy&apos;ari adalah organisasi eksekutif mahasiswa
                di Fakultas Sains dan Teknologi (FST) Universitas Nahdlatul Ulama
                Sunan Giri yang berlandaskan nilai Ahlussunnah wal Jama&apos;ah
                An-Nahdliyah. Organisasi ini berperan aktif sebagai wadah untuk
                mengembangkan kreativitas, mengasah potensi keilmuan dan teknologi,
                serta mewujudkan berbagai kegiatan positif dan progresif bagi seluruh
                mahasiswa FST.
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

      {/* ── 3 FITUR UTAMA ── */}
      <section id="tentang" className="py-24 bg-[#f4f8ff]">
        <div className="w-full px-[var(--page-padding)]">
          <div className="mx-auto max-w-[var(--container-width)]">
            <FadeInUp className="text-center mb-14">
              <p className="text-[13px] font-bold text-[#0059bb] uppercase tracking-widest mb-3">
                Apa yang kami tawarkan
              </p>
              <h2 className="text-[clamp(1.8rem,4vw,2.75rem)] font-bold tracking-tight text-[#0a1628] text-balance">
                Ekosistem tumbuh yang lengkap.
              </h2>
            </FadeInUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {features.map((f, i) => (
                <FadeInUp key={f.title} delay={i * 80}>
                  <div className="group p-7 rounded-2xl bg-white border border-[#d0e4ff] hover:border-[#0059bb]/40 hover:shadow-md transition-all duration-200">
                    <div className="w-11 h-11 rounded-xl bg-[#001e40] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200">
                      <span className="material-symbols-outlined text-white text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {f.icon}
                      </span>
                    </div>
                    <h3 className="text-[17px] font-bold mb-2 tracking-tight text-[#0a1628]">{f.title}</h3>
                    <p className="text-[14px] text-[#4a5a6e] font-medium leading-relaxed">{f.desc}</p>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NILAI DASAR PERGERAKAN ── */}
      <section className="py-24 bg-white">
        <div className="w-full px-[var(--page-padding)]">
          <div className="mx-auto max-w-[var(--container-width)]">
            <FadeInUp className="mb-14">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <p className="text-[13px] font-bold text-[#0059bb] uppercase tracking-widest mb-3">
                    Landasan Filosofis
                  </p>
                  <h2 className="text-[clamp(1.8rem,4vw,2.75rem)] font-bold tracking-tight text-[#0a1628] text-balance max-w-md">
                    Nilai Dasar Pergerakan.
                  </h2>
                </div>
                <p className="text-[15px] text-[#4a5a6e] font-medium max-w-sm leading-relaxed">
                  Fondasi filosofis yang membimbing setiap kader PMII dalam berfikir dan bertindak.
                </p>
              </div>
            </FadeInUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {ndpValues.map((v, i) => (
                <FadeInUp key={v.title} delay={i * 100}>
                  <div className="relative p-8 rounded-2xl bg-[#f4f8ff] border border-[#d0e4ff] hover:bg-white hover:border-[#0059bb]/40 hover:shadow-md transition-all duration-200 h-full">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#001e40] text-white text-[11px] font-bold tracking-widest uppercase mb-5">
                      {v.tag}
                    </span>
                    <h3 className="text-[22px] font-bold tracking-tight mb-3 text-[#0a1628]">{v.title}</h3>
                    <p className="text-[14px] text-[#4a5a6e] font-medium leading-relaxed">{v.desc}</p>
                    <span className="absolute bottom-5 right-6 text-[72px] font-black text-[#001e40]/[0.04] leading-none select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 LANGKAH BERGABUNG ── */}
      <section className="py-24 bg-[#f4f8ff]">
        <div className="w-full px-[var(--page-padding)]">
          <div className="mx-auto max-w-[var(--container-width)]">
            <FadeInUp className="text-center mb-16">
              <p className="text-[13px] font-bold text-[#0059bb] uppercase tracking-widest mb-3">
                Cara bergabung
              </p>
              <h2 className="text-[clamp(1.8rem,4vw,2.75rem)] font-bold tracking-tight text-[#0a1628] text-balance">
                Mulai perjalananmu.
              </h2>
            </FadeInUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((s, i) => (
                <FadeInUp key={s.num} delay={i * 100}>
                  <div className="relative p-7 rounded-2xl bg-white border border-[#d0e4ff] hover:border-[#0059bb]/40 hover:shadow-md transition-all duration-200">
                    {/* Step number circle */}
                    <div className="w-12 h-12 rounded-full bg-[#001e40] flex items-center justify-center mb-6 shadow-md shadow-[#001e40]/20">
                      <span className="text-[14px] font-bold text-white">{s.num}</span>
                    </div>
                    <h3 className="text-[18px] font-bold tracking-tight mb-2 text-[#0a1628]">{s.title}</h3>
                    <p className="text-[14px] text-[#4a5a6e] font-medium leading-relaxed">{s.desc}</p>

                    {/* Connector for desktop */}
                    {i < steps.length - 1 && (
                      <div className="hidden md:block absolute top-[2.75rem] left-full w-6 h-px bg-[#d0e4ff] z-10" />
                    )}
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA DAFTAR ── */}
      <section id="daftar" className="py-24 bg-white">
        <div className="w-full px-[var(--page-padding)]">
          <div className="mx-auto max-w-[var(--container-width)]">
            <FadeInUp>
              <div className="relative overflow-hidden rounded-3xl bg-[#001e40] px-10 py-16 text-center">
                {/* BG orbs */}
                <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-[#0059bb]/30 -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[#003d8a]/40 translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />
                {/* Dot pattern */}
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />

                <div className="relative z-10">
                  <p className="text-[13px] font-bold text-[#60c8ff] uppercase tracking-widest mb-4">
                    Bergabung sekarang
                  </p>
                  <h2 className="text-[clamp(1.8rem,5vw,3.25rem)] font-bold tracking-tight text-white text-balance mb-4 max-w-2xl mx-auto leading-tight">
                    Jadilah bagian dari generasi ulul albab.
                  </h2>
                  <p className="text-[16px] text-white/60 font-medium mb-10 max-w-xl mx-auto leading-relaxed">
                    Gerakan mahasiswa yang memadukan keilmuan sains, kedalaman iman,
                    dan kepedulian sosial.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href="https://wa.me/6281234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 bg-white text-[#001e40] text-[15px] font-bold px-8 py-3.5 rounded-full shadow-lg hover:bg-[#e8f0ff] active:scale-[0.97] transition-all duration-150"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span>
                      Hubungi via WhatsApp
                    </a>
                    <Link
                      href="/kaderisasi"
                      className="inline-flex items-center gap-2 text-white/70 text-[15px] font-semibold hover:text-white transition-colors"
                    >
                      Pelajari kaderisasi
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
