"use client";

import Link from "next/link";
import { useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { ButtonLink, Container } from "@/components/ui";
import { mainNav, siteConfig } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-nav-shell">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Container className="site-nav">
        <Link href="/" aria-label={`${siteConfig.name} home`}>
          <Logo />
        </Link>

        <nav className="site-nav__links" aria-label="Primary">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="site-nav__link"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="site-nav__actions">
          <Link
            href={siteConfig.socials.github}
            aria-label="GitHub repository"
            className="site-nav__icon"
          >
            <GithubIcon size={16} />
          </Link>
          <ButtonLink
            href="/download"
            data-analytics-location="header"
            className="site-nav__download"
          >
            <Download size={16} /> Download
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="site-nav__menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </Container>

      {open ? (
        <div className="site-nav__mobile">
          <Container className="flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-surface"
              >
                {item.title}
              </Link>
            ))}
            <ButtonLink
              href="/download"
              data-analytics-location="mobile_menu"
              className="mt-2"
              onClick={() => setOpen(false)}
            >
              <Download size={16} /> Download
            </ButtonLink>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
