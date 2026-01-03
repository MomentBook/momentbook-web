import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about MomentBook.",
};

export default function FAQPage() {
  const faqs = [
    {
      question: "What is MomentBook?",
      answer: "An app that creates space for noticing your day. It holds what you choose to remember, without asking you to be productive or consistent."
    },
    {
      question: "Is it free?",
      answer: "Pricing details will be available when the app launches."
    },
    {
      question: "Does it work offline?",
      answer: "Yes. Your moments are stored on your device and available offline."
    },
    {
      question: "Can I sync across devices?",
      answer: "Yes. You can enable sync through your personal cloud storage."
    },
    {
      question: "Who can see what I write?",
      answer: "Only you. MomentBook doesn't share your moments with anyone, including us."
    },
    {
      question: "Do I need to use it every day?",
      answer: "No. There are no streaks, goals, or expectations. Use it when it feels right."
    },
    {
      question: "Can I export my data?",
      answer: "Yes. You can export all your moments at any time."
    },
    {
      question: "Is this a journal app?",
      answer: "Not exactly. MomentBook doesn't ask for daily entries or structured reflection. It's a space for whatever you notice, whenever you notice it."
    },
    {
      question: "Will you add social features?",
      answer: "No. MomentBook is intentionally private and non-social."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-semibold tracking-tight">
          Frequently Asked Questions
        </h1>

        <div className="flex flex-col gap-8 mt-8">
          {faqs.map((faq, index) => (
            <div key={index} className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {faq.question}
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <p className="text-zinc-700 dark:text-zinc-300">
            Have a question that's not answered here?{" "}
            <a href="/support" className="underline hover:text-zinc-900 dark:hover:text-zinc-100">
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
