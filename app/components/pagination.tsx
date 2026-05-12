"use client";

import { ChevronDownIcon } from "./icons";

type Props = {
  currentPage: number;       // 1-indexed
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1.5 pt-2"
    >
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        ariaLabel="Previous page"
      >
        <ChevronDownIcon className="h-4 w-4 rotate-90" />
      </PageButton>

      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className="px-2 text-slate-400 dark:text-slate-500 select-none"
          >
            …
          </span>
        ) : (
          <PageButton
            key={p}
            onClick={() => onPageChange(p)}
            active={p === currentPage}
            ariaLabel={`Page ${p}`}
          >
            {p}
          </PageButton>
        )
      )}

      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        ariaLabel="Next page"
      >
        <ChevronDownIcon className="h-4 w-4 -rotate-90" />
      </PageButton>
    </nav>
  );
}

function PageButton({
  children,
  onClick,
  active = false,
  disabled = false,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={active ? "page" : undefined}
      className={[
        "min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium",
        "inline-flex items-center justify-center",
        "transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-teal-400/40",
        active
          ? "bg-teal-700 text-white dark:bg-teal-600"
          : [
              "bg-white dark:bg-slate-900",
              "border border-slate-200 dark:border-slate-700",
              "text-slate-700 dark:text-slate-200",
              "hover:bg-slate-50 dark:hover:bg-slate-800",
              "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-slate-900",
            ].join(" "),
      ].join(" ")}
    >
      {children}
    </button>
  );
}

/**
 * Build a compact page list, e.g.:
 *   total=13, current=7  →  [1, "…", 6, 7, 8, "…", 13]
 *   total=5,  current=2  →  [1, 2, 3, 4, 5]
 */
function getPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("…");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("…");
  pages.push(total);
  return pages;
}