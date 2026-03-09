
import type { NewsItem } from "@/types";
import { apiFetch } from "./client";

export function getNews(): Promise<NewsItem[]> {
    return apiFetch<NewsItem[]>("/news");
}

export function getNewsItemByID(id: number | string): Promise<NewsItem> {
    return apiFetch(`/news/${id}`);
}