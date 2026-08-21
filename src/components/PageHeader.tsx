import Image from "next/image";
import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  crumbs: Crumb[];
}

export default function PageHeader({ crumbs }: PageHeaderProps) {
  return (
    <nav className="bg-white rounded-xl shadow-[6px_6px_12px_rgba(0,30,64,0.15)] max-w-2xl mx-auto mt-2 mb-10">
      <div className="flex items-center gap-3 px-5 py-3.5 flex-wrap">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logojadisatu.svg"
            alt="Logo PMII Rayon Hasyim Asy'ari"
            width={36}
            height={36}
            className="object-contain"
          />
        </Link>

        {/* Divider */}
        <span className="text-[#0059bb]/40 text-[18px]">›</span>

        {/* Crumbs */}
        <ol className="flex items-center gap-1 text-[#0f0f0f]/70 font-semibold text-[14px] flex-wrap">
          <li>
            <Link href="/" className="hover:text-[#001e40] transition-colors">
              Beranda
            </Link>
          </li>
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className="text-[#0059bb]">›</span>
              {c.href ? (
                <Link href={c.href} className="text-[#0059bb] hover:text-[#001e40] transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span className="text-[#0059bb]/60">{c.label}</span>
              )}
            </span>
          ))}
        </ol>
      </div>
    </nav>
  );
}
