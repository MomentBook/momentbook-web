import type { Metadata } from "next";
import { Container, ContentWrapper, Title, TextContent, Heading2 } from "@/components/styled";

export const metadata: Metadata = {
  title: "How It Works",
  description: "A conceptual overview of how MomentBook creates space for noticing.",
};

export default function HowItWorksPage() {
  return (
    <Container>
      <ContentWrapper>
        <Title>How it works</Title>

        <TextContent>
          <p>
            MomentBook doesn't prescribe a process. It creates space for whatever you notice.
          </p>

          <Heading2>Noticing</Heading2>

          <p>
            When something in your day feels worth remembering—a moment, a thought, a recognition—you can open the app and record it. Or not. Nothing is required.
          </p>

          <p>
            The app doesn't prompt you, remind you, or ask for consistency. It simply waits, quietly, until you need it.
          </p>

          <Heading2>Remembering</Heading2>

          <p>
            What you record stays with you. It's not shared, published, or made visible to others. It's not optimized for search or performance.
          </p>

          <p>
            You can revisit what you've noticed, or you can let it rest. The choice is yours.
          </p>

          <Heading2>No expectations</Heading2>

          <p>
            MomentBook doesn't ask you to use it every day, or in any particular way. There are no streaks, no goals, no metrics.
          </p>

          <p>
            The app meets you where you are, when you are, without judgment.
          </p>
        </TextContent>
      </ContentWrapper>
    </Container>
  );
}
