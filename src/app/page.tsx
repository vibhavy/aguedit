import { JsonLd } from "@/components/json-ld";
import { ProductFirstHome } from "@/components/product-first-home";
import { buildMetadata, softwareApplicationJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI-powered code editor for Claude Code and Codex",
  path: "/",
  description:
    "Edit code, use multiple coding agents, hand work between them, review Git changes, plan tasks, and run commands in AguEdit.",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd()} />
      <ProductFirstHome />
    </>
  );
}
