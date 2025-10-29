import type { Metadata } from "next"
import PageLayout from "@/components/page-layout"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Products VS - Compare Everything | Smart Comparisons in English & Arabic",
  description:
    "Compare products, services, and lifestyle choices with Products VS. 70+ detailed comparisons in English and Arabic. Make informed decisions faster!",
}

export default function HomePage() {
  return (
    <PageLayout currentPath="/">
      <section className="hero-section" style={{ padding: "80px 0", textAlign: "center" }}>
        <div className="container">
          <h1 style={{ fontSize: "3.5rem", fontWeight: 800, marginBottom: "1.5rem", lineHeight: 1.2 }}>
            Compare <span style={{ color: "var(--primary-color, #000)" }}>Everything</span>
          </h1>
          <p className="hero-subtitle" style={{ fontSize: "1.5rem", marginBottom: "2.5rem", opacity: 0.8 }}>
            70+ Detailed Comparisons in English & Arabic
          </p>
          <p
            style={{
              fontSize: "1.1rem",
              marginBottom: "3rem",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
              opacity: 0.7,
            }}
          >
            Make informed decisions faster with comprehensive, unbiased comparisons across technology, lifestyle,
            services, and more.
          </p>
          <div
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}
          >
            <Link
              href="/en"
              className="lang-btn active"
              style={{
                padding: "0.75rem 2rem",
                fontSize: "1rem",
                border: "2px solid #000",
                background: "#000",
                color: "#fff",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              English
            </Link>
            <Link
              href="/ar"
              className="lang-btn"
              style={{
                padding: "0.75rem 2rem",
                fontSize: "1rem",
                border: "2px solid #000",
                background: "#fff",
                color: "#000",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              العربية
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <h2 style={{ fontSize: "2.5rem", textAlign: "center", marginBottom: "3rem", fontWeight: 700 }}>
            Browse by Category
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            {categories.map((category) => (
              <div
                key={category.title}
                className="category-card"
                style={{
                  background: "var(--bg-primary, #fff)",
                  padding: "2rem",
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{category.icon}</div>
                <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem", fontWeight: 600 }}>{category.title}</h3>
                <p style={{ opacity: 0.7, fontSize: "0.95rem" }}>{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 0", background: "var(--bg-secondary, #f5f5f5)" }}>
        <div className="container">
          <h2 style={{ fontSize: "2.5rem", textAlign: "center", marginBottom: "3rem", fontWeight: 700 }}>
            Why Choose Products VS?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {features.map((feature) => (
              <div key={feature.title} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{feature.icon}</div>
                <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem", fontWeight: 600 }}>{feature.title}</h3>
                <p style={{ opacity: 0.7 }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2rem",
              textAlign: "center",
            }}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: "3.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>{stat.value}</div>
                <p style={{ opacity: 0.7, fontSize: "1.1rem" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "80px 0",
          background: "linear-gradient(135deg, #000 0%, #333 100%)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", fontWeight: 700, color: "#fff" }}>
            Ready to Make Better Decisions?
          </h2>
          <p
            style={{
              fontSize: "1.2rem",
              marginBottom: "2.5rem",
              opacity: 0.9,
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Explore our comprehensive comparisons and find exactly what you're looking for.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/en"
              className="cta-button"
              style={{
                padding: "1rem 2.5rem",
                fontSize: "1.1rem",
                textDecoration: "none",
                background: "#fff",
                color: "#000",
                borderRadius: "8px",
                display: "inline-block",
                fontWeight: 600,
              }}
            >
              Browse All Comparisons
            </Link>
            <Link
              href="/contact"
              className="cta-button"
              style={{
                padding: "1rem 2.5rem",
                fontSize: "1.1rem",
                textDecoration: "none",
                background: "transparent",
                color: "#fff",
                border: "2px solid #fff",
                borderRadius: "8px",
                display: "inline-block",
                fontWeight: 600,
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

const categories = [
  { icon: "📱", title: "Technology", description: "Smartphones, Laptops, Software" },
  { icon: "🎬", title: "Entertainment", description: "Streaming, Gaming, Music" },
  { icon: "🚗", title: "Automotive", description: "Cars, Electric Vehicles" },
  { icon: "💼", title: "Business", description: "E-commerce, Tools, Services" },
  { icon: "🏠", title: "Lifestyle", description: "Home, Health, Food" },
  { icon: "💰", title: "Finance", description: "Banking, Crypto, Payments" },
]

const features = [
  {
    icon: "🌍",
    title: "Bilingual Content",
    description: "All comparisons available in both English and Arabic for global accessibility.",
  },
  {
    icon: "📊",
    title: "Data-Driven Analysis",
    description: "Comprehensive research with verified facts, specs, and real user reviews.",
  },
  {
    icon: "🔄",
    title: "Regular Updates",
    description: "Our comparisons are updated monthly to reflect current prices and features.",
  },
  {
    icon: "⚡",
    title: "Fast & Clean",
    description: "Minimal design, no clutter, blazing fast loading speeds.",
  },
  {
    icon: "🎯",
    title: "Unbiased Reviews",
    description: "Editorial independence maintained even with affiliate partnerships.",
  },
  {
    icon: "🆓",
    title: "100% Free",
    description: "All comparisons are free to access, no registration required.",
  },
]

const stats = [
  { value: "70+", label: "Detailed Comparisons" },
  { value: "2", label: "Languages Supported" },
  { value: "15+", label: "Categories Covered" },
  { value: "2025", label: "Year Established" },
]
