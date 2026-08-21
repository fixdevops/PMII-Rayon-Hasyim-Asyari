import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import MobileHeader from "@/components/MobileHeader";
import Footer from "@/components/Footer";
import AspirasiButton from "@/components/AspirasiButton";
import BootcampClient from "./BootcampClient";

export const metadata: Metadata = {
  title: "Daftar Bootcamp | PMII Rayon Hasyim Asy'ari",
  description: "Bootcamp PMII Rayon Hasyim Asy'ari FST UNUGIRI — segera hadir.",
};

export default function BootcampPage() {
  return (
    <div
      className="text-[#0f0f0f] overflow-x-hidden min-h-screen flex flex-col"
      style={{ background: "linear-gradient(to bottom, #ddeeff 0%, #eef5ff 30%, #ffffff 60%)" }}
    >
      <Navbar />
      <MobileNav />
      <MobileHeader crumbs={[{ label: "Bootcamp" }]} />

      <main className="flex-grow flex items-center justify-center px-6 py-16 md:pt-32 md:pb-16">
        <BootcampClient />
      </main>

      <AspirasiButton />
      <Footer />
    </div>
  );
}
