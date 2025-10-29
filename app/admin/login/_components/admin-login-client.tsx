"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginClient() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // TODO: Replace with actual authentication
      // For now, simple demo authentication
      if (formData.email === "admin@productsvs.com" && formData.password === "admin123") {
        localStorage.setItem("admin_token", "demo_token")
        router.push("/admin/dashboard")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-secondary)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          padding: "3rem",
          background: "var(--bg-primary)",
          border: "2px solid var(--border)",
          margin: "2rem",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            Products<span style={{ fontWeight: 400 }}>VS</span>
          </h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.7 }}>Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, fontSize: "0.95rem" }}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="admin@productsvs.com"
              style={{
                width: "100%",
                padding: "0.875rem",
                fontSize: "1rem",
                border: "2px solid var(--border)",
                background: "var(--bg-primary)",
              }}
              disabled={loading}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, fontSize: "0.95rem" }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "0.875rem",
                fontSize: "1rem",
                border: "2px solid var(--border)",
                background: "var(--bg-primary)",
              }}
              disabled={loading}
            />
          </div>

          {error && (
            <div
              style={{
                padding: "1rem",
                marginBottom: "1.5rem",
                background: "#fee",
                border: "1px solid #fcc",
                color: "#c00",
                fontSize: "0.95rem",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="cta-button"
            disabled={loading}
            style={{
              width: "100%",
              padding: "1rem",
              fontSize: "1rem",
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={{ marginTop: "2rem", textAlign: "center", fontSize: "0.9rem", opacity: 0.6 }}>
          <p>Demo credentials:</p>
          <p>Email: admin@productsvs.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  )
}
