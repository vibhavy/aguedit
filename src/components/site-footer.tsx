import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnalyticsSettingsButton } from "@/components/google-analytics";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui";
import { footerNav, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-foreground text-background">
      <Container className="grid gap-14 py-16 md:grid-cols-[1.15fr_1.85fr] md:py-20">
        <FooterStatement />
        <FooterLinks />
      </Container>
      <FooterLegal />
    </footer>
  );
}

function FooterStatement() {
  return (
    <div className="flex max-w-sm flex-col items-start gap-5">
      <Logo className="[&>span]:!text-background [&>span>span]:!text-brand" />
      <p className="text-sm leading-6 text-background/60">
        {siteConfig.footerDescription}
      </p>
      <Link
        href={siteConfig.socials.github}
        className="inline-flex items-center gap-2 text-sm font-semibold hover:text-brand"
      >
        GitHub repository <ArrowUpRight size={15} />
      </Link>
    </div>
  );
}

function FooterLinks() {
  return (
    <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
      {footerNav.map((group) => (
        <FooterGroup key={group.title} group={group} />
      ))}
    </div>
  );
}

function FooterGroup({ group }: { group: (typeof footerNav)[number] }) {
  return (
    <div>
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-brand">
        {group.title}
      </p>
      <ul className="mt-5 flex flex-col gap-3">
        {group.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-background/60 hover:text-background"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterLegal() {
  return (
    <div className="border-t border-background/15">
      <Container className="flex flex-col gap-3 py-6 text-xs text-background/50 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Powered by{" "}
          <a
            href="https://aigoco.com"
            target="_blank"
            rel="noreferrer"
            className="text-background hover:text-brand"
          >
            AIGOCO
          </a>
          .
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <p>Local project memory. No AguEdit account.</p>
          <AnalyticsSettingsButton />
          <p className="whitespace-nowrap text-background/70">
            Made by {siteConfig.name} with{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>
          </p>
        </div>
      </Container>
    </div>
  );
}
