import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FigmaHeader, ScreenContainer } from "@/src/components/figma-ui"

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "CampusFlow AI",
    description: "A polished student-support chatbot and admin dashboard built for CSC320 project presentation.",
    icons: {
        icon: "/icon.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <body className="min-h-screen">
                <div className="min-h-screen bg-[var(--light-bg)]">
                    <ScreenContainer>
                        <FigmaHeader />
                    </ScreenContainer>
                    <main>{children}</main>
                </div>
            </body>
        </html>
    );
}
