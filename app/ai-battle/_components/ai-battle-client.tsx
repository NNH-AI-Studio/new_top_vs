"use client"

import type React from "react"

import { useState } from "react"
import PageLayout from "@/components/page-layout"
import Breadcrumbs from "@/components/breadcrumbs"

export default function AIBattleClient() {
  const [productA, setProductA] = useState("")
  const [productB, setProductB] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!productA.trim() || !productB.trim()) {
      alert("Please enter both products to compare")
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/battle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productA: productA.trim(),
          productB: productB.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate comparison")
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to generate comparison. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSwap = () => {
    const temp = productA
    setProductA(productB)
    setProductB(temp)
  }

  return (
    <PageLayout currentPath="/ai-battle">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "AI Battle" }]} />

      <section className="hero-section" style={{ padding: "60px 0", textAlign: "center" }}>
        <div className="container">
          <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "1rem" }}>AI Battle</h1>
          <p style={{ fontSize: "1.2rem", opacity: 0.8, maxWidth: "700px", margin: "0 auto" }}>
            Compare anything with the power of AI. Get instant, detailed analysis of any two products, services, or
            concepts.
          </p>
        </div>
      </section>

      <section style={{ padding: "60px 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <form onSubmit={handleCompare}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                gap: "2rem",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              <div>
                <label
                  htmlFor="productA"
                  style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, fontSize: "1.1rem" }}
                >
                  Product A
                </label>
                <input
                  type="text"
                  id="productA"
                  value={productA}
                  onChange={(e) => setProductA(e.target.value)}
                  placeholder="e.g., iPhone 15 Pro"
                  style={{
                    width: "100%",
                    padding: "1rem",
                    fontSize: "1rem",
                    border: "2px solid var(--border)",
                    background: "var(--bg-primary)",
                  }}
                  disabled={loading}
                />
              </div>

              <button
                type="button"
                onClick={handleSwap}
                style={{
                  padding: "1rem",
                  background: "var(--bg-secondary)",
                  border: "2px solid var(--border)",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                  marginTop: "2rem",
                }}
                disabled={loading}
                title="Swap products"
              >
                ⇄
              </button>

              <div>
                <label
                  htmlFor="productB"
                  style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, fontSize: "1.1rem" }}
                >
                  Product B
                </label>
                <input
                  type="text"
                  id="productB"
                  value={productB}
                  onChange={(e) => setProductB(e.target.value)}
                  placeholder="e.g., Samsung Galaxy S24 Ultra"
                  style={{
                    width: "100%",
                    padding: "1rem",
                    fontSize: "1rem",
                    border: "2px solid var(--border)",
                    background: "var(--bg-primary)",
                  }}
                  disabled={loading}
                />
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                type="submit"
                className="cta-button"
                disabled={loading}
                style={{
                  padding: "1rem 3rem",
                  fontSize: "1.1rem",
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Generating Comparison..." : "Compare with AI"}
              </button>
            </div>
          </form>

          {loading && (
            <div style={{ textAlign: "center", padding: "3rem", marginTop: "2rem" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  border: "4px solid var(--border)",
                  borderTop: "4px solid var(--text)",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto",
                }}
              />
              <p style={{ marginTop: "1rem", fontSize: "1.1rem", opacity: 0.7 }}>AI is analyzing your comparison...</p>
            </div>
          )}

          {result && !loading && (
            <div style={{ marginTop: "3rem" }}>
              <div
                style={{
                  padding: "2rem",
                  background: "var(--bg-secondary)",
                  border: "2px solid var(--border)",
                  marginBottom: "2rem",
                }}
              >
                <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                  {result.productA} vs {result.productB}
                </h2>
                <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>{result.summary}</p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "2rem",
                  marginBottom: "2rem",
                }}
              >
                <div
                  style={{
                    padding: "2rem",
                    border: "2px solid var(--border)",
                    background: "var(--bg-primary)",
                  }}
                >
                  <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{result.productA}</h3>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", opacity: 0.8 }}>Strengths</h4>
                  <ul style={{ listStyle: "none", padding: 0, marginBottom: "1.5rem" }}>
                    {result.strengthsA.map((strength: string, index: number) => (
                      <li key={index} style={{ marginBottom: "0.5rem", paddingLeft: "1.5rem", position: "relative" }}>
                        <span style={{ position: "absolute", left: 0 }}>✓</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", opacity: 0.8 }}>Weaknesses</h4>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {result.weaknessesA.map((weakness: string, index: number) => (
                      <li key={index} style={{ marginBottom: "0.5rem", paddingLeft: "1.5rem", position: "relative" }}>
                        <span style={{ position: "absolute", left: 0 }}>✗</span>
                        {weakness}
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
                  <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{result.productB}</h3>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", opacity: 0.8 }}>Strengths</h4>
                  <ul style={{ listStyle: "none", padding: 0, marginBottom: "1.5rem" }}>
                    {result.strengthsB.map((strength: string, index: number) => (
                      <li key={index} style={{ marginBottom: "0.5rem", paddingLeft: "1.5rem", position: "relative" }}>
                        <span style={{ position: "absolute", left: 0 }}>✓</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", opacity: 0.8 }}>Weaknesses</h4>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {result.weaknessesB.map((weakness: string, index: number) => (
                      <li key={index} style={{ marginBottom: "0.5rem", paddingLeft: "1.5rem", position: "relative" }}>
                        <span style={{ position: "absolute", left: 0 }}>✗</span>
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                style={{
                  padding: "2rem",
                  background: "var(--text)",
                  color: "var(--bg)",
                  border: "2px solid var(--text)",
                }}
              >
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--bg)" }}>Recommendation</h3>
                <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--bg)", opacity: 0.95 }}>
                  {result.recommendation}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          form > div:first-child {
            grid-template-columns: 1fr !important;
          }

          form > div:first-child > button {
            margin-top: 0 !important;
            transform: rotate(90deg);
          }
        }
      `}</style>
    </PageLayout>
  )
}
