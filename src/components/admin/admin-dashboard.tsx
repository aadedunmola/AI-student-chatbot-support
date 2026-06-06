"use client";

import { FormEvent, useMemo, useState } from "react";
import { adminPasscode, categories } from "@/src/data/seed";
import { loadKnowledgeBase, saveKnowledgeBase } from "@/src/lib/storage";
import { FAQItem } from "@/src/types";
import { MetricCard, Panel, PrimaryButton, ScreenContainer, SecondaryButton } from "@/src/components/figma-ui";

type DraftForm = {
    question: string;
    answer: string;
    categoryId: string;
    keywords: string;
    related: string;
};

const initialDraft: DraftForm = {
    question: "",
    answer: "",
    categoryId: "registration",
    keywords: "",
    related: "",
};

export function AdminDashboard() {
    const [passcode, setPasscode] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [knowledgeBase, setKnowledgeBase] = useState<FAQItem[]>(() => loadKnowledgeBase());
    const [draft, setDraft] = useState<DraftForm>(initialDraft);
    const [editingId, setEditingId] = useState<string | null>(null);

    const stats = useMemo(() => {
        return {
            totalFaqs: knowledgeBase.length,
            totalCategories: new Set(knowledgeBase.map((item) => item.categoryId)).size,
            highDemand: knowledgeBase.filter((item) => item.popularity >= 75).length,
            engagement: "89%",
        };
    }, [knowledgeBase]);

    const saveRecord = (event: FormEvent) => {
        event.preventDefault();

        const item: FAQItem = {
            id: editingId ?? `faq-${Date.now()}`,
            categoryId: draft.categoryId,
            question: draft.question,
            answer: draft.answer,
            keywords: draft.keywords
                .split(",")
                .map((value) => value.trim())
                .filter(Boolean),
            related: draft.related
                .split(",")
                .map((value) => value.trim())
                .filter(Boolean),
            popularity: editingId
                ? knowledgeBase.find((record) => record.id === editingId)?.popularity ?? 50
                : 50,
        };

        const next = editingId
            ? knowledgeBase.map((record) => (record.id === editingId ? item : record))
            : [item, ...knowledgeBase];

        setKnowledgeBase(next);
        saveKnowledgeBase(next);
        setDraft(initialDraft);
        setEditingId(null);
    };

    const editRecord = (item: FAQItem) => {
        setEditingId(item.id);
        setDraft({
            question: item.question,
            answer: item.answer,
            categoryId: item.categoryId,
            keywords: item.keywords.join(", "),
            related: item.related.join(", "),
        });
    };

    const deleteRecord = (id: string) => {
        const next = knowledgeBase.filter((item) => item.id !== id);
        setKnowledgeBase(next);
        saveKnowledgeBase(next);
    };

    if (!authenticated) {
        return (
            <ScreenContainer>
                <Panel className="mx-auto max-w-[520px] p-8 text-center md:p-10">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--primary-blue)]">Admin secure access</p>
                    <h1 className="mt-4 text-[38px] font-bold leading-tight tracking-tight text-[var(--deep-blue)]">
                        Control the knowledge base
                    </h1>
                    <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                        Enter the authorized admin passcode to manage chatbot questions, answers, and dashboard records.
                    </p>

                    <div className="mt-8 space-y-3">
                        <input
                            type="password"
                            value={passcode}
                            onChange={(event) => setPasscode(event.target.value)}
                            placeholder="Enter admin passcode"
                            className="w-full rounded-[18px] border border-[var(--border)] bg-[var(--light-bg)] px-4 py-3 text-sm text-[var(--text-dark)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary-blue)]"
                        />
                        <PrimaryButton className="w-full justify-center py-3.5" onClick={() => setAuthenticated(passcode === adminPasscode)}>
                            Unlock admin dashboard
                        </PrimaryButton>

                    </div>
                </Panel>
            </ScreenContainer>
        );
    }

    return (
        <ScreenContainer>
            <Panel className="p-6 md:p-9">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h1 className="text-[34px] font-bold tracking-tight text-[var(--deep-blue)]">Admin Dashboard</h1>
                        <p className="mt-3 max-w-[620px] text-[15px] leading-7 text-[var(--text-muted)]">
                            Manage the chatbot knowledge base, monitor content coverage, and keep student support answers updated.
                        </p>
                    </div>
                    <PrimaryButton className="self-start">Add New FAQ</PrimaryButton>
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <MetricCard
                        eyebrow="Knowledge records"
                        value={String(stats.totalFaqs)}
                        note="Seeded FAQ answers currently available in the student support assistant."
                    />
                    <MetricCard
                        eyebrow="Support areas"
                        value={String(stats.totalCategories)}
                        note="Registration, fees, exams, welfare, records, and department support."
                    />
                    <MetricCard
                        eyebrow="High demand"
                        value={String(stats.highDemand)}
                        note="Popular question groups that students ask most often during the term."
                    />
                    <MetricCard
                        eyebrow="Avg engagement"
                        value={stats.engagement}
                        note="Represents strong student interaction with chat prompts and answers."
                    />
                </div>

                <div className="mt-10 grid gap-6 xl:grid-cols-[560px_1fr]">
                    <div className="rounded-[28px] border border-[var(--border)] bg-[var(--light-bg)] p-7">
                        <h2 className="text-[24px] font-bold tracking-tight text-[var(--deep-blue)]">FAQ Editor</h2>
                        <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                            Create or update support answers without changing code.
                        </p>

                        <form onSubmit={saveRecord} className="mt-8 space-y-5">
                            <div>
                                <label className="text-sm font-semibold text-[var(--deep-blue)]">Question</label>
                                <input
                                    value={draft.question}
                                    onChange={(event) => setDraft((current) => ({ ...current, question: event.target.value }))}
                                    className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-dark)] outline-none focus:border-[var(--primary-blue)]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-[var(--deep-blue)]">Answer</label>
                                <textarea
                                    value={draft.answer}
                                    onChange={(event) => setDraft((current) => ({ ...current, answer: event.target.value }))}
                                    className="mt-2 min-h-[110px] w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-dark)] outline-none focus:border-[var(--primary-blue)]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-[var(--deep-blue)]">Category</label>
                                <select
                                    value={draft.categoryId}
                                    onChange={(event) => setDraft((current) => ({ ...current, categoryId: event.target.value }))}
                                    className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-dark)] outline-none focus:border-[var(--primary-blue)]"
                                >
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-[var(--deep-blue)]">Keywords</label>
                                <input
                                    value={draft.keywords}
                                    onChange={(event) => setDraft((current) => ({ ...current, keywords: event.target.value }))}
                                    className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-dark)] outline-none focus:border-[var(--primary-blue)]"
                                />
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <PrimaryButton className="px-6 py-3.5">{editingId ? "Save Record" : "Save Record"}</PrimaryButton>
                                {editingId ? (
                                    <SecondaryButton
                                        className="px-6 py-3.5"
                                        onClick={() => {
                                            setEditingId(null);
                                            setDraft(initialDraft);
                                        }}
                                    >
                                        Cancel
                                    </SecondaryButton>
                                ) : null}
                            </div>
                        </form>
                    </div>

                    <div className="rounded-[28px] border border-[var(--border)] bg-[var(--light-bg)] p-7">
                        <h2 className="text-[24px] font-bold tracking-tight text-[var(--deep-blue)]">Usage Analytics</h2>
                        <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                            A clean dashboard card showing how the admin view can track support demand.
                        </p>

                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                            <div className="rounded-[24px] border border-[var(--border)] bg-white p-6">
                                <p className="text-lg font-semibold text-[var(--deep-blue)]">Weekly Chat Volume</p>
                                <div className="mt-6 flex h-[170px] items-end gap-3">
                                    {[120, 160, 132, 188, 172, 98].map((height, index) => (
                                        <div key={height} className="flex flex-col items-center gap-2">
                                            <div className="w-[22px] rounded-[10px] bg-[var(--primary-blue)]" style={{ height }} />
                                            <span className="text-[11px] font-semibold text-[var(--text-muted)]">
                                                {["M", "T", "W", "T", "F", "S"][index]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[24px] border border-[var(--border)] bg-white p-6">
                                <p className="text-lg font-semibold text-[var(--deep-blue)]">Top Support Areas</p>
                                <div className="mt-6 space-y-5">
                                    {[
                                        ["Registration", 198],
                                        ["Fees", 146],
                                        ["Exams", 118],
                                        ["Department", 86],
                                    ].map(([label, width]) => (
                                        <div key={label}>
                                            <p className="mb-2 text-sm font-medium text-[var(--text-muted)]">{label}</p>
                                            <div className="h-4 rounded-full bg-[var(--soft-blue)]">
                                                <div className="h-4 rounded-full bg-[var(--primary-blue)]" style={{ width }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 overflow-x-auto rounded-[28px] border border-[var(--border)] bg-[var(--light-bg)] p-4 md:p-6">
                    <table className="min-w-full border-separate border-spacing-y-3">
                        <thead>
                            <tr className="text-left text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                                <th className="px-4 py-2">Question</th>
                                <th className="px-4 py-2">Category</th>
                                <th className="px-4 py-2">Popularity</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {knowledgeBase.map((item) => (
                                <tr key={item.id} className="rounded-[20px] bg-white text-sm text-[var(--text-dark)]">
                                    <td className="rounded-l-[20px] px-4 py-4">
                                        <p className="font-semibold">{item.question}</p>
                                        <p className="mt-1 max-w-xl text-xs leading-6 text-[var(--text-muted)]">{item.answer}</p>
                                    </td>
                                    <td className="px-4 py-4">{categories.find((entry) => entry.id === item.categoryId)?.title ?? item.categoryId}</td>
                                    <td className="px-4 py-4">{item.popularity}</td>
                                    <td className="rounded-r-[20px] px-4 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => editRecord(item)}
                                                className="rounded-full border border-[var(--border)] bg-[var(--soft-blue)] px-4 py-2 text-xs font-semibold text-[var(--deep-blue)]"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteRecord(item.id)}
                                                className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-xs font-semibold text-[var(--deep-blue)]"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Panel>
        </ScreenContainer>
    );
}