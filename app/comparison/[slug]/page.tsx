import type { Metadata } from "next"
import ComparisonClientPage from "./ComparisonClientPage"
import { getComparisonBySlug, getAllComparisonSlugs } from "@/lib/comparisons-data"

export async function generateStaticParams() {
  const slugs = await getAllComparisonSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const comparison = await getComparisonBySlug(params.slug)

  if (!comparison) {
    return {
      title: "Comparison Not Found",
    }
  }

  return {
    title: `${comparison.title} | Products VS`,
    description: comparison.description,
    openGraph: {
      title: comparison.title,
      description: comparison.description,
      type: "article",
    },
  }
}

export default function ComparisonPage({ params }: { params: { slug: string } }) {
  return <ComparisonClientPage params={params} />
}
