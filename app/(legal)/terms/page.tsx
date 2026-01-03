import type { Metadata } from "next";
import { Container, ContentWrapper, Title, Subtitle, TextContent, Heading2, Note } from "@/components/styled";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of use for MomentBook.",
};

export default function TermsPage() {
  return (
    <Container>
      <ContentWrapper>
        <Title>Terms of Service</Title>

        <TextContent>
          <Subtitle>
            By using MomentBook, you agree to these terms.
          </Subtitle>

          <Heading2>Your content</Heading2>

          <p>
            Everything you record in MomentBook belongs to you. We don't claim ownership, and we don't have access to it.
          </p>

          <Heading2>How you can use the app</Heading2>

          <p>
            MomentBook is for personal, non-commercial use. You're welcome to use it however makes sense for you, as long as you're not harming others or violating laws.
          </p>

          <Heading2>No guarantees</Heading2>

          <p>
            We work to keep MomentBook reliable and secure, but we can't guarantee it will always be available or error-free. Use the app at your own discretion.
          </p>

          <Heading2>Changes</Heading2>

          <p>
            We may update these terms from time to time. If we make significant changes, we'll let you know through the app.
          </p>

          <Note>
            Last updated: January 2026
          </Note>
        </TextContent>
      </ContentWrapper>
    </Container>
  );
}
