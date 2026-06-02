"use client";

import { searchIndex, type SearchEntry } from "@/lib/search-index";

// Tiny matcher — searches name + slug + keywords. No deps, runs only while typing.
function search(query: string, limit = 6): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const score = (e: SearchEntry) => {
    const fields = [
      e.name.toLowerCase(),
      e.slug.toLowerCase(),
      ...(e.keywords ?? []).map((k) => k.toLowerCase()),
    ];
    let best = 0;
    for (const f of fields) {
      if (f === q) best = Math.max(best, 100);
      else if (f.startsWith(q)) best = Math.max(best, 60);
      else if (f.includes(q)) best = Math.max(best, 20);
    }
    return best;
  };

  return searchIndex
    .map((e) => ({ e, s: score(e) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((r) => r.e);
}

export default function SearchResults({
  query,
  onSelect,
}: {
  query: string;
  onSelect: (slug: string) => void;
}) {
  if (!query.trim()) return null;
  const results = search(query);

  return (
    <div className="mt-2 max-h-72 overflow-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
      {results.length === 0 ? (
        <p className="px-4 py-3 text-sm text-gray-400">No results for &ldquo;{query}&rdquo;</p>
      ) : (
        results.map((r) => (
          <button
            key={r.slug}
            type="button"
            onClick={() => onSelect(r.slug)}
            className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-teal-50 hover:text-teal-700"
          >
            <span className="font-medium">{r.name}</span>
            <span className="truncate text-xs text-gray-400">{r.slug}</span>
          </button>
        ))
      )}
    </div>
  );
}