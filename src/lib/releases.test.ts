import { afterEach, describe, expect, it, vi } from "vitest";

const githubRelease = {
  tag_name: "v1.0.0",
  name: "AguEdit v1.0.0",
  body: "First release.",
  published_at: "2026-08-12T08:54:33Z",
  html_url: "https://github.com/example/releases/tag/v1.0.0",
  assets: [
    {
      name: "AguEdit_1.0.0_aarch64.dmg",
      browser_download_url: "https://github.com/example/download/app.dmg",
      size: 42,
    },
  ],
};

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("getLatestRelease", () => {
  it("uses the API as the current release source", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(githubRelease));
    vi.stubGlobal("fetch", fetchMock);
    const { getLatestRelease } = await freshModule();

    await expect(getLatestRelease()).resolves.toMatchObject({
      version: "1.0.0",
    });
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock.mock.calls[0][0]).toContain("api.github.com");
  });

  it("falls back to the durable snapshot during an API outage", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({}, 503))
      .mockResolvedValueOnce(jsonResponse(githubRelease));
    vi.stubGlobal("fetch", fetchMock);
    const { getLatestRelease } = await freshModule();

    await expect(getLatestRelease()).resolves.toMatchObject({
      version: "1.0.0",
    });
    expect(fetchMock.mock.calls[1][0]).toContain("raw.githubusercontent.com");
  });

  it("keeps the last successful release during a later outage", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(githubRelease))
      .mockRejectedValueOnce(new Error("API offline"))
      .mockResolvedValueOnce(jsonResponse({}, 503));
    vi.stubGlobal("fetch", fetchMock);
    const { getLatestRelease } = await freshModule();

    const first = await getLatestRelease();
    await expect(getLatestRelease()).resolves.toEqual(first);
  });

  it("reports an upstream failure instead of claiming no release exists", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({}, 503)));
    const { getLatestRelease, ReleaseUnavailableError } = await freshModule();

    await expect(getLatestRelease()).rejects.toBeInstanceOf(
      ReleaseUnavailableError,
    );
  });

  it("returns null only when GitHub authoritatively reports no release", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}, 404));
    vi.stubGlobal("fetch", fetchMock);
    const { getLatestRelease } = await freshModule();

    await expect(getLatestRelease()).resolves.toBeNull();
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("filters unsupported Intel and universal macOS assets", async () => {
    const assets = [
      ...githubRelease.assets,
      asset("AguEdit_1.0.0_x64.dmg"),
      asset("AguEdit_1.0.0_universal.dmg"),
    ];
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse({ ...githubRelease, assets })),
    );
    const { getLatestRelease } = await freshModule();

    const release = await getLatestRelease();
    expect(release?.assets.map((entry) => entry.slug)).toEqual(["mac-aarch64"]);
  });

  it("never falls back from a known unsupported architecture", async () => {
    const { pickAsset } = await freshModule();
    const release = {
      version: "1.0.0",
      name: "AguEdit v1.0.0",
      notes: "",
      pubDate: "2026-08-12T08:54:33Z",
      url: "https://github.com/example/releases/tag/v1.0.0",
      assets: [
        {
          slug: "mac-aarch64",
          os: "mac" as const,
          arch: "aarch64",
          label: "macOS (Apple Silicon)",
          ext: "dmg",
          url: "https://github.com/example/download/app.dmg",
        },
      ],
    };

    expect(pickAsset(release, "mac", "x86_64")).toBeUndefined();
    expect(pickAsset(release, "mac", "aarch64")?.slug).toBe("mac-aarch64");
  });
});

function asset(name: string) {
  return {
    name,
    browser_download_url: `https://github.com/example/download/${name}`,
    size: 42,
  };
}

function jsonResponse(value: unknown, status = 200): Response {
  return new Response(JSON.stringify(value), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function freshModule() {
  vi.resetModules();
  return import("./releases");
}
