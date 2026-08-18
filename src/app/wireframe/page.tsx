import type { Metadata } from "next";
import { ProductFirstHome } from "@/components/product-first-home";

export const metadata: Metadata = {
  title: "Homepage wireframe | AguEdit",
  robots: { index: false, follow: false },
};

export default function WireframePage() {
  return <ProductFirstHome showNotice />;
}
