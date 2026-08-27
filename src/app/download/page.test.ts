import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync(new URL("./page.tsx", import.meta.url), "utf8");

describe("unsigned macOS download guidance", () => {
  it("documents the complete first-launch approval without claiming notarization", () => {
    expect(source).toContain("First launch requires one macOS approval");
    expect(source).toContain("ad-hoc signed");
    expect(source).toContain("System Settings → Privacy &amp; Security");
    expect(source).toContain("Open Anyway");
    expect(source).toContain("Subsequent launches");
    expect(source).not.toContain("Signed and notarized for macOS");
    expect(source).not.toContain("Public releases use Developer ID signing");
  });
});
