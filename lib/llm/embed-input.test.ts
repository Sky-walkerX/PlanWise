import { describe, expect, it } from "vitest";
import { buildEmbedInput, QUERY_PREFIX } from "./embed-input";

describe("buildEmbedInput", () => {
  it("applies the search prefix on the query path", () => {
    expect(buildEmbedInput("what should I revise next", "query")).toBe(
      `${QUERY_PREFIX} what should I revise next`,
    );
  });

  it("leaves the passage path unprefixed", () => {
    expect(buildEmbedInput("Paging vs segmentation.", "passage")).toBe("Paging vs segmentation.");
  });
});
