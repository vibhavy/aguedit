import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

type PackageFile = {
  scripts: Record<string, string>;
};

function packageScripts() {
  const path = resolve(process.cwd(), "package.json");
  const packageFile = JSON.parse(readFileSync(path, "utf8")) as PackageFile;
  return packageFile.scripts;
}

describe("build scripts", () => {
  it("keeps OpenNext outside the build command that OpenNext invokes", () => {
    const scripts = packageScripts();

    expect(scripts.build).toBe("next build");
    expect(scripts["build:cloudflare"]).toBe("opennextjs-cloudflare build");
  });
});
