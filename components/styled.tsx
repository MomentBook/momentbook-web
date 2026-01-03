'use client';

import styled from 'styled-components';

export const Container = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  padding: 4rem 1.5rem;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
`;

export const Subtitle = styled.p`
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: #52525b;

  @media (prefers-color-scheme: dark) {
    color: #a1a1aa;
  }
`;

export const Heading2 = styled.h2`
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 600;
  color: #18181b;
  margin-top: 2rem;

  @media (prefers-color-scheme: dark) {
    color: #fafafa;
  }
`;

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: #3f3f46;
  line-height: 1.625;

  @media (prefers-color-scheme: dark) {
    color: #d4d4d8;
  }

  p {
    margin: 0;
  }
`;

export const Button = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.5rem;
  background: #18181b;
  color: #ffffff;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background-color 0.2s;
  cursor: pointer;

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

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

export const Note = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #71717a;
  margin-top: 2rem;

  @media (prefers-color-scheme: dark) {
    color: #71717a;
  }
`;

export const List = styled.ul`
  list-style: disc;
  list-style-position: inside;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StyledLink = styled.a`
  text-decoration: underline;
  transition: color 0.2s;

  &:hover {
    color: #18181b;
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      color: #fafafa;
    }
  }
`;

export const FAQItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const FAQQuestion = styled.h2`
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  color: #18181b;

  @media (prefers-color-scheme: dark) {
    color: #fafafa;
  }
`;

export const FAQAnswer = styled.p`
  color: #3f3f46;
  line-height: 1.625;

  @media (prefers-color-scheme: dark) {
    color: #d4d4d8;
  }
`;

export const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

export const CalloutBox = styled.div`
  margin-top: 3rem;
  padding: 1.5rem;
  background: #fafafa;
  border-radius: 0.5rem;
  color: #3f3f46;

  @media (prefers-color-scheme: dark) {
    background: #18181b;
    color: #d4d4d8;
  }
`;

export const BackLink = styled.a`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #71717a;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #3f3f46;
  }

  @media (prefers-color-scheme: dark) {
    color: #71717a;

    &:hover {
      color: #d4d4d8;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Prose = styled.div`
  max-width: none;

  p {
    line-height: 1.625;
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const DownloadButton = styled.a`
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
