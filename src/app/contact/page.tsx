import {
  ArrowUpRight,
  Heart,
  KeyRound,
  Mail,
  Monitor,
  NotebookPen,
} from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import styles from "./contact.module.css";

export const metadata = buildMetadata({
  title: "Contact AguEdit Support",
  path: "/contact",
  description:
    "Contact AguEdit support by email for help with installation, agent setup, project workflows, and the desktop application.",
  keywords: ["AguEdit support", "AguEdit contact", "coding agent help"],
});

const supportHref = `mailto:${siteConfig.supportEmail}?subject=AguEdit%20support%20request`;
const personalHref = `mailto:${siteConfig.personalEmail}?subject=Hello`;

const emailNotes = [
  {
    icon: NotebookPen,
    title: "What happened",
    description:
      "Describe what you were trying to do and where it stopped working.",
  },
  {
    icon: Monitor,
    title: "Your environment",
    description:
      "Include your AguEdit version, operating system, and connected agent.",
  },
  {
    icon: KeyRound,
    title: "Keep secrets out",
    description:
      "Remove API keys, access tokens, credentials, and private project data.",
  },
] as const;

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])}
      />
      <ContactHero />
      <EmailGuide />
    </div>
  );
}

function ContactHero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.heroGrid}>
          <div>
            <h1>Tell us where you&apos;re stuck.</h1>
          </div>
          <div className={styles.contactBlock}>
            <p>
              For installation questions, setup problems, or product feedback,
              email AguEdit support directly.
            </p>
            <div className={styles.contactMethods}>
              <a
                className={styles.supportLink}
                href={supportHref}
                data-analytics-cta="email_support"
                data-analytics-location="contact_hero"
              >
                <Mail size={17} aria-hidden="true" />
                <span>
                  <strong>Email support</strong>
                  <span>{siteConfig.supportEmail}</span>
                </span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <a
                className={styles.helloLink}
                href={personalHref}
                data-analytics-cta="email_founder"
                data-analytics-location="contact_hero"
              >
                <Heart size={17} aria-hidden="true" />
                <span>
                  <strong>If you just want to say hi</strong>
                  <span>{siteConfig.personalEmail}</span>
                </span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function EmailGuide() {
  return (
    <section className={styles.guide}>
      <Container className={styles.guideGrid}>
        <div className={styles.guideHeading}>
          <h2>Give us enough context to understand the issue.</h2>
        </div>
        <ol className={styles.notes}>
          {emailNotes.map((note) => (
            <li key={note.title}>
              <note.icon size={17} aria-hidden="true" />
              <div>
                <h3>{note.title}</h3>
                <p>{note.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
