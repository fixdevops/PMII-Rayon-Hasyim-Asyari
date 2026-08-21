import Image from "next/image";
import Link from "next/link";

interface MobileHeaderProps {
  crumbs?: { label: string; href?: string }[];
}

export default function MobileHeader({ crumbs }: MobileHeaderProps) {
  return (
    <div className="md:hidden px-5 pt-5 pb-3 space-y-3">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/logojadisatu.svg"
          alt="Logo PMII Rayon Hasyim Asy'ari"
          width={76}
          height={76}
          className="object-contain w-28 h-14"
        />
      </Link>

      {/* Breadcrumb */}
      {crumbs && crumbs.length > 0 && (
        <div
          className="bg-white rounded-xl px-5 py-3 inline-flex items-center gap-1 flex-wrap text-[13px] font-semibold"
          style={{ boxShadow: "6px 6px 14px rgba(0,30,64,0.15)" }}
        >
          <Link href="/" className="text-[#001e40] hover:underline">
            Beranda
          </Link>
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className="text-[#0059bb]">›</span>
              {c.href ? (
                <Link href={c.href} className="text-[#0059bb] hover:underline">
                  {c.label}
                </Link>
              ) : (
                <span className="text-[#0059bb]/60">{c.label}</span>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
