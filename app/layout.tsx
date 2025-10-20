import type { Metadata } from 'next';
import { Bricolage_Grotesque } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Providers from './Providers';
import { Toaster } from '@/components/ui/sonner';
import { ClerkProvider } from '@clerk/nextjs';

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Learnova',
  description: 'Real-time AI Teaching Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bricolage.variable} antialiased`}>
        <Providers>
          <Toaster position="top-right" closeButton />
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
