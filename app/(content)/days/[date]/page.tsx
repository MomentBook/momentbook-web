import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDay, days } from "@/lib/content";
import { Container, ContentWrapper, BackLink, Header, Title, Subtitle, Prose, CalloutBox, DownloadButton } from "@/components/styled";

export const revalidate = 86400;

export async function generateStaticParams() {
  return days.map((day) => ({
    date: day.date,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>;
}): Promise<Metadata> {
  const { date } = await params;
  const day = getDay(date);

  if (!day) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: day.title,
    description: day.description,
    openGraph: {
      title: day.title,
      description: day.description,
      type: "article",
    },
  };
}

export default async function DayPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const day = getDay(date);

  if (!day) {
    notFound();
  }

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <BackLink as={Link} href="/">← Back</BackLink>
          <Title style={{ marginTop: '1rem' }}>{day.title}</Title>
          <Subtitle>{day.description}</Subtitle>
        </Header>

        <Prose>
          {day.content.split('\n\n').map((paragraph, index) => (
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
