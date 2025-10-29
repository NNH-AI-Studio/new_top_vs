"use client"

import { notFound } from "next/navigation"
import PageLayout from "@/components/page-layout"
import Breadcrumbs from "@/components/breadcrumbs"
import Link from "next/link"
import { getComparisonBySlug } from "@/lib/comparisons-data"

export default function ComparisonClientPage({ params }: { params: { slug: string } }) {
  const comparison = getComparisonBySlug(params.slug)

  if (!comparison) {
    notFound()
  }

  return (
    <PageLayout currentPath={`/comparison/${params.slug}`}>
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Comparisons", href: "/en" }, { label: comparison.title }]}
      />

      <section className="hero-section" style={{ padding: "60px 0", textAlign: "center" }}>
        <div className="container">
          <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "1rem" }}>{comparison.title}</h1>
          <p style={{ fontSize: "1.2rem", opacity: 0.8, maxWidth: "800px", margin: "0 auto" }}>
            {comparison.description}
          </p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <span
              style={{
                padding: "0.5rem 1rem",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                fontSize: "0.9rem",
              }}
            >
              {comparison.category}
            </span>
            <span
              style={{
                padding: "0.5rem 1rem",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                fontSize: "0.9rem",
              }}
            >
              {comparison.views} views
            </span>
            <span
              style={{
                padding: "0.5rem 1rem",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                fontSize: "0.9rem",
              }}
            >
              Updated: {comparison.lastUpdated}
            </span>
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div className="comparison-section">
            <h2>Quick Comparison</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "2rem",
                marginTop: "2rem",
              }}
            >
              <div
                style={{
                  padding: "2rem",
                  border: "2px solid var(--border)",
                  background: "var(--bg-primary)",
                }}
              >
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{comparison.optionA.name}</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {comparison.optionA.pros.map((pro, index) => (
                    <li key={index} style={{ marginBottom: "0.75rem", paddingLeft: "1.5rem", position: "relative" }}>
                      <span style={{ position: "absolute", left: 0 }}>✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  padding: "2rem",
                  border: "2px solid var(--border)",
                  background: "var(--bg-primary)",
                }}
              >
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{comparison.optionB.name}</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {comparison.optionB.pros.map((pro, index) => (
                    <li key={index} style={{ marginBottom: "0.75rem", paddingLeft: "1.5rem", position: "relative" }}>
                      <span style={{ position: "absolute", left: 0 }}>✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="comparison-section" style={{ marginTop: "4rem" }}>
            <h2>Detailed Analysis</h2>
            {comparison.sections.map((section, index) => (
              <div key={index} style={{ marginTop: "2rem" }}>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", fontWeight: 600 }}>{section.title}</h3>
                <p style={{ lineHeight: 1.8, color: "var(--text-secondary)" }}>{section.content}</p>
              </div>
            ))}
          </div>

          <div className="comparison-section" style={{ marginTop: "4rem" }}>
            <h2>Final Verdict</h2>
            <div
              style={{
                padding: "2rem",
                background: "var(--bg-secondary)",
                border: "2px solid var(--border)",
                marginTop: "2rem",
              }}
            >
              <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                {comparison.verdict}
              </p>
            </div>
          </div>

          <div style={{ marginTop: "4rem", textAlign: "center" }}>
            <Link href="/en" className="cta-button">
              Browse More Comparisons
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .comparison-section h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid var(--border);
        }
      `}</style>
    </PageLayout>
  )
}
