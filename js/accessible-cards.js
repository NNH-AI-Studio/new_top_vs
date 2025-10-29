/**
 * Accessible Card Grid
 * Alternative to infinite scroll with pagination and load more
 * Progressive enhancement: all content accessible without JS
 */

class AccessibleCardGrid {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            itemsPerPage: options.itemsPerPage || 12,
            loadMoreButton: options.loadMoreButton || true,
            announceUpdates: options.announceUpdates !== false,
            ...options
        };

        this.allItems = Array.from(container.querySelectorAll('.comparison-item, .comparison-card'));
        this.currentPage = 1;
        this.totalPages = Math.ceil(this.allItems.length / this.options.itemsPerPage);

        this.init();
    }

    init() {
        // Only paginate if JavaScript is enabled
        if (this.allItems.length > this.options.itemsPerPage) {
            this.setupPagination();
            this.setupLoadMore();
            this.showPage(1);
        }

        this.setupCardAccessibility();
        this.setupLiveRegion();
    }

    /**
     * Make cards keyboard and screen reader accessible
     */
    setupCardAccessibility() {
        this.allItems.forEach((card, index) => {
            const link = card.querySelector('a') || card;

            // If card is a link
            if (link.tagName === 'A') {
                // Add focus visible styles
                link.addEventListener('focus', () => {
                    card.classList.add('focused');
                });

                link.addEventListener('blur', () => {
                    card.classList.remove('focused');
                });

                // Ensure proper ARIA
                if (!link.getAttribute('aria-label') && !link.textContent.trim()) {
                    const title = card.querySelector('h3, h4, .card-title');
                    if (title) {
                        link.setAttribute('aria-label', title.textContent.trim());
                    }
                }
            }

            // If card has interactive elements
            const interactiveElements = card.querySelectorAll('button, a');
            if (interactiveElements.length > 1) {
                // Multiple interactive elements - ensure they're all keyboard accessible
                card.setAttribute('role', 'article');
            }
        });
    }

    setupLiveRegion() {
        if (!this.options.announceUpdates) return;

        this.liveRegion = document.createElement('div');
        this.liveRegion.setAttribute('role', 'status');
        this.liveRegion.setAttribute('aria-live', 'polite');
        this.liveRegion.setAttribute('aria-atomic', 'true');
        this.liveRegion.className = 'sr-only';
        this.container.appendChild(this.liveRegion);
    }

    setupPagination() {
        const paginationContainer = document.createElement('nav');
        paginationContainer.className = 'pagination-container';
        paginationContainer.setAttribute('aria-label', 'Pagination navigation');

        this.paginationContainer = paginationContainer;
        this.container.after(paginationContainer);

        this.renderPagination();
    }

    renderPagination() {
        const maxVisible = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(this.totalPages, startPage + maxVisible - 1);

        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        let html = '<ul class="pagination" role="list">';

        // Previous button
        html += `
            <li>
                <button
                    class="pagination-btn pagination-prev"
                    ${this.currentPage === 1 ? 'disabled' : ''}
                    aria-label="Previous page"
                    data-page="${this.currentPage - 1}">
                    <span aria-hidden="true">‹</span>
                    <span class="sr-only">Previous</span>
                </button>
            </li>
        `;

        // First page
        if (startPage > 1) {
            html += `
                <li>
                    <button class="pagination-btn" data-page="1" aria-label="Go to page 1">1</button>
                </li>
            `;
            if (startPage > 2) {
                html += '<li><span class="pagination-ellipsis" aria-hidden="true">…</span></li>';
            }
        }

        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            const isCurrent = i === this.currentPage;
            html += `
                <li>
                    <button
                        class="pagination-btn ${isCurrent ? 'active' : ''}"
                        data-page="${i}"
                        ${isCurrent ? 'aria-current="page"' : ''}
                        aria-label="${isCurrent ? 'Current page, page' : 'Go to page'} ${i}">
                        ${i}
                    </button>
                </li>
            `;
        }

        // Last page
        if (endPage < this.totalPages) {
            if (endPage < this.totalPages - 1) {
                html += '<li><span class="pagination-ellipsis" aria-hidden="true">…</span></li>';
            }
            html += `
                <li>
                    <button class="pagination-btn" data-page="${this.totalPages}"
                        aria-label="Go to page ${this.totalPages}">
                        ${this.totalPages}
                    </button>
                </li>
            `;
        }

        // Next button
        html += `
            <li>
                <button
                    class="pagination-btn pagination-next"
                    ${this.currentPage === this.totalPages ? 'disabled' : ''}
                    aria-label="Next page"
                    data-page="${this.currentPage + 1}">
                    <span aria-hidden="true">›</span>
                    <span class="sr-only">Next</span>
                </button>
            </li>
        `;

        html += '</ul>';

        this.paginationContainer.innerHTML = html;

        // Add event listeners
        this.paginationContainer.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = parseInt(e.currentTarget.dataset.page);
                if (!isNaN(page)) {
                    this.goToPage(page);
                }
            });
        });
    }

    setupLoadMore() {
        if (!this.options.loadMoreButton) return;

        const loadMoreContainer = document.createElement('div');
        loadMoreContainer.className = 'load-more-container';
        loadMoreContainer.innerHTML = `
            <button class="load-more-btn" aria-label="Load more items">
                <span class="load-more-text">Load More</span>
                <span class="load-more-spinner" aria-hidden="true" hidden></span>
            </button>
            <p class="load-more-status" aria-live="polite"></p>
        `;

        this.loadMoreBtn = loadMoreContainer.querySelector('.load-more-btn');
        this.loadMoreStatus = loadMoreContainer.querySelector('.load-more-status');

        this.container.after(loadMoreContainer);

        this.loadMoreBtn.addEventListener('click', () => {
            this.loadMore();
        });

        this.updateLoadMoreButton();
    }

    showPage(pageNumber) {
        this.currentPage = pageNumber;

        const startIndex = (pageNumber - 1) * this.options.itemsPerPage;
        const endIndex = startIndex + this.options.itemsPerPage;

        // Hide all items
        this.allItems.forEach((item, index) => {
            if (index >= startIndex && index < endIndex) {
                item.style.display = '';
                item.removeAttribute('hidden');
            } else {
                item.style.display = 'none';
                item.setAttribute('hidden', '');
            }
        });

        if (this.paginationContainer) {
            this.renderPagination();
        }

        this.updateLoadMoreButton();
        this.announcePageChange();
    }

    goToPage(pageNumber) {
        if (pageNumber < 1 || pageNumber > this.totalPages) return;

        this.showPage(pageNumber);

        // Scroll to top of grid
        this.container.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Focus first item on new page
        const firstVisibleItem = this.allItems.find(item => !item.hasAttribute('hidden'));
        if (firstVisibleItem) {
            const focusTarget = firstVisibleItem.querySelector('a, button') || firstVisibleItem;
            focusTarget.focus();
        }
    }

    loadMore() {
        if (this.currentPage >= this.totalPages) return;

        this.loadMoreBtn.disabled = true;
        this.loadMoreBtn.querySelector('.load-more-text').textContent = 'Loading...';

        // Simulate loading delay
        setTimeout(() => {
            this.currentPage++;

            const startIndex = (this.currentPage - 1) * this.options.itemsPerPage;
            const endIndex = startIndex + this.options.itemsPerPage;

            // Show next batch
            for (let i = startIndex; i < endIndex && i < this.allItems.length; i++) {
                this.allItems[i].style.display = '';
                this.allItems[i].removeAttribute('hidden');
            }

            this.loadMoreBtn.disabled = false;
            this.loadMoreBtn.querySelector('.load-more-text').textContent = 'Load More';

            this.updateLoadMoreButton();
            this.announceLoadMore(endIndex - startIndex);

            // Focus first newly loaded item
            if (this.allItems[startIndex]) {
                const focusTarget = this.allItems[startIndex].querySelector('a, button') ||
                                  this.allItems[startIndex];
                focusTarget.focus();
            }
        }, 500);
    }

    updateLoadMoreButton() {
        if (!this.loadMoreBtn) return;

        if (this.currentPage >= this.totalPages) {
            this.loadMoreBtn.style.display = 'none';
        } else {
            this.loadMoreBtn.style.display = '';
        }
    }

    announcePageChange() {
        if (!this.liveRegion) return;

        const startItem = ((this.currentPage - 1) * this.options.itemsPerPage) + 1;
        const endItem = Math.min(this.currentPage * this.options.itemsPerPage, this.allItems.length);

        this.liveRegion.textContent = `Showing items ${startItem} to ${endItem} of ${this.allItems.length}. Page ${this.currentPage} of ${this.totalPages}.`;
    }

    announceLoadMore(itemsLoaded) {
        if (!this.liveRegion) return;

        this.liveRegion.textContent = `${itemsLoaded} more items loaded. ${this.allItems.length - (this.currentPage * this.options.itemsPerPage)} items remaining.`;
    }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('[data-accessible-grid]');
    grids.forEach(grid => {
        const options = {
            itemsPerPage: parseInt(grid.dataset.itemsPerPage) || 12,
            loadMoreButton: grid.dataset.loadMore !== 'false'
        };
        new AccessibleCardGrid(grid, options);
    });
});
