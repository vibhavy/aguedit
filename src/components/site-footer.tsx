import Link from "next/link";
import { GithubIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui";
import { footerNav, siteConfig } from "@/lib/site";
import { AnalyticsSettingsButton } from "@/components/google-analytics";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface/60">
      <Container className="grid gap-10 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm leading-6 text-muted">
            {siteConfig.footerDescription}
          </p>
          <Link
            href={siteConfig.socials.github}
            className="inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <GithubIcon size={15} /> Star on GitHub
          </Link>
        </div>

        {footerNav.map((group) => (
          <div key={group.title} className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-foreground">
              {group.title}
            </p>
            <ul className="flex flex-col gap-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-sm text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Built for developers who use more than one agent.
          </p>
          <div className="flex items-center gap-4">
            <p>Your project memory stays local and inspectable.</p>
            <AnalyticsSettingsButton />
          </div>
        </Container>
      </div>
    </footer>
  );
}
