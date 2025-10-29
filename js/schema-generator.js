// Schema.org Markup Generator for Comparison Pages
// مولد Schema للمقارنات

function generateProductComparisonSchema(product1, product2) {
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": `${product1.name} vs ${product2.name} Comparison`,
        "description": `Detailed comparison between ${product1.name} and ${product2.name}`,
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": [
                {
                    "@type": "Product",
                    "position": 1,
                    "name": product1.name,
                    "image": product1.image,
                    "description": product1.description,
                    "brand": {
                        "@type": "Brand",
                        "name": product1.brand
                    },
                    "aggregateRating": product1.rating ? {
                        "@type": "AggregateRating",
                        "ratingValue": product1.rating.value,
                        "bestRating": "5",
                        "worstRating": "1",
                        "ratingCount": product1.rating.count
                    } : undefined,
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": product1.price.low,
                        "highPrice": product1.price.high,
                        "priceCurrency": "USD",
                        "availability": "https://schema.org/InStock"
                    },
                    "review": product1.reviews || []
                },
                {
                    "@type": "Product",
                    "position": 2,
                    "name": product2.name,
                    "image": product2.image,
                    "description": product2.description,
                    "brand": {
                        "@type": "Brand",
                        "name": product2.brand
                    },
                    "aggregateRating": product2.rating ? {
                        "@type": "AggregateRating",
                        "ratingValue": product2.rating.value,
                        "bestRating": "5",
                        "worstRating": "1",
                        "ratingCount": product2.rating.count
                    } : undefined,
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": product2.price.low,
                        "highPrice": product2.price.high,
                        "priceCurrency": "USD",
                        "availability": "https://schema.org/InStock"
                    },
                    "review": product2.reviews || []
                }
            ]
        }
    };
}

function generateFAQSchema(faqs) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
}

function generateBreadcrumbSchema(breadcrumbs) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": crumb.url
        }))
    };
}

function generateOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Products VS",
        "url": "https://www.productsvs.com",
        "logo": "https://www.productsvs.com/images/logo.svg",
        "description": "Professional comparison website providing detailed product and service analysis in English and Arabic.",
        "sameAs": [
            "https://twitter.com/productsvs",
            "https://facebook.com/productsvs",
            "https://linkedin.com/company/productsvs"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-XXX-XXX-XXXX",
            "contactType": "customer service",
            "email": "info@productsvs.com",
            "availableLanguage": ["English", "Arabic"]
        }
    };
}

function generateWebsiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Products VS",
        "url": "https://www.productsvs.com",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.productsvs.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        },
        "inLanguage": ["en", "ar"]
    };
}

function generateComparisonTableSchema(comparisonData) {
    return {
        "@context": "https://schema.org",
        "@type": "Table",
        "about": comparisonData.about,
        "name": comparisonData.title,
        "description": comparisonData.description
    };
}

// Helper function to inject schema into page
function injectSchema(schemaData) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);
}

// Example usage for iPhone vs Samsung page
if (window.location.pathname.includes('iphone-vs-samsung')) {
    const iphoneData = {
        name: "iPhone 15 Pro",
        brand: "Apple",
        image: "https://www.productsvs.com/images/iphone-15-pro.jpg",
        description: "Apple's latest flagship smartphone with A17 Pro chip, titanium design, and advanced camera system",
        price: { low: 999, high: 1499 },
        rating: { value: 4.6, count: 2543 }
    };

    const samsungData = {
        name: "Samsung Galaxy S24 Ultra",
        brand: "Samsung",
        image: "https://www.productsvs.com/images/samsung-s24-ultra.jpg",
        description: "Samsung's premium flagship with S-Pen, advanced AI features, and versatile camera system",
        price: { low: 1199, high: 1599 },
        rating: { value: 4.5, count: 1876 }
    };

    const faqs = [
        {
            question: "Which phone has better camera quality?",
            answer: "Both phones excel in photography. iPhone 15 Pro offers more natural colors and better video, while Samsung S24 Ultra provides more versatility with its zoom capabilities."
        },
        {
            question: "Which phone has better battery life?",
            answer: "Samsung S24 Ultra generally offers better battery life with its 5000mAh battery compared to iPhone 15 Pro's approximately 3274mAh battery."
        },
        {
            question: "Which phone is better for gaming?",
            answer: "Both are excellent for gaming. iPhone 15 Pro has the A17 Pro chip with better optimization, while Samsung S24 Ultra offers a larger display and better cooling."
        }
    ];

    const breadcrumbs = [
        { name: "Home", url: "https://www.productsvs.com" },
        { name: "Comparisons", url: "https://www.productsvs.com/en/" },
        { name: "iPhone vs Samsung", url: "https://www.productsvs.com/en/iphone-vs-samsung.html" }
    ];

    // Inject all schemas
    injectSchema(generateProductComparisonSchema(iphoneData, samsungData));
    injectSchema(generateFAQSchema(faqs));
    injectSchema(generateBreadcrumbSchema(breadcrumbs));
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateProductComparisonSchema,
        generateFAQSchema,
        generateBreadcrumbSchema,
        generateOrganizationSchema,
        generateWebsiteSchema,
        generateComparisonTableSchema,
        injectSchema
    };
}
