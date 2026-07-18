"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";

type SearchOption = {
  id: string;
  title: string;
  slug: string;
};

type InterviewQuestionSearchProps = {
  q: string;
  role: string;
  topic: string;
  difficulty: string;
  answer: string;
  sort: string;
  roles: SearchOption[];
  topics: SearchOption[];
  suggestions: string[];
};

const controlClassName =
  "border-border bg-background text-foreground placeholder:text-muted-foreground outline-none shadow-sm focus:border-primary/50 focus:ring-4 focus:ring-primary/10";

function difficultyLabel(value: string) {
  return value.replaceAll("_", " ").toLowerCase();
}

export function InterviewQuestionSearch({
  q,
  role,
  topic,
  difficulty,
  answer,
  sort,
  roles,
  topics,
  suggestions,
}: InterviewQuestionSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState(q);
  const [selectedRole, setSelectedRole] = useState(role);
  const [selectedTopic, setSelectedTopic] = useState(topic);
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty);
  const [answerStatus, setAnswerStatus] = useState(answer);
  const [sortBy, setSortBy] = useState(sort || "relevant");

  const hasFilters = Boolean(query || selectedRole || selectedTopic || selectedDifficulty || answerStatus || (sortBy && sortBy !== "relevant"));
  const activeSummary = useMemo(
    () =>
      [
        query ? `"${query}"` : "",
        selectedRole ? roles.find((item) => item.slug === selectedRole)?.title : "",
        selectedTopic ? topics.find((item) => item.slug === selectedTopic)?.title : "",
        selectedDifficulty ? difficultyLabel(selectedDifficulty) : "",
        answerStatus ? answerStatus : "",
      ].filter(Boolean),
    [answerStatus, query, roles, selectedDifficulty, selectedRole, selectedTopic, topics],
  );

  function buildUrl(next?: Partial<Record<string, string>>) {
    const params = new URLSearchParams();
    const values = {
      q: query.trim(),
      role: selectedRole,
      topic: selectedTopic,
      difficulty: selectedDifficulty,
      answer: answerStatus,
      sort: sortBy === "relevant" ? "" : sortBy,
      ...next,
    };

    Object.entries(values).forEach(([key, value]) => {
      const cleanValue = value?.trim();
      if (cleanValue) params.set(key, cleanValue);
    });

    const queryString = params.toString();
    return `/students/interview-questions${queryString ? `?${queryString}` : ""}#questions`;
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(buildUrl());
  }

  function clearSearch() {
    setQuery("");
    setSelectedRole("");
    setSelectedTopic("");
    setSelectedDifficulty("");
    setAnswerStatus("");
    setSortBy("relevant");
    router.push("/students/interview-questions#questions");
  }

  function quickSearch(value: string) {
    setQuery(value);
    router.push(buildUrl({ q: value, role: "", topic: "", difficulty: "", answer: "", sort: "" }));
  }

  return (
    <div className="rounded-[1.35rem] border border-border bg-surface-muted p-4 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            Advanced search
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Search by keyword, role, topic, answer status, difficulty, and sorting.
          </p>
        </div>
        {hasFilters ? (
          <button
            type="button"
            onClick={clearSearch}
            className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-semibold text-foreground shadow-sm transition hover:border-primary/30 hover:text-primary"
          >
            <X className="size-4" aria-hidden="true" />
            Clear
          </button>
        ) : null}
      </div>

      <form onSubmit={submitSearch} className="grid gap-3 lg:grid-cols-[minmax(16rem,1fr)_13rem_13rem_11rem_11rem_11rem_auto]">
        <label className={`flex h-12 items-center gap-3 rounded-xl px-4 ${controlClassName}`}>
          <Search className="size-4 text-primary" aria-hidden="true" />
          <input
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            list="interview-search-suggestions"
            placeholder="Search questions, skills, roles..."
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <datalist id="interview-search-suggestions">
            {suggestions.map((item) => (
              <option key={item} value={item} />
            ))}
          </datalist>
        </label>

        <select value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)} className={`h-12 rounded-xl px-4 text-sm font-semibold ${controlClassName}`}>
          <option value="">All roles</option>
          {roles.map((item) => (
            <option key={item.id} value={item.slug}>
              {item.title}
            </option>
          ))}
        </select>

        <select value={selectedTopic} onChange={(event) => setSelectedTopic(event.target.value)} className={`h-12 rounded-xl px-4 text-sm font-semibold ${controlClassName}`}>
          <option value="">All topics</option>
          {topics.map((item) => (
            <option key={item.id} value={item.slug}>
              {item.title}
            </option>
          ))}
        </select>

        <select value={selectedDifficulty} onChange={(event) => setSelectedDifficulty(event.target.value)} className={`h-12 rounded-xl px-4 text-sm font-semibold ${controlClassName}`}>
          <option value="">Any level</option>
          {["BEGINNER", "INTERMEDIATE", "ADVANCED"].map((item) => (
            <option key={item} value={item}>
              {difficultyLabel(item)}
            </option>
          ))}
        </select>

        <select value={answerStatus} onChange={(event) => setAnswerStatus(event.target.value)} className={`h-12 rounded-xl px-4 text-sm font-semibold ${controlClassName}`}>
          <option value="">All answers</option>
          <option value="answered">Answered</option>
          <option value="unanswered">Needs answer</option>
        </select>

        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className={`h-12 rounded-xl px-4 text-sm font-semibold ${controlClassName}`}>
          <option value="relevant">Relevant</option>
          <option value="latest">Latest</option>
          <option value="popular">Most voted</option>
          <option value="discussed">Most discussed</option>
        </select>

        <button type="submit" className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[image:var(--button-solid)] px-5 text-sm font-semibold text-primary-foreground shadow-xl transition hover:-translate-y-0.5 hover:opacity-95">
          Search
        </button>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Try:</span>
        {suggestions.slice(0, 6).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => quickSearch(item)}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm transition hover:border-primary/30 hover:text-primary"
          >
            {item}
          </button>
        ))}
      </div>

      {activeSummary.length ? (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Active:</span>
          {activeSummary.map((item) => (
            <span key={item} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
