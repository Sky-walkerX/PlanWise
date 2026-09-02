/**
 * Who currently owns the local model.
 *
 * WebLLM runs one engine in one worker, so a note completion asked for while
 * a chat reply is streaming doesn't run alongside it — it queues behind it,
 * and a local 1.7B model can hold that queue for twenty seconds. Ghost text
 * that lands twenty seconds after the keystroke is worse than no ghost text,
 * so autocomplete checks this first and declines rather than waiting.
 *
 * A plain module-level flag rather than a real mutex: there is one JS context
 * per tab, the only contended resource is the GPU, and nothing here needs to
 * queue — the whole point is that the loser gives up immediately.
 *
 * Local-server providers (Ollama, LM Studio) have no such constraint, so
 * `holdsLock` is only ever consulted on the WebLLM path.
 */

export type LockHolder = "chat" | "completion";

let holder: LockHolder | null = null;

export function isEngineBusy(): boolean {
  return holder !== null;
}

export function engineHolder(): LockHolder | null {
  return holder;
}

/**
 * Takes the lock if it's free. Returns a release function on success and null
 * when someone else holds it. Releasing twice is a no-op, and releasing a lock
 * that was already taken over by someone else leaves theirs alone.
 */
export function acquireEngine(who: LockHolder): (() => void) | null {
  if (holder !== null) return null;
  holder = who;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (holder === who) holder = null;
  };
}
