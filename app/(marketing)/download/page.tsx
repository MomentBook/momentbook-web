import type { Metadata } from "next";
import { Container, ContentWrapper, Title, Subtitle, Button, ButtonGroup, Note } from "@/components/styled";

export const metadata: Metadata = {
  title: "Download",
  description: "Get MomentBook for iOS and Android.",
};

export default function DownloadPage() {
  return (
    <Container>
      <ContentWrapper>
        <Title>Download MomentBook</Title>

        <Subtitle>
          MomentBook is available for iOS and Android.
        </Subtitle>

        <ButtonGroup>
          <Button href="#">
            Download on the App Store
          </Button>
          <Button href="#">
            Get it on Google Play
          </Button>
        </ButtonGroup>

        <Note>
          Links will be available when the app launches.
        </Note>
      </ContentWrapper>
    </Container>
  );
}
