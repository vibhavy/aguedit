import { describe, expect, it } from "vitest";
import { detectPlatform } from "./os";

describe("detectPlatform", () => {
  it("does not mistake the frozen macOS Intel token for real architecture", () => {
    const platform = detectPlatform(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15",
    );

    expect(platform).toEqual({
      os: "mac",
      arch: "aarch64",
      label: "macOS (Apple Silicon)",
    });
  });
});
