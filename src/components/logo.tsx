import Image from "next/image";
import { siteConfig } from "@/lib/site";

export function Logo({
  className = "",
  withWordmark = true,
  size = 34,
}: {
  className?: string;
  withWordmark?: boolean;
  size?: number;
}) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      {withWordmark ? <Wordmark /> : <LogoMark size={size} />}
    </span>
  );
}

function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={30} decorative />
      <span className="text-[17px] font-bold tracking-[-0.04em] text-foreground">
        AguEdit
      </span>
    </span>
  );
}

export function LogoMark({
  size = 34,
  decorative = false,
}: {
  size?: number;
  decorative?: boolean;
}) {
  return (
    <Image
      src="/aguedit-icon.png"
      width={size}
      height={size}
      sizes={`${size}px`}
      alt={decorative ? "" : `${siteConfig.name} logo`}
      className="shrink-0 rounded-[22%]"
    />
  );
}
