"use client";

import { StateEffect, StateField, Prec, type Extension } from "@codemirror/state";
import { Decoration, EditorView, WidgetType, keymap } from "@codemirror/view";
import { completeAt } from "@/lib/notes/complete";

/**
 * Inline ghost text for the notes editor.
 *
 * Two sources feed one presentation. The local one runs on every keystroke
 * against the user's own vocabulary and is free (`lib/notes/complete.ts`). The
 * model one runs only when asked for, because a local model costs a second or
 * two and holds the GPU while it does.
 *
 * The interaction rule that matters: a suggestion never consumes a keystroke
 * the user meant for the document. Tab and Escape act on it, everything else
 * ignores it and it quietly disappears.
 */

export type Ghost = {
  /** Where the suggestion would be inserted. */
  from: number;
  text: string;
  source: "local" | "model";
};

/** Replaces the current suggestion, or clears it with null. */
export const setGhost = StateEffect.define<Ghost | null>();

class GhostWidget extends WidgetType {
  constructor(private readonly text: string, private readonly source: Ghost["source"]) {
    super();
  }

  // Without this, CodeMirror rebuilds the widget's DOM on every keystroke and
  // the ghost visibly flickers as it's replaced with an identical copy.
  eq(other: GhostWidget) {
    return other.text === this.text && other.source === this.source;
  }

  toDOM() {
    const span = document.createElement("span");
    span.className = `lk-ghost${this.source === "model" ? " lk-ghost-model" : ""}`;
    span.textContent = this.text;
    // The suggestion is decoration, not content: a screen reader announcing it
    // mid-sentence would read the note wrong.
    span.setAttribute("aria-hidden", "true");
    return span;
  }

  ignoreEvent() {
    return false;
  }
}

/**
 * The live suggestion.
 *
 * Recomputed inside the field rather than from an update listener, because a
 * listener can't dispatch synchronously and a suggestion that lands one frame
 * late is a suggestion that flickers.
 */
function ghostField(getVocabulary: () => string[]) {
  return StateField.define<Ghost | null>({
    create: () => null,

    update(current, tr) {
      // An explicit set (the model path, or a dismissal) wins outright.
      for (const effect of tr.effects) {
        if (effect.is(setGhost)) return effect.value;
      }

      // Any edit or cursor move invalidates what was showing. Recomputing the
      // local suggestion here means the common case never round-trips.
      if (tr.docChanged || tr.selection) {
        const { state } = tr;
        const range = state.selection.main;
        if (!range.empty) return null;

        const text = completeAt(state.doc.toString(), range.head, getVocabulary());
        return text ? { from: range.head, text, source: "local" } : null;
      }

      return current;
    },

    provide: (field) =>
      EditorView.decorations.from(field, (ghost) =>
        ghost
          ? Decoration.set([
              Decoration.widget({ widget: new GhostWidget(ghost.text, ghost.source), side: 1 }).range(ghost.from),
            ])
          : Decoration.none,
      ),
  });
}

/** Writes the suggestion into the document and puts the cursor after it. */
function acceptGhost(view: EditorView, field: StateField<Ghost | null>): boolean {
  const ghost = view.state.field(field);
  if (!ghost) return false;

  view.dispatch({
    changes: { from: ghost.from, insert: ghost.text },
    selection: { anchor: ghost.from + ghost.text.length },
    effects: setGhost.of(null),
    userEvent: "input.complete",
  });
  return true;
}

export type GhostOptions = {
  /** Read at match time so a refetched vocabulary applies without rebuilding
   *  the editor's extensions. */
  vocabulary: () => string[];
  /** Asks the model for a continuation at `pos`. Resolves null when it can't
   *  run — the engine is busy, no model is configured, the request failed. */
  requestModel?: (doc: string, pos: number) => Promise<string | null>;
  /** Told when a model request starts and stops, for the editor's status line. */
  onModelPending?: (pending: boolean) => void;
};

export function ghostCompletion({ vocabulary, requestModel, onModelPending }: GhostOptions): Extension {
  const field = ghostField(vocabulary);

  const requestFromModel = (view: EditorView): boolean => {
    if (!requestModel) return false;

    const pos = view.state.selection.main.head;
    const doc = view.state.doc.toString();
    onModelPending?.(true);

    void requestModel(doc, pos)
      .then((text) => {
        // The user kept typing while the model thought, so this suggestion is
        // for a document that no longer exists.
        const moved = view.state.selection.main.head !== pos || view.state.doc.toString() !== doc;
        if (!text || moved || !view.dom.isConnected) return;
        view.dispatch({ effects: setGhost.of({ from: pos, text, source: "model" }) });
      })
      .catch(() => {
        // Autocomplete is a convenience; a failure is silence, not an error.
      })
      .finally(() => onModelPending?.(false));

    return true;
  };

  return [
    field,

    // Above the default keymaps so Tab completes instead of indenting, but
    // only while a suggestion is actually showing — `acceptGhost` returns
    // false otherwise and the keypress falls through untouched.
    Prec.highest(
      keymap.of([
        { key: "Tab", run: (view) => acceptGhost(view, field) },
        {
          key: "Escape",
          run: (view) => {
            if (!view.state.field(field)) return false;
            view.dispatch({ effects: setGhost.of(null) });
            return true;
          },
        },
        // Ctrl-Space, not Mod-Space: CodeMirror maps Mod to Cmd on macOS,
        // where Cmd-Space is Spotlight. Ctrl-Space is also the completion
        // key most editors already use.
        { key: "Ctrl-Space", run: requestFromModel, preventDefault: true },
      ]),
    ),
  ];
}
