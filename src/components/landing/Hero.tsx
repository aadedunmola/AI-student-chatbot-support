import Link from 'next/link';
import { ArrowRight, BookOpenCheck, GraduationCap, MessageCircle, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const stats = [
    ['Response Time', '6 sec', 'Guided answers without waiting for office hours.'],
    ['Knowledge Base', '25 FAQs', 'Fees, registration, exams, hostel, and departmental help.'],
    ['Admin Ready', 'Live edit', 'Update support content from a simple dashboard.'],
  ];

  const topics = ['Course Registration', 'Fees & Payments', 'Exams & Results'];

  return (
    <section className="overflow-hidden bg-[#f5fbff] px-4 py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-[#328cc1]">
            AI-POWERED ACADEMIC SUPPORT
          </p>
          <h1 className="mb-6 max-w-3xl text-4xl font-black leading-tight text-[#102f47] sm:text-5xl lg:text-6xl">
            Student support made instant, clear, and modern.
          </h1>
          <p className="mb-8 max-w-2xl text-lg leading-8 text-[#557087]">
            A web platform that helps students get fast answers about course registration, school fees, exams, clearance, hostel support, and departmental guidance through a polished chat experience.
          </p>

          <div className="mb-12 flex flex-col gap-3 sm:flex-row">
            <Link href="/chat" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0b3c5d] px-7 py-3.5 font-bold text-white shadow-lg shadow-[#0b3c5d]/15 transition hover:bg-[#082d46]">
              Launch Chatbot
              <MessageCircle size={19} />
            </Link>
            <Link href="/admin" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#bfd4e3] bg-white px-7 py-3.5 font-bold text-[#0b3c5d] transition hover:border-[#328cc1]">
              View Admin Panel
              <ShieldCheck size={19} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map(([label, value, description]) => (
              <div key={label} className="border-l-2 border-[#8fc7e4] pl-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[#328cc1]">{label}</p>
                <p className="text-2xl font-black text-[#102f47]">{value}</p>
                <p className="mt-2 text-sm leading-6 text-[#557087]">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[#f3b33d]/25 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-[#39b59f]/20 blur-2xl" />

          <div className="relative rounded-[2rem] border border-white bg-white p-4 shadow-2xl shadow-[#0b3c5d]/12 sm:p-6">
            <div className="mb-5 rounded-3xl bg-[#102f47] p-5 text-white">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold">CampusFlow assistant preview</p>
                  <p className="text-xs text-[#b8d4e7]">Live academic help workspace</p>
                </div>
                <span className="rounded-full bg-[#39b59f] px-3 py-1 text-xs font-bold text-[#07372f]">Online</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-white/10 p-3">
                  <GraduationCap className="mb-2 text-[#f3b33d]" size={22} />
                  <p className="font-semibold">Student portal</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <BookOpenCheck className="mb-2 text-[#8fc7e4]" size={22} />
                  <p className="font-semibold">FAQ library</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-[#f1f5f9] p-4 text-sm leading-6 text-[#16324a]">
                Hello, I can help with registration, fees, exam cards, project guidance, and more.
              </div>

              <div className="ml-auto max-w-[82%] rounded-2xl rounded-tr-sm bg-[#328cc1] p-4 text-sm leading-6 text-white">
                How do I register my courses and print my registration slip?
              </div>

              <div className="max-w-[92%] rounded-2xl rounded-tl-sm bg-[#f1f5f9] p-4 text-sm leading-6 text-[#16324a]">
                Log in to the student portal, choose the active semester, select your approved courses, submit, and print your confirmation page for your level adviser.
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 border-t border-[#d8e8f2] pt-4">
              {topics.map((topic) => (
                <button key={topic} className="rounded-full bg-[#e9f4fb] px-4 py-2 text-sm font-bold text-[#0b3c5d] transition hover:bg-[#d9eaf7]">
                  {topic}
                </button>
              ))}
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f3b33d] text-[#102f47] transition hover:bg-[#e5a42c]" aria-label="Browse more topics">
                <ArrowRight size={19} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
