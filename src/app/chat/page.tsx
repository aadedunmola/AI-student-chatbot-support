import Link from 'next/link';
import { SendHorizontal } from 'lucide-react';
import { quickPrompts } from '../../data/seed';

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-[#f5fbff] px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-bold text-[#328cc1] hover:text-[#0b3c5d]">
          Back to landing
        </Link>

        <section className="mt-6 overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-[#0b3c5d]/10">
          <div className="border-b border-[#d8e8f2] bg-[#102f47] px-6 py-5 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#8fc7e4]">CampusFlow AI</p>
            <h1 className="mt-2 text-3xl font-black">Student Chatbot</h1>
          </div>

          <div className="space-y-4 p-6">
            <div className="max-w-2xl rounded-2xl rounded-tl-sm bg-[#f1f5f9] p-4 text-[#16324a]">
              Hello, I can help with registration, fees, exams, clearance, hostel support, and departmental guidance.
            </div>
            <div className="ml-auto max-w-xl rounded-2xl rounded-tr-sm bg-[#328cc1] p-4 text-white">
              How do I register my courses?
            </div>
            <div className="max-w-2xl rounded-2xl rounded-tl-sm bg-[#f1f5f9] p-4 leading-7 text-[#16324a]">
              Log in to the student portal, select the active semester, choose your approved courses, submit, and print the confirmation page for your level adviser.
            </div>
          </div>

          <div className="grid gap-3 border-t border-[#d8e8f2] p-6 sm:grid-cols-2 lg:grid-cols-3">
            {quickPrompts.map((prompt) => (
              <button key={prompt} className="rounded-2xl bg-[#e9f4fb] px-4 py-3 text-left text-sm font-bold text-[#0b3c5d] transition hover:bg-[#d9eaf7]">
                {prompt}
              </button>
            ))}
          </div>

          <div className="flex gap-3 border-t border-[#d8e8f2] p-6">
            <input className="min-w-0 flex-1 rounded-full border border-[#bfd4e3] px-5 py-3 outline-none focus:border-[#328cc1]" placeholder="Ask a campus support question" />
            <button className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0b3c5d] text-white" aria-label="Send message">
              <SendHorizontal size={20} />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
