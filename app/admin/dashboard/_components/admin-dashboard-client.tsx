"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminDashboardClient() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    if (!token) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("admin_token")
    router.push("/admin/login")
  }

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-secondary)" }}>
      <header
        style={{
          background: "var(--bg-primary)",
          borderBottom: "2px solid var(--border)",
          padding: "1.5rem 2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "0.25rem" }}>
              Products<span style={{ fontWeight: 400 }}>VS</span>
            </h1>
            <p style={{ fontSize: "0.9rem", opacity: 0.6 }}>Admin Dashboard</p>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Link href="/" style={{ fontSize: "0.9rem", opacity: 0.7 }}>
              View Site
            </Link>
            <button
              onClick={handleLogout}
              style={{
                padding: "0.5rem 1.5rem",
                background: "var(--text)",
                color: "var(--bg)",
                border: "none",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div style={{ display: "flex", maxWidth: "1400px", margin: "0 auto" }}>
        <aside
          style={{
            width: "250px",
            background: "var(--bg-primary)",
            borderRight: "2px solid var(--border)",
            minHeight: "calc(100vh - 100px)",
            padding: "2rem 0",
          }}
        >
          <nav>
            {[
              { id: "overview", label: "Overview", icon: "📊" },
              { id: "comparisons", label: "Comparisons", icon: "⚖️" },
              { id: "analytics", label: "Analytics", icon: "📈" },
              { id: "settings", label: "Settings", icon: "⚙️" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: "100%",
                  padding: "1rem 2rem",
                  textAlign: "left",
                  background: activeTab === tab.id ? "var(--bg-secondary)" : "transparent",
                  border: "none",
                  borderLeft: activeTab === tab.id ? "4px solid var(--text)" : "4px solid transparent",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <main style={{ flex: 1, padding: "2rem" }}>
          {activeTab === "overview" && (
            <div>
              <h2 style={{ fontSize: "2rem", marginBottom: "2rem", fontWeight: 700 }}>Dashboard Overview</h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1.5rem",
                  marginBottom: "3rem",
                }}
              >
                {[
                  { label: "Total Comparisons", value: "70+", icon: "⚖️" },
                  { label: "Total Views", value: "1.2M", icon: "👁️" },
                  { label: "Active Users", value: "45K", icon: "👥" },
                  { label: "Avg. Rating", value: "4.8/5", icon: "⭐" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      padding: "2rem",
                      background: "var(--bg-primary)",
                      border: "2px solid var(--border)",
                    }}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{stat.icon}</div>
                    <div style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>{stat.value}</div>
                    <div style={{ fontSize: "0.95rem", opacity: 0.7 }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: "2rem",
                  background: "var(--bg-primary)",
                  border: "2px solid var(--border)",
                }}
              >
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", fontWeight: 600 }}>Recent Activity</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    { action: "New comparison added", item: "iPhone 15 vs Samsung S24", time: "2 hours ago" },
                    { action: "Comparison updated", item: "Netflix vs Disney Plus", time: "5 hours ago" },
                    { action: "New user registered", item: "user@example.com", time: "1 day ago" },
                    { action: "Analytics report generated", item: "Monthly Report", time: "2 days ago" },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "1rem",
                        background: "var(--bg-secondary)",
                        border: "1px solid var(--border)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{activity.action}</div>
                        <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>{activity.item}</div>
                      </div>
                      <div style={{ fontSize: "0.85rem", opacity: 0.6 }}>{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "comparisons" && (
            <div>
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}
              >
                <h2 style={{ fontSize: "2rem", fontWeight: 700 }}>Manage Comparisons</h2>
                <button className="cta-button" style={{ padding: "0.75rem 1.5rem" }}>
                  Add New Comparison
                </button>
              </div>

              <div
                style={{
                  padding: "2rem",
                  background: "var(--bg-primary)",
                  border: "2px solid var(--border)",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--border)" }}>
                      <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600 }}>Title</th>
                      <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600 }}>Category</th>
                      <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600 }}>Views</th>
                      <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600 }}>Status</th>
                      <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { title: "Netflix vs Disney Plus", category: "Streaming", views: "15.2K", status: "Published" },
                      { title: "iPhone vs Samsung", category: "Technology", views: "25.4K", status: "Published" },
                      { title: "Airbnb vs Hotels", category: "Travel", views: "13.2K", status: "Published" },
                    ].map((comparison, index) => (
                      <tr key={index} style={{ borderBottom: "1px solid var(--border)" }}>
                        <td style={{ padding: "1rem" }}>{comparison.title}</td>
                        <td style={{ padding: "1rem", opacity: 0.7 }}>{comparison.category}</td>
                        <td style={{ padding: "1rem", opacity: 0.7 }}>{comparison.views}</td>
                        <td style={{ padding: "1rem" }}>
                          <span
                            style={{
                              padding: "0.25rem 0.75rem",
                              background: "var(--bg-secondary)",
                              border: "1px solid var(--border)",
                              fontSize: "0.85rem",
                            }}
                          >
                            {comparison.status}
                          </span>
                        </td>
                        <td style={{ padding: "1rem" }}>
                          <button
                            style={{
                              padding: "0.5rem 1rem",
                              background: "transparent",
                              border: "1px solid var(--border)",
                              cursor: "pointer",
                              fontSize: "0.85rem",
                              marginRight: "0.5rem",
                            }}
                          >
                            Edit
                          </button>
                          <button
                            style={{
                              padding: "0.5rem 1rem",
                              background: "transparent",
                              border: "1px solid var(--border)",
                              cursor: "pointer",
                              fontSize: "0.85rem",
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div>
              <h2 style={{ fontSize: "2rem", marginBottom: "2rem", fontWeight: 700 }}>Analytics</h2>
              <div
                style={{
                  padding: "3rem",
                  background: "var(--bg-primary)",
                  border: "2px solid var(--border)",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "1.2rem", opacity: 0.7 }}>Analytics dashboard coming soon...</p>
                <p style={{ marginTop: "1rem", opacity: 0.6 }}>
                  Track views, engagement, and user behavior across all comparisons.
                </p>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 style={{ fontSize: "2rem", marginBottom: "2rem", fontWeight: 700 }}>Settings</h2>
              <div
                style={{
                  padding: "2rem",
                  background: "var(--bg-primary)",
                  border: "2px solid var(--border)",
                }}
              >
                <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem", fontWeight: 600 }}>Site Configuration</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Site Title</label>
                    <input
                      type="text"
                      defaultValue="Products VS"
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "2px solid var(--border)",
                        fontSize: "1rem",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>
                      Site Description
                    </label>
                    <textarea
                      defaultValue="Compare products, services, and lifestyle choices with Products VS."
                      rows={3}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "2px solid var(--border)",
                        fontSize: "1rem",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>
                  <div>
                    <button className="cta-button" style={{ padding: "0.75rem 2rem" }}>
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
