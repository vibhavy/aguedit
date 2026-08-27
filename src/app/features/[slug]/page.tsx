import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { JsonLd } from "@/components/json-ld";
import { FeaturePageBody } from "@/components/feature-pages";
import { featurePages } from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

/** One statically-generated page per feature. */
export function generateStaticParams() {
  return featurePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/features/[slug]">) {
  const { slug } = await params;
  const page = featurePages.find((item) => item.slug === slug);
  if (!page) {
    return buildMetadata({ title: "Feature", path: "/features" });
  }
  return buildMetadata({
    title: page.kicker,
    path: `/features/${page.slug}`,
    description: page.lede,
  });
}

export default async function FeatureDetailPage({
  params,
}: PageProps<"/features/[slug]">) {
  const { slug } = await params;
  const page = featurePages.find((item) => item.slug === slug);
  if (!page) notFound();

  return (
    <article
      className="fp"
      style={{ "--fp-accent": page.accent } as CSSProperties}
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Features", path: "/features" },
          { name: page.kicker, path: `/features/${page.slug}` },
        ])}
      />
      <FeaturePageBody page={page} />
    </article>
  );
}
