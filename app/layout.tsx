import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  metadataBase: new URL("https://momentbook.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
