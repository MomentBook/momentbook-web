import type { Metadata } from "next";
import { Container, ContentWrapper, Title, Subtitle, TextContent, Heading2, StyledLink, Note } from "@/components/styled";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with MomentBook.",
};

export default function SupportPage() {
  return (
    <Container>
      <ContentWrapper>
        <Title>Support</Title>

        <Subtitle>
          If you need help with MomentBook, we're here.
        </Subtitle>

        <TextContent>
          <Heading2>Common questions</Heading2>

          <p>
            You might find answers in our <StyledLink href="/faq">FAQ</StyledLink>.
          </p>

          <Heading2>Contact</Heading2>

          <p>
            For other questions or issues, you can reach us at{" "}
            <StyledLink href="mailto:support@momentbook.app">
              support@momentbook.app
            </StyledLink>
          </p>

          <Note>
            We typically respond within 1-2 business days.
          </Note>
        </TextContent>
      </ContentWrapper>
    </Container>
  );
}
