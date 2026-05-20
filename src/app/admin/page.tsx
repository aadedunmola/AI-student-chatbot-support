import Link from 'next/link';
import { BarChart3, BookOpenCheck, MessageCircle, UsersRound } from 'lucide-react';
import { categories, faqs, weeklyUsage } from '../../data/seed';

export default function AdminPage() {
  const metrics = [
    { label: 'FAQ records', value: faqs.length, icon: BookOpenCheck },
    { label: 'Categories', value: categories.length, icon: BarChart3 },
    { label: 'Weekly chats', value: weeklyUsage.reduce((total, day) => total + day.chats, 0), icon: MessageCircle },
    { label: 'Support teams', value: 3, icon: UsersRound },
  ];

  return (
    <main className="min-h-screen bg-[#f5fbff] px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="text-sm font-bold text-[#328cc1] hover:text-[#0b3c5d]">
          Back to landing
        </Link>

        <header className="mt-6">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#328cc1]">Admin dashboard</p>
          <h1 className="mt-3 text-4xl font-black text-[#102f47]">Support content overview</h1>
        </header>

        <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(({ label, value, icon: Icon }) => (
            <article key={label} className="rounded-[1.5rem] bg-white p-6 shadow-sm shadow-[#0b3c5d]/8">
              <Icon className="text-[#328cc1]" size={26} />
              <p className="mt-5 text-3xl font-black text-[#102f47]">{value}</p>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-[#557087]">{label}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-sm shadow-[#0b3c5d]/8">
          <h2 className="text-2xl font-black text-[#102f47]">Popular FAQ records</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faqs.slice(0, 6).map((faq) => (
              <article key={faq.id} className="rounded-2xl bg-[#f5fbff] p-4">
                <p className="font-bold text-[#16324a]">{faq.question}</p>
                <p className="mt-2 text-sm leading-6 text-[#557087]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
