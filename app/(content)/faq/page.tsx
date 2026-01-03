import type { Metadata } from "next";
import { Container, ContentWrapper, Title, FAQList, FAQItem, FAQQuestion, FAQAnswer, CalloutBox, StyledLink } from "@/components/styled";

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
    <Container>
      <ContentWrapper>
        <Title>Frequently Asked Questions</Title>

        <FAQList>
          {faqs.map((faq, index) => (
            <FAQItem key={index}>
              <FAQQuestion>{faq.question}</FAQQuestion>
              <FAQAnswer>{faq.answer}</FAQAnswer>
            </FAQItem>
          ))}
        </FAQList>

        <CalloutBox>
          <p>
            Have a question that's not answered here?{" "}
            <StyledLink href="/support">Get in touch</StyledLink>
          </p>
        </CalloutBox>
      </ContentWrapper>
    </Container>
  );
}
