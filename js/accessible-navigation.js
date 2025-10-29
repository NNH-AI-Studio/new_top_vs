/**
 * Accessible Navigation Component
 * Replaces hover-based dropdowns with keyboard-accessible, ARIA-compliant navigation
 * Progressive enhancement: works without JS
 */

class AccessibleNavigation {
    constructor(navElement) {
        this.nav = navElement;
        this.dropdowns = [];
        this.mobileMenu = null;
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupDropdowns();
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupReducedMotion();
    }

    /**
     * Mobile Menu with proper ARIA states
     */
    setupMobileMenu() {
        const toggle = this.nav.querySelector('.nav-toggle');
        const menu = this.nav.querySelector('.nav-links');

        if (!toggle || !menu) return;

        // Add ARIA attributes
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-controls', 'main-navigation');
        menu.setAttribute('id', 'main-navigation');

        // Toggle function
        const toggleMenu = () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
            menu.classList.toggle('active');

            // Lock body scroll when menu is open
            document.body.style.overflow = !isExpanded ? 'hidden' : '';

            // Focus management
            if (!isExpanded) {
                const firstLink = menu.querySelector('a, button');
                if (firstLink) firstLink.focus();
            }
        };

        // Click handler
        toggle.addEventListener('click', toggleMenu);

        // Escape key to close
        menu.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                toggleMenu();
                toggle.focus();
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!this.nav.contains(e.target) && menu.classList.contains('active')) {
                toggleMenu();
            }
        });

        this.mobileMenu = { toggle, menu, toggleMenu };
    }

    /**
     * Accessible Dropdown Navigation
     * Replaces hover-only with click/keyboard accessible version
     */
    setupDropdowns() {
        const dropdownTriggers = this.nav.querySelectorAll('[aria-haspopup="true"]');

        dropdownTriggers.forEach(trigger => {
            const menu = document.getElementById(trigger.getAttribute('aria-controls'));
            if (!menu) return;

            const dropdown = {
                trigger,
                menu,
                isOpen: false
            };

            // Initialize ARIA states
            trigger.setAttribute('aria-expanded', 'false');
            menu.setAttribute('role', 'menu');
            menu.querySelectorAll('a').forEach(link => {
                link.setAttribute('role', 'menuitem');
                link.setAttribute('tabindex', '-1');
            });

            // Click to toggle
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleDropdown(dropdown);
            });

            // Arrow keys navigation
            trigger.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.openDropdown(dropdown);
                    const firstItem = menu.querySelector('[role="menuitem"]');
                    if (firstItem) firstItem.focus();
                }
            });

            // Menu keyboard navigation
            menu.addEventListener('keydown', (e) => {
                this.handleMenuKeyboard(e, dropdown);
            });

            this.dropdowns.push(dropdown);
        });
    }

    toggleDropdown(dropdown) {
        if (dropdown.isOpen) {
            this.closeDropdown(dropdown);
        } else {
            // Close other dropdowns
            this.dropdowns.forEach(d => {
                if (d !== dropdown) this.closeDropdown(d);
            });
            this.openDropdown(dropdown);
        }
    }

    openDropdown(dropdown) {
        dropdown.isOpen = true;
        dropdown.trigger.setAttribute('aria-expanded', 'true');
        dropdown.menu.classList.add('active');
        dropdown.menu.querySelectorAll('[role="menuitem"]').forEach(item => {
            item.setAttribute('tabindex', '0');
        });
    }

    closeDropdown(dropdown) {
        dropdown.isOpen = false;
        dropdown.trigger.setAttribute('aria-expanded', 'false');
        dropdown.menu.classList.remove('active');
        dropdown.menu.querySelectorAll('[role="menuitem"]').forEach(item => {
            item.setAttribute('tabindex', '-1');
        });
    }

    handleMenuKeyboard(e, dropdown) {
        const items = Array.from(dropdown.menu.querySelectorAll('[role="menuitem"]'));
        const currentIndex = items.indexOf(document.activeElement);

        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % items.length;
                items[nextIndex].focus();
                break;

            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
                items[prevIndex].focus();
                break;

            case 'Home':
                e.preventDefault();
                items[0].focus();
                break;

            case 'End':
                e.preventDefault();
                items[items.length - 1].focus();
                break;

            case 'Escape':
                e.preventDefault();
                this.closeDropdown(dropdown);
                dropdown.trigger.focus();
                break;

            case 'Tab':
                this.closeDropdown(dropdown);
                break;
        }
    }

    /**
     * Keyboard Navigation
     */
    setupKeyboardNavigation() {
        // Allow skipping to main content
        this.addSkipLink();

        // Focus visible for keyboard users
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }

    addSkipLink() {
        if (document.querySelector('.skip-to-content')) return;

        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-to-content';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);

        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const mainContent = document.getElementById('main-content') ||
                               document.querySelector('main') ||
                               document.querySelector('[role="main"]');
            if (mainContent) {
                mainContent.setAttribute('tabindex', '-1');
                mainContent.focus();
                mainContent.removeAttribute('tabindex');
            }
        });
    }

    /**
     * Focus Management
     */
    setupFocusManagement() {
        // Trap focus in modal-like mobile menu
        if (this.mobileMenu) {
            const { menu } = this.mobileMenu;

            menu.addEventListener('keydown', (e) => {
                if (!menu.classList.contains('active')) return;

                if (e.key === 'Tab') {
                    const focusableElements = menu.querySelectorAll(
                        'a, button, [tabindex]:not([tabindex="-1"])'
                    );
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];

                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            });
        }
    }

    /**
     * Respect user's motion preferences
     */
    setupReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        const handleMotionPreference = (e) => {
            if (e.matches) {
                document.documentElement.classList.add('reduce-motion');
            } else {
                document.documentElement.classList.remove('reduce-motion');
            }
        };

        handleMotionPreference(prefersReducedMotion);
        prefersReducedMotion.addEventListener('change', handleMotionPreference);
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.navbar');
    if (nav) {
        new AccessibleNavigation(nav);
    }
});
