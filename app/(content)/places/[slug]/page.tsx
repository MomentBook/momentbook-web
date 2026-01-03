import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPlace, places } from "@/lib/content";
import { Container, ContentWrapper, BackLink, Header, Title, Subtitle, Prose, CalloutBox, DownloadButton } from "@/components/styled";

export const revalidate = 86400;

export async function generateStaticParams() {
  return places.map((place) => ({
    slug: place.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const place = getPlace(slug);

  if (!place) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: place.title,
    description: place.description,
    openGraph: {
      title: place.title,
      description: place.description,
      type: "article",
    },
  };
}

export default async function PlacePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = getPlace(slug);

  if (!place) {
    notFound();
  }

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <BackLink as={Link} href="/">← Back</BackLink>
          <Title style={{ marginTop: '1rem' }}>{place.title}</Title>
          <Subtitle>{place.description}</Subtitle>
        </Header>

        <Prose>
          {place.content.split('\n\n').map((paragraph, index) => (
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
