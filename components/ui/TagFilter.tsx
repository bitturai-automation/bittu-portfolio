"use client";
import { tagCounts, type Project, type Tag } from "@/lib/data";

/** Small read-only list of a project's tags (cards and detail view). */
export function TagList({ tags, className = "", inline = false }: { tags: readonly string[]; className?: string; inline?: boolean }) {
  if (!tags.length) return null;
  /* inline = spans only, so it can sit inside a <button> (cards) */
  return inline
    ? <span className={`tg ${className}`}><span className="sr">Tags: </span>{tags.map((t) => <b key={t}>{t}</b>)}</span>
    : <ul className={`tg ${className}`} aria-label="Project tags">{tags.map((t) => <li key={t}>{t}</li>)}</ul>;
}

/** Filter bar: one toggle per tag that exists in `items` (with a count), plus "All". Controlled by the parent. */
export default function TagFilter({ items, value, onChange, label = "Filter projects by type", total }: {
  items: Project[]; value: Tag | null; onChange: (t: Tag | null) => void; label?: string; total?: number;
}) {
  const tags = tagCounts(items);
  if (tags.length < 2) return null;
  return (
    <div className="tf" role="group" aria-label={label}>
      <button type="button" className="tf-b" aria-pressed={value === null} onClick={() => onChange(null)}>All <em>{total ?? items.length}</em></button>
      {tags.map(({ tag, count }) => (
        <button type="button" key={tag} className="tf-b" aria-pressed={value === tag} onClick={() => onChange(value === tag ? null : tag)}>{tag} <em>{count}</em></button>
      ))}
    </div>
  );
}
