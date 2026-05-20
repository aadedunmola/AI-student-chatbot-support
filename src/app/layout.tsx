import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CampusFlow - Student Support Chatbot',
  description: 'AI-powered student support chatbot',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}