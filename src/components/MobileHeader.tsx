import Image from "next/image";
import Link from "next/link";

interface MobileHeaderProps {
  crumbs?: { label: string; href?: string }[];
}

export default function MobileHeader({ crumbs }: MobileHeaderProps) {
  return (
    <div className="md:hidden px-5 pt-5 pb-3">
      <Link href="/" className="flex items-center gap-2.5">
        <Image
          src="/logorayon.png"
          alt="Logo PMII Rayon Hasyim Asy'ari"
          width={36}
          height={28}
          className="rounded-full object-contain"
        />
        <span className="text-[12px] font-semibold text-[#1a1a1a] tracking-wide">
          PMII Rayon Hasyim Asy&apos;ari
        </span>
      </Link>

      {crumbs && crumbs.length > 0 && (
        <div className="flex items-center gap-1 flex-wrap mt-2">
          <Link
            href="/"
            className="text-[11px] text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
          >
            Beranda
          </Link>
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className="text-[11px] text-[#9b9b9b]">›</span>
              {c.href ? (
                <Link
                  href={c.href}
                  className="text-[11px] text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
                >
                  {c.label}
                </Link>
              ) : (
                <span className="text-[11px] text-[#9b9b9b]">{c.label}</span>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
