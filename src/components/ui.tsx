import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/** Max-width centered content wrapper. */
export function Container({
  children,
  className = "",
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

/** Small pill label, e.g. an eyebrow above a heading. */
export function Badge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-muted ${className}`}
    >
      {children}
    </span>
  );
}

/** Centered eyebrow + title + subtitle block for section headers. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  as = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
}) {
  const Heading = as;
  const alignment =
    align === "center"
      ? "mx-auto text-center items-center"
      : "text-left items-start";
  return (
    <div className={`flex max-w-4xl flex-col gap-5 ${alignment}`}>
      {eyebrow ? (
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-strong">
          {eyebrow}
        </span>
      ) : null}
      <Heading className="text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl">
        {title}
      </Heading>
      {subtitle ? (
        <p className="max-w-2xl text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-strong text-brand-foreground hover:bg-brand shadow-[0_1px_0_0_rgba(255,255,255,0.22)_inset]",
  secondary:
    "border border-line-strong bg-surface-raised text-foreground hover:bg-surface-overlay",
  ghost: "text-foreground hover:bg-surface",
};

/** Link styled as a button. */
export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: { variant?: ButtonVariant } & ComponentProps<typeof Link>) {
  return (
    <Link
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${buttonStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
