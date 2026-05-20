import Link from 'next/link';
import { categories, faqs } from '../../data/seed';

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#f5fbff] px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="text-sm font-bold text-[#328cc1] hover:text-[#0b3c5d]">
          Back to landing
        </Link>

        <header className="mt-6 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#328cc1]">Knowledge base</p>
          <h1 className="mt-3 text-4xl font-black text-[#102f47]">Campus support FAQs</h1>
          <p className="mt-4 text-lg leading-8 text-[#557087]">
            Browse the seeded academic support content used by the chatbot demo.
          </p>
        </header>

        <section className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <article key={category.id} className="rounded-[1.5rem] bg-white p-6 shadow-sm shadow-[#0b3c5d]/8">
              <h2 className="text-xl font-black text-[#102f47]">{category.title}</h2>
              <p className="mt-3 leading-7 text-[#557087]">{category.description}</p>
              <div className="mt-5 space-y-3">
                {faqs.filter((faq) => faq.categoryId === category.id).slice(0, 2).map((faq) => (
                  <div key={faq.id} className="rounded-2xl bg-[#f5fbff] p-4">
                    <p className="font-bold text-[#16324a]">{faq.question}</p>
                    <p className="mt-2 text-sm leading-6 text-[#557087]">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
