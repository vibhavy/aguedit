import { JsonLd } from "@/components/json-ld";
import { NativeHome } from "@/components/native-home";
import { buildMetadata, softwareApplicationJsonLd } from "@/lib/seo";
import styles from "./home-scroll.module.css";

export const metadata = buildMetadata({
  title: "Multiple Coding Agents, One Conversation",
  path: "/",
  description:
    "Use Claude Code, Codex, Antigravity, Cursor, and custom Responses-compatible models in one local developer conversation without losing project context.",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd()} />
      <div className={styles.scrollPage}>
        <NativeHome />
      </div>
    </>
  );
}
