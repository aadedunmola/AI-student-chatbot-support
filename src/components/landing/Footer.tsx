import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#102f47] px-4 py-14 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-2xl font-black">CampusFlow AI</h3>
            <p className="text-sm leading-7 text-[#c7dbe8]">
              Student support made instant, clear, and modern.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-white">Product</h4>
            <nav className="grid gap-2">
              <Link href="/" className="text-sm text-[#c7dbe8] transition hover:text-white">Home</Link>
              <Link href="/chat" className="text-sm text-[#c7dbe8] transition hover:text-white">Chatbot</Link>
              <Link href="/faq" className="text-sm text-[#c7dbe8] transition hover:text-white">Knowledge Base</Link>
            </nav>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-white">Admin</h4>
            <nav className="grid gap-2">
              <Link href="/admin" className="text-sm text-[#c7dbe8] transition hover:text-white">Admin Dashboard</Link>
              <Link href="/faq" className="text-sm text-[#c7dbe8] transition hover:text-white">Manage FAQs</Link>
            </nav>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-white">About</h4>
            <nav className="grid gap-2">
              <Link href="/chat" className="text-sm text-[#c7dbe8] transition hover:text-white">Try Demo</Link>
              <Link href="/admin" className="text-sm text-[#c7dbe8] transition hover:text-white">Admin Tools</Link>
            </nav>
          </div>
        </div>
        <div className="border-t border-white/15 pt-8 text-center text-sm text-[#a9c7d9]">
          <p>&copy; 2026 CampusFlow AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
