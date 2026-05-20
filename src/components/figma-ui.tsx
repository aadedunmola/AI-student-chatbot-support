import clsx from "clsx";
import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight, MessageSquareMore } from "lucide-react";

export const theme = {
    deepBlue: "#0B3C5D",
    primaryBlue: "#328CC1",
    lightBg: "#D9EAF7",
    white: "#FFFFFF",
    botGrey: "#F1F5F9",
    textDark: "#16324A",
    textMuted: "#557087",
    border: "#BFD4E3",
    softBlue: "#E9F4FB",
};

export function ScreenContainer({ children }: { children: ReactNode }) {
    return <div className="mx-auto w-full max-w-[1440px] px-4 pb-10 pt-6 md:px-6 lg:px-9 lg:pb-14 lg:pt-7">{children}</div>;
}

export function FigmaHeader() {
    const links = [
        { href: "/", label: "Home" },
        { href: "/chat", label: "Chatbot" },
        { href: "/faq", label: "Knowledge Base" },
        { href: "/admin", label: "Admin" },
    ];

    return (
        <div className="rounded-[28px] bg-[var(--deep-blue)] px-5 py-5 text-white shadow-[0_20px_50px_rgba(11,60,93,0.16)] md:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[var(--primary-blue)] text-white">
                        <MessageSquareMore className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold tracking-tight">CampusFlow AI</p>
                        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/80">Student Support Suite</p>
                    </div>
                </Link>

                <nav className="hidden items-center gap-8 lg:flex">
                    {links.map((link) => (
                        <Link key={link.href} href={link.href} className="text-[15px] font-medium text-white/95 transition hover:text-white">
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <Link
                    href="/chat"
                    className="inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--deep-blue)] transition hover:bg-white/90 lg:self-auto"
                >
                    Open Demo
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}

export function Panel({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={clsx(
                "rounded-[30px] border border-[var(--border)] bg-white shadow-[0_18px_50px_rgba(22,50,74,0.06)]",
                className,
            )}
        >
            {children}
        </div>
    );
}

export function MetricCard({
    eyebrow,
    value,
    note,
    className,
}: {
    eyebrow: string;
    value: string;
    note: string;
    className?: string;
}) {
    return (
        <Panel className={clsx("rounded-[24px] p-6", className)}>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">{eyebrow}</p>
            <p className="mt-4 text-[34px] font-bold leading-none text-[var(--deep-blue)]">{value}</p>
            <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">{note}</p>
        </Panel>
    );
}

export function Chip({
    children,
    active = false,
    className,
}: {
    children: ReactNode;
    active?: boolean;
    className?: string;
}) {
    return (
        <span
            className={clsx(
                "inline-flex rounded-full px-4 py-2 text-xs font-semibold",
                active ? "bg-[var(--primary-blue)] text-white" : "bg-[var(--soft-blue)] text-[var(--deep-blue)]",
                className,
            )}
        >
            {children}
        </span>
    );
}

export function PrimaryButton({
    children,
    className,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    className?: string;
}) {
    return (
        <button
            {...props}
            className={clsx(
                "inline-flex items-center justify-center rounded-full bg-[var(--primary-blue)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-105",
                className,
            )}
        >
            {children}
        </button>
    );
}

export function SecondaryButton({
    children,
    className,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    className?: string;
}) {
    return (
        <button
            {...props}
            className={clsx(
                "inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--deep-blue)] transition hover:bg-[var(--soft-blue)]",
                className,
            )}
        >
            {children}
        </button>
    );
}

export function SectionHeading({
    eyebrow,
    title,
    description,
}: {
    eyebrow: string;
    title: string;
    description: string;
}) {
    return (
        <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--primary-blue)]">{eyebrow}</p>
            <h2 className="text-[28px] font-bold tracking-tight text-[var(--deep-blue)] md:text-[34px]">{title}</h2>
            <p className="max-w-2xl text-sm leading-7 text-[var(--text-muted)] md:text-[15px]">{description}</p>
        </div>
    );
}
