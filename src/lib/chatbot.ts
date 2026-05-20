import { faqs, quickPrompts } from "../data/seed";
import { FAQItem } from "../types";

const normalize = (text: string) =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

export function getBestAnswer(query: string, knowledgeBase: FAQItem[]) {
    const normalizedQuery = normalize(query);
    const queryTokens = normalizedQuery.split(" ").filter(Boolean);

    const scored = knowledgeBase
        .map((item) => {
            const searchable = normalize(
                [item.question, item.answer, item.keywords.join(" "), item.related.join(" ")].join(" "),
            );

            let score = 0;

            if (searchable.includes(normalizedQuery)) score += 15;
            if (normalize(item.question) === normalizedQuery) score += 20;

            queryTokens.forEach((token) => {
                if (item.keywords.some((keyword) => normalize(keyword).includes(token))) score += 7;
                if (searchable.includes(token)) score += 2;
            });

            return { item, score };
        })
        .sort((a, b) => b.score - a.score || b.item.popularity - a.item.popularity);

    const best = scored[0];

    if (!best || best.score < 10) {
        return {
            matched: false as const,
            answer:
                "I do not have a confident answer for that yet. Try one of the suggested prompts below or contact the department office for official clarification.",
            suggestions: quickPrompts.slice(0, 4),
            item: null,
        };
    }

    return {
        matched: true as const,
        answer: best.item.answer,
        suggestions: best.item.related.length ? best.item.related : quickPrompts.slice(0, 4),
        item: best.item,
    };
}

export function getFeaturedFaqs(knowledgeBase: FAQItem[]) {
    return [...knowledgeBase].sort((a, b) => b.popularity - a.popularity).slice(0, 6);
}

export function getCategoryName(categoryId: string) {
    return faqs.find((item) => item.categoryId === categoryId)?.categoryId ?? categoryId;
}

