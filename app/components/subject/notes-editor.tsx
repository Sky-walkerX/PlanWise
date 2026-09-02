"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { EditorView, keymap } from "@codemirror/view";
import { Prec } from "@codemirror/state";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { useNoteCompletion } from "@/hooks/useNoteCompletion";
import { ghostCompletion } from "./ghost-completion";
import { Markdown } from "./markdown";

// Markdown notes editor: CodeMirror 6 with markdown syntax highlighting
// (fenced code blocks highlight in their own language), list auto-continue
// on Enter, and an Edit/Preview toggle rendered by the shared <Markdown>.
// Mod-Enter saves, Escape cancels.

// Same hex palettes as the `.hljs-*` rules in globals.css so code highlights
// identically while editing and in the rendered preview.
const PALETTES = {
  light: {
    heading: "#141414",
    link: "#1d4ed8",
    keyword: "#7c3aed",
    string: "#1a7f37",
    number: "#c2410c",
    fn: "#1d4ed8",
    type: "#0e7490",
    tagName: "#be123c",
    attr: "#9a3412",
    comment: "#8a8170",
    meta: "#7a7264",
    selection: "#e3dcc6",
  },
  dark: {
    heading: "#c0c6e0",
    link: "#7aa2f7",
    keyword: "#bb9af7",
    string: "#9ece6a",
    number: "#ff9e64",
    fn: "#7aa2f7",
    type: "#2ac3de",
    tagName: "#f7768e",
    attr: "#7dcfff",
    comment: "#565a70",
    meta: "#7aa2f7",
    selection: "#2a2e42",
  },
};

function lockinTheme(dark: boolean) {
  const c = dark ? PALETTES.dark : PALETTES.light;

  const theme = EditorView.theme(
    {
      "&": {
        backgroundColor: "transparent",
        fontSize: "13px",
        color: "var(--foreground)",
      },
      ".cm-content": {
        fontFamily: "var(--lk-font-code)",
        padding: "10px 12px",
        minHeight: "120px",
        caretColor: "var(--foreground)",
      },
      ".cm-scroller": {
        fontFamily: "var(--lk-font-code)",
        lineHeight: "1.6",
        maxHeight: "420px",
        overflow: "auto",
        fontVariantLigatures: "contextual", /* JetBrains Mono ligatures */
      },
      "&.cm-focused": { outline: "none" },
      ".cm-cursor": { borderLeftColor: "var(--foreground)" },
      "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
        { backgroundColor: c.selection },
      ".cm-placeholder": { color: "var(--muted-foreground)" },
    },
    { dark },
  );

  const highlight = HighlightStyle.define([
    // Markdown structure
    { tag: tags.heading, fontWeight: "700", color: c.heading },
    { tag: tags.strong, fontWeight: "700" },
    { tag: tags.emphasis, fontStyle: "italic" },
    { tag: tags.strikethrough, textDecoration: "line-through" },
    { tag: [tags.link, tags.url], color: c.link, textDecoration: "underline" },
    { tag: tags.monospace, fontFamily: "var(--lk-font-code)", color: c.attr },
    { tag: tags.quote, color: c.comment, fontStyle: "italic" },
    { tag: [tags.processingInstruction, tags.meta], color: c.meta },
    // Fenced code blocks
    { tag: tags.comment, color: c.comment, fontStyle: "italic" },
    { tag: [tags.keyword, tags.moduleKeyword, tags.controlKeyword, tags.operatorKeyword], color: c.keyword },
    { tag: [tags.string, tags.special(tags.string), tags.regexp], color: c.string },
    { tag: [tags.number, tags.bool, tags.null, tags.atom], color: c.number },
    { tag: [tags.function(tags.variableName), tags.function(tags.propertyName)], color: c.fn },
    { tag: [tags.typeName, tags.className, tags.standard(tags.variableName)], color: c.type },
    { tag: tags.tagName, color: c.tagName },
    { tag: [tags.attributeName, tags.propertyName], color: c.attr },
  ]);

  return [theme, syntaxHighlighting(highlight)];
}

// Smart URL paste: pasting an image URL inserts `![…](url)` (alt pre-selected
// for overtyping when text was selected); pasting any URL over selected text
// wraps it as a `[text](url)` link. Plain URL pastes fall through untouched.
// Pasting/dropping an actual image (e.g. a screenshot) uploads it to
// `POST /api/uploads` (Supabase Storage) behind a placeholder that swaps to
// the real `![image](url)` when the upload lands.
const URL_RE = /^https?:\/\/\S+$/;
const IMAGE_EXT_RE = /\.(png|jpe?g|gif|webp|svg|avif|bmp)$/i;
const UPLOAD_TYPES = new Set(["image/png", "image/jpeg", "image/gif", "image/webp"]);

async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/uploads", { method: "POST", body: fd, credentials: "include" });
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new Error(body?.error ?? "Upload failed");
  return body.url as string;
}

// Insert a placeholder at the selection, upload, then swap the placeholder for
// image markdown (or a visible failure note) wherever it sits by then. If the
// editor was closed or the placeholder deleted mid-upload, the swap is a no-op.
function insertImageFile(view: EditorView, file: File) {
  const token = Math.random().toString(36).slice(2, 8);
  const placeholder = `![uploading-${token}…]()`;
  const { from, to } = view.state.selection.main;
  view.dispatch({
    changes: { from, to, insert: placeholder },
    selection: { anchor: from + placeholder.length },
  });

  const swap = (replacement: string) => {
    if (!view.dom.isConnected) return;
    const idx = view.state.doc.toString().indexOf(placeholder);
    if (idx < 0) return;
    view.dispatch({ changes: { from: idx, to: idx + placeholder.length, insert: replacement } });
  };
  uploadImage(file).then(
    (url) => swap(`![image](${url})`),
    (err: Error) => swap(`*(image upload failed: ${err.message})*`),
  );
}

const smartPaste = EditorView.domEventHandlers({
  paste(event, view) {
    const file = Array.from(event.clipboardData?.files ?? []).find((f) =>
      UPLOAD_TYPES.has(f.type),
    );
    if (file) {
      event.preventDefault();
      insertImageFile(view, file);
      return true;
    }

    const text = event.clipboardData?.getData("text/plain").trim() ?? "";
    if (!URL_RE.test(text)) return false;
    const isImage = IMAGE_EXT_RE.test(text.split(/[?#]/)[0]);
    const { from, to } = view.state.selection.main;
    const selected = view.state.sliceDoc(from, to);
    if (!isImage && !selected) return false;

    event.preventDefault();
    const alt = selected || (isImage ? "image" : "");
    const insert = isImage ? `![${alt}](${text})` : `[${alt}](${text})`;
    const altFrom = from + (isImage ? 2 : 1);
    view.dispatch({
      changes: { from, to, insert },
      selection: isImage
        ? { anchor: altFrom, head: altFrom + alt.length }
        : { anchor: from + insert.length },
    });
    return true;
  },
  drop(event, view) {
    const file = Array.from(event.dataTransfer?.files ?? []).find((f) => UPLOAD_TYPES.has(f.type));
    if (!file) return false;
    event.preventDefault();
    const pos = view.posAtCoords({ x: event.clientX, y: event.clientY });
    if (pos != null) view.dispatch({ selection: { anchor: pos } });
    insertImageFile(view, file);
    return true;
  },
});

/** `/subjects/<uuid>` → the subject whose vocabulary should be suggested. */
function subjectIdFromPath(pathname: string | null): string | null {
  const match = pathname?.match(/^\/subjects\/([^/]+)/);
  return match ? match[1] : null;
}

export function NotesEditor({
  value,
  onSave,
  onCancel,
  saving = false,
  placeholder = "Notes — markdown supported…",
  autoFocus = true,
  breadcrumb = "",
}: {
  value: string;
  onSave: (draft: string) => void;
  onCancel: () => void;
  saving?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  /** What these notes are attached to, e.g. a milestone or task title. Only
   *  the model tier uses it, to keep a continuation on topic. */
  breadcrumb?: string;
}) {
  const [draft, setDraft] = useState(value);
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  const pathname = usePathname();
  const { vocabulary, requestModel, modelPending, setModelPending } = useNoteCompletion(
    subjectIdFromPath(pathname),
    breadcrumb,
  );
  const onModelPending = useCallback((pending: boolean) => setModelPending(pending), [setModelPending]);

  // Refs so the (memoized) keymap always sees current values.
  const draftRef = useRef(draft);
  draftRef.current = draft;
  const onSaveRef = useRef(onSave);
  onSaveRef.current = onSave;
  const onCancelRef = useRef(onCancel);
  onCancelRef.current = onCancel;

  const extensions = useMemo(
    () => [
      // codeLanguages lets ```cpp / ```py fences highlight their contents;
      // the markdown keymap auto-continues lists/quotes on Enter.
      markdown({ base: markdownLanguage, codeLanguages: languages }),
      EditorView.lineWrapping,
      smartPaste,
      // Reads the vocabulary through a getter, so a refetch lands without
      // rebuilding the extensions — which would reset the undo history.
      ghostCompletion({ vocabulary, requestModel, onModelPending }),
      Prec.high(
        keymap.of([
          {
            key: "Mod-Enter",
            run: () => {
              onSaveRef.current(draftRef.current);
              return true;
            },
          },
          {
            key: "Escape",
            run: () => {
              onCancelRef.current();
              return true;
            },
          },
        ]),
      ),
      ...lockinTheme(dark),
    ],
    [dark, vocabulary, requestModel, onModelPending],
  );

  const tabBtn = (t: "edit" | "preview", label: string) => (
    <button
      type="button"
      onClick={() => setTab(t)}
      className={`lk-mono rounded px-2 py-0.5 text-[10px] uppercase tracking-wide transition-colors ${
        tab === t ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        {tabBtn("edit", "Edit")}
        {tabBtn("preview", "Preview")}
        <span className="lk-mono ml-auto hidden text-[9px] text-muted-foreground sm:inline">
          {modelPending ? (
            <span className="lk-ghost-pending">⌃␣ thinking…</span>
          ) : (
            <>⇥ complete · ⌃␣ ask model · ⌘↩ save</>
          )}
        </span>
      </div>

      {tab === "edit" ? (
        <div className="overflow-hidden rounded-md border border-input">
          <CodeMirror
            value={draft}
            onChange={setDraft}
            extensions={extensions}
            autoFocus={autoFocus}
            placeholder={placeholder}
            theme="none"
            basicSetup={{
              lineNumbers: false,
              foldGutter: false,
              highlightActiveLine: false,
              highlightActiveLineGutter: false,
              autocompletion: false,
            }}
          />
        </div>
      ) : (
        <div className="rounded-md bg-muted/40 p-2.5">
          {draft.trim() ? (
            <Markdown>{draft}</Markdown>
          ) : (
            <p className="text-xs text-muted-foreground">Nothing to preview yet.</p>
          )}
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onSave(draft)}
          disabled={saving}
          className="lk-btn px-2.5 py-1 text-[10px] disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save notes"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="lk-mono text-[10px] uppercase tracking-wide text-muted-foreground hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
