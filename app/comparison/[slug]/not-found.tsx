import PageLayout from "@/components/page-layout"
import Link from "next/link"

export default function ComparisonNotFound() {
  return (
    <PageLayout>
      <section style={{ padding: "80px 0", textAlign: "center" }}>
        <div className="container">
          <h1 style={{ fontSize: "4rem", fontWeight: 800, marginBottom: "1rem" }}>404</h1>
          <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Comparison Not Found</h2>
          <p
            style={{ fontSize: "1.2rem", opacity: 0.7, marginBottom: "3rem", maxWidth: "600px", margin: "0 auto 3rem" }}
          >
            The comparison you're looking for doesn't exist or has been moved.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/en" className="cta-button">
              Browse All Comparisons
            </Link>
            <Link
              href="/"
              className="cta-button"
              style={{ background: "transparent", color: "var(--text)", border: "2px solid var(--text)" }}
            >
              Go Home
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
