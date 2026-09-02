"use client";

import { useSubjects } from "@/hooks/useSubjects";

/**
 * Chips for choosing which subjects the model can see.
 *
 * Selecting nothing is a first-class state, not an empty one: it's how you ask
 * a plain question without your plan attached.
 */
export function ContextPicker({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (ids: string[]) => void;
}) {
  const { data: subjects } = useSubjects();
  const active = (subjects ?? []).filter((s) => !s.isArchived);

  if (active.length === 0) return null;

  const toggle = (id: string) =>
    onChange(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);

  return (
    <div>
      {/* The label is a heading, not a chip: sharing the wrapping row with the
          chips orphaned it and started the chips a label-width inside the
          gutter the composer and the budget line sit on. */}
      <div className="lk-mono mb-1.5 text-[10.5px] uppercase tracking-[0.06em] text-muted-foreground">
        context
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
      {active.map((subject) => {
        const on = selected.includes(subject.id);
        return (
          <button
            key={subject.id}
            type="button"
            onClick={() => toggle(subject.id)}
            aria-pressed={on}
            className={`lk-mono max-w-[150px] truncate rounded-md border px-2 py-1 text-[10.5px] uppercase tracking-wide transition-colors ${
              on
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {subject.title}
          </button>
        );
      })}
      {selected.length > 0 && (
        <button
          type="button"
          onClick={() => onChange([])}
          className="lk-mono text-[10.5px] uppercase tracking-wide text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
        >
          none
        </button>
      )}
      </div>
    </div>
  );
}
