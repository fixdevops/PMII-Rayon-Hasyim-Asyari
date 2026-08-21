import Image from "next/image";
import Link from "next/link";

export default function MobileHeader() {
  return (
    <div className="flex items-center px-5 pt-5 pb-2 md:hidden">
      <Link href="/">
        <Image
          src="/logojadisatu.svg"
          alt="Logo PMII Rayon Hasyim Asy'ari"
          width={56}
          height={56}
          className="object-contain w-14 h-14"
        />
      </Link>
    </div>
  );
}
