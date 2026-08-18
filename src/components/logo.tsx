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
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      {withWordmark ? <Wordmark /> : null}
    </span>
  );
}

function Wordmark() {
  return (
    <span className="text-[17px] font-semibold tracking-[-0.035em]">
      Agu<span className="text-muted">Edit</span>
    </span>
  );
}

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <Image
      src="/aguedit-icon.png"
      width={size}
      height={size}
      sizes={`${size}px`}
      alt={`${siteConfig.name} logo`}
      className="shrink-0 rounded-[22%]"
    />
  );
}
