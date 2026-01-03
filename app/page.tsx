import type { Metadata } from "next";
import Link from "next/link";
import styled from "styled-components";

export const metadata: Metadata = {
  title: "MomentBook",
  description: "An app that quietly remembers your day.",
};

const Container = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  padding: 4rem 1.5rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: #52525b;
  max-width: 42rem;

  @media (prefers-color-scheme: dark) {
    color: #a1a1aa;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 600;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: #3f3f46;
  list-style-position: inside;

  @media (prefers-color-scheme: dark) {
    color: #d4d4d8;
  }
`;

const ExploreSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled(Link)`
  padding: 1.5rem;
  border: 1px solid #e4e4e7;
  border-radius: 0.5rem;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s;

  &:hover {
    border-color: #d4d4d8;
  }

  @media (prefers-color-scheme: dark) {
    border-color: #27272a;

    &:hover {
      border-color: #3f3f46;
    }
  }
`;

const CardTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #52525b;

  @media (prefers-color-scheme: dark) {
    color: #a1a1aa;
  }
`;

const DownloadSection = styled.section`
  padding-top: 2rem;
`;

const DownloadButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: #18181b;
  color: #ffffff;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background: #27272a;
  }

  @media (prefers-color-scheme: dark) {
    background: #fafafa;
    color: #18181b;

    &:hover {
      background: #e4e4e7;
    }
  }
`;

export default function Home() {
  return (
    <Container>
      <Content>
        <Section>
          <Title>An app that quietly remembers your day.</Title>
          <Subtitle>
            MomentBook creates space for noticing. It doesn't ask you to be productive or optimized. It simply holds what you choose to remember.
          </Subtitle>
        </Section>

        <Section>
          <SectionTitle>You might find this useful if...</SectionTitle>
          <List>
            <li>You notice small moments that don't fit anywhere else</li>
            <li>You want to remember days, not tasks</li>
            <li>You prefer observation over optimization</li>
            <li>You value quietness over performance</li>
          </List>
        </Section>

        <ExploreSection>
          <SectionTitle>Explore</SectionTitle>
          <Grid>
            <Card href="/journeys/a-quiet-morning">
              <CardTitle>A Quiet Morning</CardTitle>
              <CardDescription>
                The stillness before the day begins.
              </CardDescription>
            </Card>
            <Card href="/places/familiar-spaces">
              <CardTitle>Familiar Spaces</CardTitle>
              <CardDescription>
                The rooms and corners you return to.
              </CardDescription>
            </Card>
          </Grid>
        </ExploreSection>

        <DownloadSection>
          <DownloadButton href="/download">
            Download MomentBook
          </DownloadButton>
        </DownloadSection>
      </Content>
    </Container>
  );
}
