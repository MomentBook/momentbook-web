'use client';

import Link from "next/link";
import styled from "styled-components";

const Header = styled.header`
  border-bottom: 1px solid #e4e4e7;

  @media (prefers-color-scheme: dark) {
    border-bottom-color: #27272a;
  }
`;

const Nav = styled.nav`
  max-width: 80rem;
  margin: 0 auto;
  padding: 1rem 1.5rem;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: inherit;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const NavLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #52525b;
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      color: #a1a1aa;
    }
  }
`;

const Main = styled.main`
  min-height: 100vh;
`;

const Footer = styled.footer`
  border-top: 1px solid #e4e4e7;
  margin-top: 4rem;

  @media (prefers-color-scheme: dark) {
    border-top-color: #27272a;
  }
`;

const FooterContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #52525b;

  @media (prefers-color-scheme: dark) {
    color: #a1a1aa;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const FooterLink = styled(Link)`
  color: inherit;
  text-decoration: none;
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

const FooterText = styled.p`
  font-size: 0.75rem;
  line-height: 1rem;
`;

const StyledBody = styled.div`
  background: #ffffff;
  color: #171717;

  @media (prefers-color-scheme: dark) {
    background: #0a0a0a;
    color: #ededed;
  }
`;

export function LayoutClient({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <StyledBody className={className}>
      <Header>
        <Nav>
          <NavContainer>
            <Logo href="/">MomentBook</Logo>
            <NavLinks>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/how-it-works">How It Works</NavLink>
              <NavLink href="/faq">FAQ</NavLink>
              <NavLink href="/download">Download</NavLink>
            </NavLinks>
          </NavContainer>
        </Nav>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <FooterContainer>
          <FooterContent>
            <FooterLinks>
              <FooterLink href="/privacy">Privacy</FooterLink>
              <FooterLink href="/terms">Terms</FooterLink>
              <FooterLink href="/support">Support</FooterLink>
            </FooterLinks>
            <FooterText>
              MomentBook is an app that quietly remembers your day.
            </FooterText>
          </FooterContent>
        </FooterContainer>
      </Footer>
    </StyledBody>
  );
}
