import type { Metadata } from "next"
import PageLayout from "@/components/page-layout"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"

export const metadata: Metadata = {
  title: "All Comparisons - Products VS",
  description:
    "Browse all product and service comparisons. Technology, entertainment, lifestyle, and more. Make informed decisions with detailed analysis.",
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function getComparisons() {
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name_en")

  const { data: comparisons } = await supabase
    .from("comparisons")
    .select("*")
    .eq("is_published", true)
    .order("view_count", { ascending: false })

  const categoriesWithComparisons = categories?.map((category) => ({
    id: category.slug,
    name: category.name_en,
    icon: getCategoryIcon(category.slug),
    comparisons:
      comparisons
        ?.filter((comp) => comp.category_id === category.id)
        .map((comp) => ({
          slug: comp.slug,
          title: comp.title_en,
          description: comp.meta_description_en,
          views: formatViews(comp.view_count),
        })) || [],
  }))

  return categoriesWithComparisons || []
}

function getCategoryIcon(slug: string): string {
  const icons: Record<string, string> = {
    streaming: "🎬",
    tech: "📱",
    travel: "✈️",
    lifestyle: "🏃",
    shopping: "🛒",
  }
  return icons[slug] || "📁"
}

function formatViews(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}

export default async function EnglishComparisonsPage() {
  const categories = await getComparisons()

  return (
    <PageLayout currentPath="/en" locale="en">
      <section className="hero-section" style={{ padding: "60px 0", textAlign: "center" }}>
        <div className="container">
          <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "1rem" }}>All Comparisons</h1>
          <p style={{ fontSize: "1.2rem", opacity: 0.8, maxWidth: "700px", margin: "0 auto" }}>
            Explore our comprehensive collection of detailed comparisons across multiple categories
          </p>
        </div>
      </section>

      <section style={{ padding: "60px 0" }}>
        <div className="container">
          {categories.map((category) => (
            <div key={category.id} style={{ marginBottom: "4rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "2rem",
                  paddingBottom: "1rem",
                  borderBottom: "2px solid var(--border)",
                }}
              >
                <span style={{ fontSize: "2.5rem" }}>{category.icon}</span>
                <h2 style={{ fontSize: "2rem", fontWeight: 700, margin: 0 }}>{category.name}</h2>
              </div>

              {category.comparisons.length > 0 ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "1.5rem",
                  }}
                >
                  {category.comparisons.map((comparison) => (
                    <Link
                      key={comparison.slug}
                      href={`/comparison/${comparison.slug}`}
                      className="comparison-card"
                      style={{
                        background: "var(--bg-primary)",
                        padding: "1.5rem",
                        border: "2px solid var(--border)",
                        textDecoration: "none",
                        color: "inherit",
                        display: "block",
                      }}
                    >
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "0.75rem" }}>
                        {comparison.title}
                      </h3>
                      <p style={{ fontSize: "0.95rem", opacity: 0.7, marginBottom: "1rem", lineHeight: 1.6 }}>
                        {comparison.description}
                      </p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "0.85rem", opacity: 0.6 }}>{comparison.views} views</span>
                        <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>Read more →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p style={{ opacity: 0.6, fontSize: "1rem" }}>No comparisons available in this category yet.</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  )
}
