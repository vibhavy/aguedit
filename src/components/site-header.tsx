"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { ButtonLink, Container } from "@/components/ui";
import { headerNav, siteConfig } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/95 backdrop-blur-xl">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label={`${siteConfig.name} home`}>
          <Logo />
        </Link>
        <DesktopNav pathname={pathname} />
        <HeaderActions />
        <MobileToggle open={open} onClick={() => setOpen((value) => !value)} />
      </Container>
      {open ? (
        <MobileNav pathname={pathname} close={() => setOpen(false)} />
      ) : null}
    </header>
  );
}

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
      {headerNav.map(({ title, href }) => (
        <NavLink
          key={href}
          href={href}
          label={title}
          active={pathname.startsWith(href)}
        />
      ))}
    </nav>
  );
}

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`px-3 py-2 text-[13px] font-semibold transition-colors ${active ? "text-brand-strong" : "text-secondary hover:text-foreground"}`}
    >
      {label}
    </Link>
  );
}

function HeaderActions() {
  return (
    <div className="ml-auto hidden items-center gap-3 lg:flex">
      <Link
        href={siteConfig.socials.github}
        aria-label="AguEdit on GitHub"
        data-analytics-cta="view_github_repository"
        data-analytics-location="header"
        className="grid h-9 w-9 place-items-center border border-line text-secondary hover:border-line-strong hover:text-foreground"
      >
        <GithubIcon size={16} />
      </Link>
      <ButtonLink
        href="/download"
        data-analytics-cta="download_free"
        data-analytics-location="header"
        className="h-9 rounded-md px-4"
      >
        <Download size={15} /> Download Free
      </ButtonLink>
    </div>
  );
}

function MobileToggle({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Toggle menu"
      aria-expanded={open}
      className="grid h-10 w-10 place-items-center rounded-md border border-line text-foreground lg:hidden"
    >
      {open ? <X size={19} /> : <Menu size={19} />}
    </button>
  );
}

function MobileNav({
  pathname,
  close,
}: {
  pathname: string;
  close: () => void;
}) {
  return (
    <nav
      className="absolute left-0 right-0 top-full border-t border-line bg-background shadow-lg lg:hidden"
      aria-label="Mobile navigation"
    >
      <Container className="flex flex-col py-3">
        {headerNav.map(({ title, href }) => (
          <Link
            key={href}
            href={href}
            onClick={close}
            aria-current={pathname.startsWith(href) ? "page" : undefined}
            className="border-b border-line px-1 py-3 text-sm font-semibold"
          >
            {title}
          </Link>
        ))}
        <ButtonLink
          href="/download"
          onClick={close}
          data-analytics-cta="download_free"
          data-analytics-location="mobile_menu"
          className="mt-3 rounded-md"
        >
          <Download size={16} /> Download Free
        </ButtonLink>
      </Container>
    </nav>
  );
}
