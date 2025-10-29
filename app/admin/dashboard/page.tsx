import type { Metadata } from "next"
import AdminDashboardClient from "./_components/admin-dashboard-client"

export const metadata: Metadata = {
  title: "Admin Dashboard - Products VS",
  description: "Manage comparisons, view analytics, and configure settings.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminDashboardPage() {
  return <AdminDashboardClient />
}
