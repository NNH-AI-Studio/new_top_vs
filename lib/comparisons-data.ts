import { supabase } from "./supabase"

export interface Comparison {
  slug: string
  title: string
  description: string
  category: string
  views: string
  lastUpdated: string
  optionA: {
    name: string
    pros: string[]
  }
  optionB: {
    name: string
    pros: string[]
  }
  sections: {
    title: string
    content: string
  }[]
  verdict: string
}

export async function getComparisonBySlug(slug: string): Promise<Comparison | null> {
  return getStaticComparisonBySlug(slug)
}

export async function getAllComparisonSlugs(): Promise<string[]> {
  const { data: comparisons } = await supabase
    .from("comparisons")
    .select("slug")
    .eq("is_published", true)

  if (!comparisons || comparisons.length === 0) {
    return Object.keys(comparisonsDataStatic)
  }

  return comparisons.map((c) => c.slug)
}

function formatViews(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}

function getStaticComparisonBySlug(slug: string): Comparison | null {
  return comparisonsDataStatic[slug] || null
}

const comparisonsDataStatic: Record<string, Comparison> = {
  "netflix-vs-disney": {
    slug: "netflix-vs-disney",
    title: "Netflix vs Disney Plus",
    description:
      "Comprehensive comparison of Netflix and Disney Plus streaming services covering content, pricing, features, and value.",
    category: "Streaming Services",
    views: "15.2K",
    lastUpdated: "January 2025",
    optionA: {
      name: "Netflix",
      pros: [
        "Largest content library with 15,000+ titles",
        "Award-winning original series and films",
        "Multiple subscription tiers",
        "Available in 190+ countries",
        "Advanced recommendation algorithm",
      ],
    },
    optionB: {
      name: "Disney Plus",
      pros: [
        "Exclusive Disney, Pixar, Marvel, Star Wars content",
        "Family-friendly content focus",
        "Lower monthly subscription price",
        "4K streaming at no extra cost",
        "Download content for offline viewing",
      ],
    },
    sections: [
      {
        title: "Content Library",
        content:
          "Netflix boasts the largest streaming library with over 15,000 titles including original series like Stranger Things, The Crown, and Squid Game. Disney Plus focuses on quality over quantity with exclusive access to Disney, Pixar, Marvel, Star Wars, and National Geographic content.",
      },
      {
        title: "Pricing & Plans",
        content:
          "Netflix offers three tiers: Basic with ads ($6.99/month), Standard ($15.49/month), and Premium ($19.99/month). Disney Plus has a simpler structure at $7.99/month or $79.99/year.",
      },
      {
        title: "Streaming Quality",
        content:
          "Both platforms support 4K Ultra HD and HDR streaming. Netflix requires the Premium plan for 4K content, while Disney Plus includes 4K at no extra cost.",
      },
    ],
    verdict:
      "Choose Netflix for variety and originals. Choose Disney Plus for family content and better value. Many subscribe to both.",
  },
  "netflix-vs-hbo": {
    slug: "netflix-vs-hbo",
    title: "Netflix vs HBO Max",
    description: "Which streaming service offers better original content and value for money?",
    category: "Streaming Services",
    views: "12.8K",
    lastUpdated: "January 2025",
    optionA: {
      name: "Netflix",
      pros: [
        "Larger content library",
        "More international content",
        "Better mobile app experience",
        "Available worldwide",
        "Strong documentary selection",
      ],
    },
    optionB: {
      name: "HBO Max",
      pros: [
        "Premium HBO original series",
        "Warner Bros movie library",
        "Same-day theatrical releases",
        "Higher quality productions",
        "Classic TV shows library",
      ],
    },
    sections: [
      {
        title: "Content Quality",
        content:
          "HBO Max is known for prestige content with shows like Succession, The Last of Us, and House of the Dragon. Netflix offers more volume with hits like Wednesday, Stranger Things, and The Crown. HBO focuses on quality over quantity.",
      },
      {
        title: "Pricing",
        content:
          "Netflix ranges from $6.99 to $19.99/month depending on tier. HBO Max costs $9.99/month with ads or $15.99/month ad-free. HBO Max offers better value for premium content enthusiasts.",
      },
      {
        title: "Original Content",
        content:
          "Both invest heavily in originals. Netflix releases more content overall, while HBO Max maintains higher production values and critical acclaim. HBO has won more Emmy awards per show.",
      },
    ],
    verdict:
      "Choose Netflix for variety and international content. Choose HBO Max for premium quality and Warner Bros content.",
  },
}
