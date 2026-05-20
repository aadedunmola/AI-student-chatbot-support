"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { categories, quickPrompts, supportContacts } from "@/src/data/seed";
import { getBestAnswer } from "@/src/lib/chatbot";
import { clearChatHistory, loadChatHistory, loadKnowledgeBase, saveChatHistory } from "@/src/lib/storage";
import { ChatMessage, FAQItem } from "@/src/types";
import { Chip, Panel, PrimaryButton, ScreenContainer } from "@/src/components/figma-ui";

const initialMessages: ChatMessage[] = [
    {
        id: "welcome",
        role: "assistant",
        content: "Welcome to CampusFlow AI. I can guide you on academic support processes.",
        timestamp: "Now",
    },
];

function currentTime() {
    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
}

function ChatBubble({
    role,
    children,
}: {
    role: "assistant" | "user";
    children: React.ReactNode;
}) {
    return (
        <div className={clsx("flex", role === "user" ? "justify-end" : "justify-start")}>
            <div
                className={clsx(
                    "max-w-[82%] rounded-[22px] px-4 py-4 text-sm leading-7",
                    role === "user"
                        ? "rounded-br-[8px] bg-[var(--primary-blue)] text-white"
                        : "rounded-bl-[8px] bg-[var(--bot-grey)] text-[var(--text-dark)]",
                )}
            >
                {children}
            </div>
        </div>
    );
}

export function ChatWorkspace() {
    const [knowledgeBase, setKnowledgeBase] = useState<FAQItem[]>(() => loadKnowledgeBase());
    const [messages, setMessages] = useState<ChatMessage[]>(() => {
        const saved = loadChatHistory();

        if (!saved) return initialMessages;

        try {
            return JSON.parse(saved) as ChatMessage[];
        } catch {
            return initialMessages;
        }
    });
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const restoreKb = () => setKnowledgeBase(loadKnowledgeBase());
        window.addEventListener("knowledge-base-updated", restoreKb);
        return () => window.removeEventListener("knowledge-base-updated", restoreKb);
    }, []);

    useEffect(() => {
        saveChatHistory(JSON.stringify(messages));
    }, [messages]);

    const filteredKnowledgeBase = useMemo(() => {
        if (activeCategory === "all") return knowledgeBase;
        return knowledgeBase.filter((item) => item.categoryId === activeCategory);
    }, [activeCategory, knowledgeBase]);

    const sendMessage = (content: string) => {
        if (!content.trim()) return;

        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content,
            timestamp: currentTime(),
        };

        setMessages((current) => [...current, userMessage]);
        setQuery("");
        setIsTyping(true);

        const answer = getBestAnswer(content, filteredKnowledgeBase.length ? filteredKnowledgeBase : knowledgeBase);

        window.setTimeout(() => {
            setMessages((current) => [
                ...current,
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content: answer.answer,
                    timestamp: currentTime(),
                    suggestions: answer.suggestions,
                },
            ]);
            setIsTyping(false);
        }, 650);
    };

    return (
        <ScreenContainer>
            <div className="grid gap-6 xl:grid-cols-[300px_1fr_272px]">
                <Panel className="p-6">
                    <h2 className="text-[28px] font-bold tracking-tight text-[var(--deep-blue)]">Support Categories</h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                        Focus the assistant by selecting a student support area.
                    </p>

                    <div className="mt-7 space-y-3">
                        <button
                            onClick={() => setActiveCategory("all")}
                            className={clsx(
                                "w-full rounded-[20px] border px-4 py-4 text-left transition",
                                activeCategory === "all"
                                    ? "border-[var(--primary-blue)] bg-white"
                                    : "border-[var(--border)] bg-[var(--light-bg)] hover:bg-white",
                            )}
                        >
                            <p className="text-[15px] font-semibold text-[var(--text-dark)]">All support areas</p>
                            <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">Search the full knowledge base</p>
                        </button>

                        {categories.slice(0, 4).map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={clsx(
                                    "w-full rounded-[20px] border px-4 py-4 text-left transition",
                                    activeCategory === category.id
                                        ? "border-[var(--primary-blue)] bg-white"
                                        : "border-[var(--border)] bg-[var(--light-bg)] hover:bg-white",
                                )}
                            >
                                <p className="text-[15px] font-semibold text-[var(--text-dark)]">{category.title}</p>
                                <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">{category.description}</p>
                            </button>
                        ))}
                    </div>
                </Panel>

                <Panel className="overflow-hidden">
                    <div className="rounded-b-[24px] bg-[var(--deep-blue)] px-7 py-7 text-white">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div>
                                <h1 className="text-[32px] font-bold tracking-tight">Student Support Chatbot</h1>
                                <p className="mt-3 max-w-[430px] text-sm leading-7 text-white/86">
                                    Ask questions about registration, fees, exams, clearance, or departmental guidance.
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    clearChatHistory();
                                    setMessages(initialMessages);
                                }}
                                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/8"
                            >
                                <RotateCcw className="h-4 w-4" />
                                Reset chat
                            </button>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2.5">
                            {quickPrompts.slice(0, 3).map((prompt, index) => (
                                <button
                                    key={prompt}
                                    onClick={() => sendMessage(prompt)}
                                    className={clsx(
                                        "rounded-full px-4 py-2 text-xs font-semibold transition",
                                        index === 0 ? "bg-[var(--primary-blue)] text-white" : "bg-[var(--soft-blue)] text-[var(--deep-blue)]",
                                    )}
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6 p-6 md:p-8">
                        {messages.map((message) => (
                            <div key={message.id} className="space-y-3">
                                <ChatBubble role={message.role}>{message.content}</ChatBubble>
                                {message.suggestions?.length ? (
                                    <div className="flex flex-wrap gap-2">
                                        {message.suggestions.slice(0, 3).map((suggestion, index) => (
                                            <button key={suggestion} onClick={() => sendMessage(suggestion)}>
                                                <Chip active={index === 0 && message.role === "assistant"}>{suggestion}</Chip>
                                            </button>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        ))}

                        {isTyping ? (
                            <ChatBubble role="assistant">CampusFlow AI is preparing a response...</ChatBubble>
                        ) : null}

                        <div className="flex flex-col gap-3 rounded-[22px] border border-[var(--border)] bg-[var(--light-bg)] p-3 sm:flex-row">
                            <textarea
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Type your question here..."
                                className="min-h-24 flex-1 resize-none rounded-[18px] border border-[var(--border)] bg-white px-4 py-4 text-sm text-[var(--text-dark)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary-blue)]"
                            />
                            <PrimaryButton className="rounded-[18px] px-6 py-4 sm:w-[160px]" onClick={() => sendMessage(query)}>
                                Send
                            </PrimaryButton>
                        </div>
                    </div>
                </Panel>

                <Panel className="p-6">
                    <h2 className="text-[28px] font-bold tracking-tight text-[var(--deep-blue)]">Support Shortcuts</h2>

                    <div className="mt-6 space-y-3">
                        {supportContacts.map((contact) => (
                            <div key={contact.label} className="rounded-[20px] border border-[var(--border)] bg-[var(--light-bg)] px-4 py-4">
                                <p className="text-[15px] font-semibold text-[var(--text-dark)]">{contact.label}</p>
                                <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">{contact.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-7 rounded-[24px] border border-[var(--border)] bg-[var(--light-bg)] p-5">
                        <p className="text-base font-bold text-[var(--deep-blue)]">Demo Steps</p>
                        <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                            1. Ask a registration question
                            <br />
                            2. Try a fees prompt
                            <br />
                            3. Show fallback support
                            <br />
                            4. Open admin dashboard
                        </p>
                        <a href="/admin" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary-blue)]">
                            Open admin dashboard
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </div>
                </Panel>
            </div>
        </ScreenContainer>
    );
}
