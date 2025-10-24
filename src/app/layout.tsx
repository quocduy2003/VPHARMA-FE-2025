// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollToTopButton from "@/components/ScrollToTopButton";

export const metadata: Metadata = {
  title: 'V-Pharma',
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <Header />
        <main className="flex-1">{children}</main>
        <ScrollToTopButton />
        <Footer />

      </body>
    </html>
  );
}
