"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import clsx from "clsx";
import { categories } from "@/src/data/seed";
import { loadKnowledgeBase } from "@/src/lib/storage";
import { FAQItem } from "@/src/types";
import { Chip, Panel, ScreenContainer } from "@/src/components/figma-ui";

export function FaqBrowser() {
    const [knowledgeBase, setKnowledgeBase] = useState<FAQItem[]>([]);
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    useEffect(() => {
        const restoreKb = () => setKnowledgeBase(loadKnowledgeBase());
        restoreKb();
        window.addEventListener("knowledge-base-updated", restoreKb);
        return () => window.removeEventListener("knowledge-base-updated", restoreKb);
    }, []);

    const filtered = useMemo(() => {
        return knowledgeBase.filter((item) => {
            const matchesCategory = activeCategory === "all" || item.categoryId === activeCategory;
            const matchesQuery =
                !query.trim() ||
                [item.question, item.answer, item.keywords.join(" ")]
                    .join(" ")
                    .toLowerCase()
                    .includes(query.toLowerCase());
            return matchesCategory && matchesQuery;
        });
    }, [activeCategory, knowledgeBase, query]);

    return (
        <ScreenContainer>
            <Panel className="p-6 md:p-9">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <h1 className="text-[34px] font-bold tracking-tight text-[var(--deep-blue)]">Search Knowledge Base</h1>
                        <p className="mt-3 max-w-[620px] text-[15px] leading-7 text-[var(--text-muted)]">
                            Browse and search every answer available in the chatbot, grouped into clear student support categories.
                        </p>
                    </div>

                    <div className="relative w-full max-w-[340px]">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search questions, answers, or keywords..."
                            className="w-full rounded-[22px] border border-[var(--border)] bg-[var(--light-bg)] py-3 pl-11 pr-4 text-sm text-[var(--text-dark)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary-blue)]"
                        />
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                    <button onClick={() => setActiveCategory("all")}>
                        <Chip active={activeCategory === "all"}>All Topics</Chip>
                    </button>
                    {categories.slice(0, 4).map((category) => (
                        <button key={category.id} onClick={() => setActiveCategory(category.id)}>
                            <Chip active={activeCategory === category.id}>{category.title}</Chip>
                        </button>
                    ))}
                </div>

                <div className="mt-10 grid gap-6 xl:grid-cols-2">
                    {filtered.map((item) => (
                        <div key={item.id} className="rounded-[26px] border border-[var(--border)] bg-[var(--light-bg)] p-6">
                            <h2 className="max-w-[510px] text-[26px] font-bold leading-tight tracking-tight text-[var(--deep-blue)]">
                                {item.question}
                            </h2>
                            <p className="mt-5 text-sm leading-7 text-[var(--text-muted)]">{item.answer}</p>
                            <div className="mt-6 flex flex-wrap gap-2">
                                {item.keywords.slice(0, 3).map((keyword) => (
                                    <Chip key={keyword} className="bg-white">
                                        {keyword}
                                    </Chip>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Panel>
        </ScreenContainer>
    );
}