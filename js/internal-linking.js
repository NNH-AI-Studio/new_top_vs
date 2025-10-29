/**
 * Internal Linking Automation System
 * Automatically generates and manages internal links
 */

class InternalLinkingSystem {
    constructor(config = {}) {
        this.config = {
            apiEndpoint: config.apiEndpoint || '/api/comparisons.json',
            relatedLinksCount: config.relatedLinksCount || 4,
            contextualLinksCount: config.contextualLinksCount || 3,
            enableTracking: config.enableTracking !== false,
            ...config
        };

        this.comparisons = {};
        this.categories = {};
        this.currentPage = this.getCurrentPageInfo();
    }

    /**
     * Initialize the system
     */
    async init() {
        await this.loadComparisonsDatabase();
        this.generateRelatedLinks();
        this.enhanceBreadcrumbs();
        this.addContextualLinks();

        if (this.config.enableTracking) {
            this.setupLinkTracking();
        }
    }

    /**
     * Get current page information from DOM
     */
    getCurrentPageInfo() {
        const body = document.body;
        return {
            id: body.dataset.pageId || this.extractPageIdFromURL(),
            category: body.dataset.category || '',
            lang: document.documentElement.lang || 'en',
            productA: body.dataset.productA || '',
            productB: body.dataset.productB || ''
        };
    }

    /**
     * Extract page ID from URL
     */
    extractPageIdFromURL() {
        const path = window.location.pathname;
        const match = path.match(/\/([^\/]+)\.html$/);
        return match ? match[1] : '';
    }

    /**
     * Load comparisons database
     */
    async loadComparisonsDatabase() {
        try {
            const response = await fetch(this.config.apiEndpoint);
            const data = await response.json();
            this.comparisons = data.comparisons || {};
            this.categories = data.categories || {};
        } catch (error) {
            // Fallback to inline data if API fails
            this.loadFallbackData();
        }
    }

    /**
     * Fallback data if API is unavailable
     */
    loadFallbackData() {
        this.comparisons = {
            'netflix-vs-disney': {
                title: 'Netflix vs Disney+',
                category: 'streaming',
                productA: 'netflix',
                productB: 'disney',
                url: '/en/netflix-vs-disney.html',
                description: 'Compare streaming quality, content, and pricing'
            },
            'iphone-vs-samsung': {
                title: 'iPhone vs Samsung',
                category: 'tech',
                productA: 'iphone',
                productB: 'samsung',
                url: '/en/iphone-vs-samsung.html',
                description: 'Compare specs, camera, battery, and price'
            }
            // Add more as needed
        };

        this.categories = {
            'streaming': {
                name: 'Streaming Services',
                url: '/en/streaming.html',
                comparisons: ['netflix-vs-disney', 'netflix-vs-hbo', 'hulu-vs-netflix']
            },
            'tech': {
                name: 'Technology',
                url: '/en/tech.html',
                comparisons: ['iphone-vs-samsung', 'android-vs-ios', 'mac-vs-pc']
            }
        };
    }

    /**
     * Find related comparisons
     */
    findRelated(pageId, count = 4) {
        const current = this.comparisons[pageId];
        if (!current) return [];

        const related = [];

        // 1. Same category comparisons
        const sameCategory = Object.entries(this.comparisons)
            .filter(([id, comp]) =>
                id !== pageId &&
                comp.category === current.category
            )
            .slice(0, 2);
        related.push(...sameCategory);

        // 2. Same product A comparisons
        const sameProductA = Object.entries(this.comparisons)
            .filter(([id, comp]) =>
                id !== pageId &&
                !related.find(([relId]) => relId === id) &&
                (comp.productA === current.productA || comp.productB === current.productA)
            )
            .slice(0, 1);
        related.push(...sameProductA);

        // 3. Same product B comparisons
        const sameProductB = Object.entries(this.comparisons)
            .filter(([id, comp]) =>
                id !== pageId &&
                !related.find(([relId]) => relId === id) &&
                (comp.productA === current.productB || comp.productB === current.productB)
            )
            .slice(0, 1);
        related.push(...sameProductB);

        return related.slice(0, count).map(([id, comp]) => ({ id, ...comp }));
    }

    /**
     * Generate related links HTML and insert into page
     */
    generateRelatedLinks() {
        if (!this.currentPage.id) return;

        const related = this.findRelated(this.currentPage.id, this.config.relatedLinksCount);
        if (related.length === 0) return;

        const html = this.renderRelatedSection(related);

        // Insert before footer
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.insertAdjacentHTML('beforebegin', html);
        }
    }

    /**
     * Render related comparisons section
     */
    renderRelatedSection(comparisons) {
        const current = this.comparisons[this.currentPage.id];
        const categoryInfo = this.categories[current?.category] || {};

        return `
            <section class="related-comparisons auto-generated" aria-labelledby="related-title">
                <div class="container">
                    <h2 id="related-title" class="section-title">Related Comparisons</h2>
                    <p class="section-subtitle">Explore similar comparisons to make better decisions</p>

                    <div class="comparisons-grid">
                        ${comparisons.map((comp, index) => this.renderComparisonCard(comp, index)).join('')}
                    </div>

                    ${categoryInfo.url ? `
                        <div class="view-all-link">
                            <a href="${categoryInfo.url}"
                               class="cta-button"
                               data-link-position="category-hub"
                               title="View all ${categoryInfo.name} comparisons">
                                View All ${categoryInfo.name} Comparisons →
                            </a>
                        </div>
                    ` : ''}
                </div>
            </section>
        `;
    }

    /**
     * Render individual comparison card
     */
    renderComparisonCard(comparison, index) {
        const url = comparison.url || `/${this.currentPage.lang}/${comparison.id}.html`;
        const category = this.categories[comparison.category];

        return `
            <article class="comparison-card">
                <div class="card-badge">${category?.name || comparison.category}</div>
                <h3 class="card-title">
                    <a href="${url}"
                       rel="related"
                       data-link-position="related-${index + 1}"
                       title="${comparison.title} - Detailed Comparison">
                        ${comparison.title}
                    </a>
                </h3>
                <p class="card-description">
                    ${comparison.description || 'Compare features, pricing, and more'}
                </p>
                <div class="card-meta">
                    <span class="card-category">${comparison.category}</span>
                </div>
            </article>
        `;
    }

    /**
     * Enhance breadcrumbs with category level
     */
    enhanceBreadcrumbs() {
        const breadcrumbs = document.querySelector('.breadcrumbs');
        if (!breadcrumbs || !this.currentPage.category) return;

        const current = this.comparisons[this.currentPage.id];
        if (!current) return;

        const categoryInfo = this.categories[current.category];
        if (!categoryInfo) return;

        // Find the comparisons link and add category after it
        const breadcrumbList = breadcrumbs.querySelector('.breadcrumb-list, ol');
        if (!breadcrumbList) return;

        const items = breadcrumbList.querySelectorAll('li');
        const comparisonsItem = Array.from(items).find(li =>
            li.textContent.includes('Comparisons')
        );

        if (comparisonsItem) {
            const categoryHTML = `
                <li class="breadcrumb-separator" aria-hidden="true">›</li>
                <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <a itemprop="item"
                       href="${categoryInfo.url}"
                       title="${categoryInfo.name} Comparisons">
                        <span itemprop="name">${categoryInfo.name}</span>
                    </a>
                    <meta itemprop="position" content="3" />
                </li>
            `;

            comparisonsItem.insertAdjacentHTML('afterend', categoryHTML);

            // Update position of current page
            const currentItem = breadcrumbList.querySelector('[aria-current="page"]');
            if (currentItem) {
                const positionMeta = currentItem.closest('li').querySelector('meta[itemprop="position"]');
                if (positionMeta) {
                    positionMeta.setAttribute('content', '4');
                }
            }
        }
    }

    /**
     * Add contextual links within content
     */
    addContextualLinks() {
        const content = document.querySelector('article, .article-content, .main-content');
        if (!content) return;

        const paragraphs = content.querySelectorAll('p');
        if (paragraphs.length < 3) return;

        const related = this.findRelated(this.currentPage.id, 6);
        if (related.length === 0) return;

        // Add contextual links to 2-3 paragraphs
        const linkableParagraphs = Array.from(paragraphs)
            .filter(p => p.textContent.length > 100 && !p.querySelector('a'))
            .slice(0, this.config.contextualLinksCount);

        linkableParagraphs.forEach((p, index) => {
            if (related[index]) {
                this.insertContextualLink(p, related[index]);
            }
        });
    }

    /**
     * Insert a contextual link into a paragraph
     */
    insertContextualLink(paragraph, comparison) {
        const text = paragraph.textContent;
        const words = text.split(' ');

        // Find a good insertion point (around middle of paragraph)
        const insertIndex = Math.floor(words.length * 0.6);

        // Create contextual anchor text
        const anchorText = this.generateAnchorText(comparison);
        const url = comparison.url || `/${this.currentPage.lang}/${comparison.id}.html`;

        const link = `<a href="${url}" rel="related" title="${comparison.title}">${anchorText}</a>`;

        // Insert link
        const beforeText = words.slice(0, insertIndex).join(' ');
        const afterText = words.slice(insertIndex).join(' ');

        paragraph.innerHTML = `${beforeText} ${link} ${afterText}`;
    }

    /**
     * Generate natural anchor text
     */
    generateAnchorText(comparison) {
        const variations = [
            comparison.title,
            `comparing ${comparison.productA} and ${comparison.productB}`,
            `${comparison.productA} vs ${comparison.productB} comparison`,
            `${comparison.productA} versus ${comparison.productB}`,
            `our ${comparison.title.toLowerCase()} guide`
        ];

        // Return a random variation
        return variations[Math.floor(Math.random() * variations.length)];
    }

    /**
     * Setup link click tracking
     */
    setupLinkTracking() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="/"]');
            if (!link) return;

            const linkData = {
                url: link.href,
                text: link.textContent.trim(),
                position: link.dataset.linkPosition || 'unknown',
                rel: link.rel || 'none',
                sourcePage: window.location.pathname
            };

            // Send to analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'internal_link_click', linkData);
            }

            // Log for debugging
            if (this.config.debug) {
            }
        });
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const linkingSystem = new InternalLinkingSystem({
        apiEndpoint: '/api/comparisons.json',
        relatedLinksCount: 4,
        contextualLinksCount: 2,
        enableTracking: true,
        debug: false
    });

    linkingSystem.init().catch(error => {
        console.error('Failed to initialize internal linking system:', error);
    });
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InternalLinkingSystem;
}
