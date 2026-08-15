/**
 * Build a `"col" = $1, "col2" = $2` SET clause plus its ordered values,
 * skipping undefined entries. Returns null when there is nothing to set.
 *
 * Used by the update routes, which fold their ownership check into the
 * statement's WHERE and return the new row with RETURNING — one round trip
 * instead of a read-then-write pair. (Prisma's `updateManyAndReturn` emits the
 * same SQL but wraps it in BEGIN/COMMIT, costing three.)
 *
 * Deliberately plain strings rather than `Prisma.sql` fragments: under Turbopack
 * the generated client can be loaded as two module instances, so a fragment
 * built in this file fails the `instanceof Sql` check inside a `$queryRaw`
 * template in a route and gets bound as a parameter (`SET $1`) instead of
 * inlined. Numbered placeholders sidestep that entirely.
 *
 * Column names are interpolated as identifiers, so callers must pass keys from
 * a validated allowlist — every caller spreads a parsed Zod object. Values are
 * always parameterised, never interpolated.
 */
export function setClause(
  data: Record<string, unknown>,
  startIndex = 1,
): { clause: string; values: unknown[] } | null {
  const cols = Object.keys(data).filter((k) => data[k] !== undefined);
  if (cols.length === 0) return null;
  return {
    clause: cols
      .map((c, i) => `"${c.replace(/[^A-Za-z0-9_]/g, "")}" = $${startIndex + i}`)
      .join(", "),
    values: cols.map((c) => data[c]),
  };
}
