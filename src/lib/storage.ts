"use client";

import { faqs } from "../data/seed";
import { FAQItem } from "../types";

const KB_KEY = "campusflow-knowledge-base";
const CHAT_KEY = "campusflow-chat-history";

export function loadKnowledgeBase() {
    if (typeof window === "undefined") return faqs;

    const raw = window.localStorage.getItem(KB_KEY);
    if (!raw) return faqs;

    try {
        const parsed = JSON.parse(raw) as FAQItem[];
        return parsed.length ? parsed : faqs;
    } catch {
        return faqs;
    }
}

export function saveKnowledgeBase(items: FAQItem[]) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(KB_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("knowledge-base-updated"));
}

export function loadChatHistory() {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(CHAT_KEY);
}

export function saveChatHistory(value: string) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(CHAT_KEY, value);
}

export function clearChatHistory() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(CHAT_KEY);
}

