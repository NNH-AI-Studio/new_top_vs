// Products VS - Main JavaScript
// Interactive functionality for the bilingual comparison website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLanguageDetection();
    initSmoothScrolling();
    initAnimations();
    initMobileMenu();
    initThemeToggle();
    initComparisonCards();
    initSearchFunctionality();
});

// Language Detection and RTL Support
function initLanguageDetection() {
    const currentLang = document.documentElement.lang;
    
    if (currentLang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        // Load RTL CSS
        loadRTLStyles();
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
    
    // Update language switcher URLs
    updateLanguageSwitcher();
}

function loadRTLStyles() {
    const rtlLink = document.createElement('link');
    rtlLink.rel = 'stylesheet';
    rtlLink.href = 'css/rtl.css';
    document.head.appendChild(rtlLink);
}

function updateLanguageSwitcher() {
    const currentPath = window.location.pathname;
    const languageSwitchers = document.querySelectorAll('.language-switcher');
    
    languageSwitchers.forEach(switcher => {
        const langBtn = switcher.querySelector('.lang-btn');
        if (langBtn) {
            if (document.documentElement.lang === 'ar') {
                // Arabic page - link to English
                const englishPath = currentPath.replace('/ar/', '/en/');
                langBtn.href = englishPath;
            } else {
                // English page - link to Arabic
                const arabicPath = currentPath.replace('/en/', '/ar/');
                langBtn.href = arabicPath;
            }
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animations and Scroll Effects
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.language-card, .comparison-item, .footer-section');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for animations
    const animationCSS = `
        <style>
        .language-card, .comparison-item, .footer-section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .language-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', animationCSS);
}

// Mobile Menu
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    if (navToggle && navLinks) {
        // Toggle menu on button click
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navLinks.classList.toggle('active');
            navbar.classList.toggle('nav-open');
        });

        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                navbar.classList.remove('nav-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target)) {
                navLinks.classList.remove('active');
                navbar.classList.remove('nav-open');
            }
        });
    }
}

// Theme Toggle (Optional Dark Mode)
function initThemeToggle() {
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Theme toggle button (if added to HTML)
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// Comparison Cards Interaction
function initComparisonCards() {
    const comparisonItems = document.querySelectorAll('.comparison-item');
    
    comparisonItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Search Functionality (for future implementation)
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            // Search functionality can be implemented here
        });
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance monitoring
function initPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                
                // Send performance data to analytics (if implemented)
                if (pageLoadTime > 3000) {
                }
            }, 0);
        });
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Error reporting can be implemented here
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker registration can be added here for future PWA features
    });
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initLanguageDetection,
        initSmoothScrolling,
        initAnimations,
        updateLanguageSwitcher
    };
}
