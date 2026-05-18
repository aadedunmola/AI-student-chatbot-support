import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/90 px-4 py-4 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 text-[#102f47]">
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#bfd4e3]">
            <Image
              src="/campusflow-logo.png"
              alt="CampusFlow AI logo"
              width={44}
              height={44}
              className="h-full w-full object-cover"
              priority
            />
          </span>
          <span>
            <span className="block text-lg font-bold leading-tight">CampusFlow AI</span>
            <span className="block text-xs font-medium text-[#557087]">Student support assistant</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-[#557087] md:flex">
          <Link href="/" className="transition hover:text-[#0b3c5d]">Home</Link>
          <Link href="/chat" className="transition hover:text-[#0b3c5d]">Chatbot</Link>
          <Link href="/faq" className="transition hover:text-[#0b3c5d]">Knowledge Base</Link>
          <Link href="/admin" className="transition hover:text-[#0b3c5d]">Admin</Link>
        </nav>

        <Link
          href="/chat"
          className="hidden rounded-full bg-[#328cc1] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#246f9c] sm:inline-flex"
        >
          Open Demo
        </Link>

        <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#bfd4e3] text-[#0b3c5d] md:hidden" aria-label="Open navigation">
          <Menu size={21} />
        </button>
      </div>
    </header>
  );
}
