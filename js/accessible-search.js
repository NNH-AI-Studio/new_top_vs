/**
 * Accessible Search Component
 * Live search with ARIA live regions and keyboard navigation
 * Progressive enhancement: works as regular search without JS
 */

class AccessibleSearch {
    constructor(searchContainer) {
        this.container = searchContainer;
        this.input = searchContainer.querySelector('input[type="search"], input[type="text"]');
        this.resultsContainer = searchContainer.querySelector('.search-results') ||
                               this.createResultsContainer();
        this.debounceTimer = null;
        this.currentFocus = -1;
        this.results = [];

        this.init();
    }

    init() {
        this.setupARIA();
        this.setupEventListeners();
        this.setupKeyboardNavigation();
    }

    createResultsContainer() {
        const container = document.createElement('div');
        container.className = 'search-results';
        container.setAttribute('role', 'listbox');
        this.input.parentNode.appendChild(container);
        return container;
    }

    setupARIA() {
        // Input field
        this.input.setAttribute('role', 'combobox');
        this.input.setAttribute('aria-autocomplete', 'list');
        this.input.setAttribute('aria-expanded', 'false');
        this.input.setAttribute('aria-controls', 'search-results-list');

        // Results container
        this.resultsContainer.setAttribute('id', 'search-results-list');
        this.resultsContainer.setAttribute('role', 'listbox');

        // Live region for screen reader announcements
        this.liveRegion = document.createElement('div');
        this.liveRegion.setAttribute('role', 'status');
        this.liveRegion.setAttribute('aria-live', 'polite');
        this.liveRegion.setAttribute('aria-atomic', 'true');
        this.liveRegion.className = 'sr-only';
        this.container.appendChild(this.liveRegion);
    }

    setupEventListeners() {
        // Input events
        this.input.addEventListener('input', (e) => {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                this.handleSearch(e.target.value);
            }, 300);
        });

        this.input.addEventListener('focus', () => {
            if (this.results.length > 0) {
                this.showResults();
            }
        });

        // Click outside to close
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this.hideResults();
            }
        });

        // Result selection
        this.resultsContainer.addEventListener('click', (e) => {
            const option = e.target.closest('[role="option"]');
            if (option) {
                this.selectResult(option);
            }
        });
    }

    setupKeyboardNavigation() {
        this.input.addEventListener('keydown', (e) => {
            const options = this.resultsContainer.querySelectorAll('[role="option"]');

            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    this.currentFocus++;
                    if (this.currentFocus >= options.length) this.currentFocus = 0;
                    this.setActiveOption(options);
                    break;

                case 'ArrowUp':
                    e.preventDefault();
                    this.currentFocus--;
                    if (this.currentFocus < 0) this.currentFocus = options.length - 1;
                    this.setActiveOption(options);
                    break;

                case 'Enter':
                    e.preventDefault();
                    if (this.currentFocus > -1 && options[this.currentFocus]) {
                        this.selectResult(options[this.currentFocus]);
                    }
                    break;

                case 'Escape':
                    this.hideResults();
                    break;

                case 'Home':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.currentFocus = 0;
                        this.setActiveOption(options);
                    }
                    break;

                case 'End':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.currentFocus = options.length - 1;
                        this.setActiveOption(options);
                    }
                    break;
            }
        });
    }

    async handleSearch(query) {
        if (!query.trim()) {
            this.hideResults();
            return;
        }

        // Show loading state
        this.showLoading();

        try {
            // Perform search (this would be your actual search logic)
            const results = await this.performSearch(query);
            this.displayResults(results, query);
        } catch (error) {
            this.showError('Search failed. Please try again.');
        }
    }

    async performSearch(query) {
        // Mock search - replace with your actual search implementation
        // This could search through your comparisons data
        return new Promise((resolve) => {
            setTimeout(() => {
                // Example mock data
                const allComparisons = [
                    { title: 'iPhone vs Samsung', url: '/en/iphone-vs-samsung.html' },
                    { title: 'Netflix vs Disney+', url: '/en/netflix-vs-disney.html' },
                    { title: 'Mac vs PC', url: '/en/mac-vs-pc.html' }
                ];

                const filtered = allComparisons.filter(item =>
                    item.title.toLowerCase().includes(query.toLowerCase())
                );

                resolve(filtered);
            }, 200);
        });
    }

    showLoading() {
        this.resultsContainer.innerHTML = `
            <div class="search-loading" role="status">
                <span class="sr-only">Searching...</span>
                <div class="loading-spinner" aria-hidden="true"></div>
            </div>
        `;
        this.resultsContainer.classList.add('active');
        this.input.setAttribute('aria-expanded', 'true');
    }

    displayResults(results, query) {
        this.results = results;
        this.currentFocus = -1;

        if (results.length === 0) {
            this.showNoResults(query);
            return;
        }

        // Build results HTML
        const resultsHTML = results.map((result, index) => `
            <a href="${result.url}"
               role="option"
               id="search-option-${index}"
               class="search-result-item"
               aria-selected="false">
                <span class="result-title">${this.highlightMatch(result.title, query)}</span>
            </a>
        `).join('');

        this.resultsContainer.innerHTML = resultsHTML;
        this.resultsContainer.classList.add('active');
        this.input.setAttribute('aria-expanded', 'true');

        // Announce results to screen readers
        this.announceResults(results.length);
    }

    highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    showNoResults(query) {
        this.resultsContainer.innerHTML = `
            <div class="search-no-results" role="status">
                <p>No results found for "<strong>${query}</strong>"</p>
                <p class="search-help-text">Try different keywords or check spelling</p>
            </div>
        `;
        this.resultsContainer.classList.add('active');
        this.announceResults(0);
    }

    showError(message) {
        this.resultsContainer.innerHTML = `
            <div class="search-error" role="alert">
                <p>${message}</p>
            </div>
        `;
        this.resultsContainer.classList.add('active');
    }

    hideResults() {
        this.resultsContainer.classList.remove('active');
        this.input.setAttribute('aria-expanded', 'false');
        this.currentFocus = -1;
    }

    showResults() {
        if (this.results.length > 0) {
            this.resultsContainer.classList.add('active');
            this.input.setAttribute('aria-expanded', 'true');
        }
    }

    setActiveOption(options) {
        // Remove previous active state
        options.forEach(option => {
            option.classList.remove('active');
            option.setAttribute('aria-selected', 'false');
        });

        // Set new active state
        if (this.currentFocus >= 0 && this.currentFocus < options.length) {
            options[this.currentFocus].classList.add('active');
            options[this.currentFocus].setAttribute('aria-selected', 'true');
            this.input.setAttribute('aria-activedescendant', options[this.currentFocus].id);

            // Scroll into view if needed
            options[this.currentFocus].scrollIntoView({
                block: 'nearest',
                behavior: 'smooth'
            });
        } else {
            this.input.removeAttribute('aria-activedescendant');
        }
    }

    selectResult(option) {
        const href = option.getAttribute('href');
        if (href) {
            window.location.href = href;
        }
    }

    announceResults(count) {
        if (count === 0) {
            this.liveRegion.textContent = 'No results found';
        } else if (count === 1) {
            this.liveRegion.textContent = '1 result found';
        } else {
            this.liveRegion.textContent = `${count} results found`;
        }
    }
}

// Initialize all search components
document.addEventListener('DOMContentLoaded', () => {
    const searchContainers = document.querySelectorAll('.search-container');
    searchContainers.forEach(container => {
        new AccessibleSearch(container);
    });
});
