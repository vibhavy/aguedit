import { readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const recommendedSource = readFileSync(
  new URL("./download-button.tsx", import.meta.url),
  "utf8",
);
const assetSource = readFileSync(
  new URL("./asset-download.tsx", import.meta.url),
  "utf8",
);

describe("download analytics attributes", () => {
  it("names and locates every literal download CTA", () => {
    const tags = sourceFiles(new URL("../", import.meta.url)).flatMap((source) =>
      [
        ...source.matchAll(
          /<(?:Link|ButtonLink)\b[^>]*href="\/download"[^>]*>/gs,
        ),
      ].map(([tag]) => tag),
    );

    expect(tags.length).toBeGreaterThan(0);
    tags.forEach((tag) => {
      expect(tag).toContain("data-analytics-cta=");
      expect(tag).toContain("data-analytics-location=");
    });
  });

  it("marks the recommended download as a CTA and file download", () => {
    expect(recommendedSource).toContain('data-analytics-cta="download_free"');
    expect(recommendedSource).toContain(
      'data-analytics-location="download_recommended"',
    );
    expect(recommendedSource).toContain("data-analytics-download-slug={slug");
  });

  it("marks release assets with stable download dimensions", () => {
    expect(assetSource).toContain(
      'data-analytics-cta="download_release_asset"',
    );
    expect(assetSource).toContain(
      'data-analytics-download-surface="release_asset"',
    );
    expect(assetSource).toContain(
      "data-analytics-download-extension={asset.ext",
    );
  });
});

function sourceFiles(directory: URL): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const url = new URL(entry.name, directory);
    if (entry.isDirectory()) {
      return sourceFiles(new URL(`${entry.name}/`, directory));
    }
    if (!entry.name.endsWith(".tsx") || entry.name.endsWith(".test.tsx")) {
      return [];
    }
    return [readFileSync(url, "utf8")];
  });
}
