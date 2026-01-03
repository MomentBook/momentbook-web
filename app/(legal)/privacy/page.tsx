import type { Metadata } from "next";
import { Container, ContentWrapper, Title, Subtitle, TextContent, Heading2, List, Note } from "@/components/styled";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How MomentBook handles your data.",
};

export default function PrivacyPage() {
  return (
    <Container>
      <ContentWrapper>
        <Title>Privacy Policy</Title>

        <TextContent>
          <Subtitle>
            Your moments are yours. MomentBook doesn't share, sell, or analyze your data.
          </Subtitle>

          <Heading2>What we collect</Heading2>

          <p>
            MomentBook stores the moments you choose to record. This data lives on your device and in your personal cloud storage (if you enable sync).
          </p>

          <Heading2>What we don't do</Heading2>

          <List>
            <li>We don't read your moments</li>
            <li>We don't share your data with third parties</li>
            <li>We don't use your content for training or analytics</li>
            <li>We don't track your behavior across apps or websites</li>
          </List>

          <Heading2>Your control</Heading2>

          <p>
            You can export or delete your data at any time. Nothing is permanent unless you choose it to be.
          </p>

          <Note>
            Last updated: January 2026
          </Note>
        </TextContent>
      </ContentWrapper>
    </Container>
  );
}
