import type { Metadata } from "next";
import { Container, ContentWrapper, Title, TextContent, Heading2 } from "@/components/styled";

export const metadata: Metadata = {
  title: "About",
  description: "What MomentBook is, and what it is not.",
};

export default function AboutPage() {
  return (
    <Container>
      <ContentWrapper>
        <Title>What MomentBook is</Title>

        <TextContent>
          <p>
            MomentBook is an app that creates space for noticing your day. It doesn't ask you to be productive, consistent, or optimized. It simply holds what you choose to remember.
          </p>

          <p>
            Some days you'll record moments. Some days you won't. The app doesn't judge either outcome.
          </p>

          <Heading2>What it's for</Heading2>

          <p>
            You might find MomentBook useful if you notice small things that don't fit anywhere else. If you want to remember days, not tasks. If you value observation over achievement.
          </p>

          <p>
            The app is there when you need it, and quiet when you don't.
          </p>

          <Heading2>What it's not</Heading2>

          <p>
            MomentBook is not a productivity tool. It doesn't track habits, measure consistency, or optimize your routines. It doesn't encourage sharing, publishing, or performing for others.
          </p>

          <p>
            It's not trying to change you. It's trying to see you.
          </p>
        </TextContent>
      </ContentWrapper>
    </Container>
  );
}
