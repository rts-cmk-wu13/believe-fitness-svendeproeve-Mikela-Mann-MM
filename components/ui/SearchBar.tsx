

"use client";

import { useState } from "react";
import ClassCarousel from "@/components/classes/ClassCarousel";
import { Search, X } from "lucide-react";
import { FitnessClassSummary, TrainerSummary, Rating } from "@/types";

interface Props {
  classes: (FitnessClassSummary & { asset?: { url: string }; ratings?: Rating[] })[];
  trainers: TrainerSummary[];
}

export default function SearchContent({ classes, trainers }: Props) {
  const [query, setQuery] = useState<string>("");

  const q = query.trim().toLowerCase();
 
  const filtered = q
    ? classes.filter((c) =>
        c.className.toLowerCase().includes(q) ||
        c.classDescription?.toLowerCase().includes(q) ||
        c.classDay?.toLowerCase().includes(q) ||
        c.trainer?.trainerName?.toLowerCase().includes(q)
)
: classes;


  const filteredTrainers = query.trim()
    ? trainers.filter((t) =>
      t.trainerName.toLowerCase().includes(query.toLowerCase())
    )
    : trainers;

  const hasResults = filtered.length > 0 || filteredTrainers.length > 0;

  return (
    <>
      {/* Search bar */}
      <div role="search">
        <label htmlFor="search-input" className="sr-only">
          Search classes and trainers
        </label>
        <div className="flex items-center gap-3 rounded-full border border-(--grey-border) px-4 py-3 mb-8">
          <Search
            size={18}
            aria-hidden="true"
            className="shrink-0 text-(--grey-mid)"
          />
          <input
            id="search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search classes"
            autoComplete="off"
            aria-controls="search-results"
            aria-expanded={query.trim() ? "true" : "false"}
            className="flex-1 bg-transparent outline-hidden text-sm font-(family-name:--font-body) text-(--brand-black) placeholder:text-(--grey-mid)"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="shrink-0 text-(--grey-mid) hover:text-(--brand-black) transition-colors"
            >
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      {/* Live result - screen readers */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {query.trim() && hasResults && (
          `Found ${filtered.length} class${filtered.length !== 1 ? "es" : ""} and ${filteredTrainers.length} trainer${filteredTrainers.length !== 1 ? "s" : ""}`
        )}
        {query.trim() && !hasResults && `No results for ${query}`}
      </div>

      <div id="search-results">
        {/*  Popular classes  */}
        {filtered.length > 0 && (
          <section className="mb-8" aria-labelledby="classes-heading">
            <h2 id="classes-heading" className="text-md font-bold mb-4 pt-6 pb-2">
              Popular classes
            </h2>
            <ClassCarousel classes={filtered} />
          </section>
        )}

        {/*  Popular trainers */}
        {filteredTrainers.length > 0 && (
          <section aria-labelledby="trainers-heading">
            <h2 id="trainers-heading" className="text-md font-bold mb-4 pt-8">
              Popular Trainers
            </h2>
            <ul className="flex flex-col gap-2 pt-8" aria-label="Trainer list">
              {filteredTrainers.map((trainer) => (
                <li key={trainer.id} className="py-4 text-center">
                  <p className="font-bold">{trainer.trainerName}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Empty state */}
        {q && !hasResults && (
          <p
            role="alert"
            className="text-sm text-center py-8 text-(--grey-mid)"
          >
            Your search did not give any results. Try to search for something else.
          </p>
        )}
      </div>
    </>
  );
}