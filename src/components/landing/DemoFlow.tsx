import { CheckCircle2 } from 'lucide-react';

export default function DemoFlow() {
  const steps = [
    {
      number: 1,
      title: 'Ask a Question',
      description: 'Students can type a question directly or start from common topics like registration, fees, exams, hostel, or clearance.'
    },
    {
      number: 2,
      title: 'Get an Instant Answer',
      description: 'CampusFlow checks the support knowledge base and returns a clear response with the next step the student should take.'
    },
    {
      number: 3,
      title: 'Follow Related Guidance',
      description: 'Students can continue with suggested questions, browse related FAQs, or move into another support category.'
    },
    {
      number: 4,
      title: 'Keep Answers Updated',
      description: 'Admins can update FAQ records from the dashboard so students always receive current and reliable information.'
    }
  ];

  const helpTopics = [
    'Course registration steps, add/drop questions, and portal issues',
    'School fees, payment receipts, deadlines, and payment reflection problems',
    'Exam cards, results, exam rules, and clearance requirements',
    'Department contacts, level adviser guidance, and project approval support',
    'Hostel applications, welfare issues, and student affairs contacts',
    'Quick access to FAQs when students do not know who to ask'
  ];

  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
        <div className="pt-6 sm:pt-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-[#328cc1]">How it works</p>
          <h2 className="mb-10 text-3xl font-black text-[#102f47] sm:text-4xl">How CampusFlow Works</h2>
          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0b3c5d] text-lg font-black text-white">
                    {step.number}
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold text-[#102f47]">{step.title}</h3>
                  <p className="leading-7 text-[#557087]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-[#f5fbff] p-6 sm:p-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-[#328cc1]">Student support</p>
          <h2 className="mb-10 text-3xl font-black text-[#102f47] sm:text-4xl">What CampusFlow Can Help With</h2>
          <div className="space-y-5">
            {helpTopics.map((topic, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle2 className="mt-1 flex-shrink-0 text-[#39b59f]" size={24} />
                <p className="text-lg leading-8 text-[#16324a]">{topic}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
