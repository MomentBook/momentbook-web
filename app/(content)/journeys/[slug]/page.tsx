import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getJourney, journeys } from "@/lib/content";
import { Container, ContentWrapper, BackLink, Header, Title, Subtitle, Prose, CalloutBox, DownloadButton } from "@/components/styled";

export const revalidate = 86400;

export async function generateStaticParams() {
  return journeys.map((journey) => ({
    slug: journey.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const journey = getJourney(slug);

  if (!journey) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: journey.title,
    description: journey.description,
    openGraph: {
      title: journey.title,
      description: journey.description,
      type: "article",
    },
  };
}

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const journey = getJourney(slug);

  if (!journey) {
    notFound();
  }

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <BackLink as={Link} href="/">← Back</BackLink>
          <Title style={{ marginTop: '1rem' }}>{journey.title}</Title>
          <Subtitle>{journey.description}</Subtitle>
        </Header>

        <Prose>
          {journey.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </Prose>

        <CalloutBox>
          <p style={{ marginBottom: '1rem' }}>
            If this resonates, MomentBook might be for you.
          </p>
          <DownloadButton as={Link} href="/download">
            Download the app
          </DownloadButton>
        </CalloutBox>
      </ContentWrapper>
    </Container>
  );
}
