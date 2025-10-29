// Search Functionality
// وظيفة البحث في الموقع

const searchData = [
    // Technology
    { title: "iPhone 15 Pro vs Samsung Galaxy S24 Ultra", url: "en/iphone-vs-samsung.html", category: "Technology" },
    { title: "Windows vs Mac", url: "en/windows-vs-mac.html", category: "Technology" },
    { title: "Android vs iOS", url: "en/android-vs-ios.html", category: "Technology" },
    
    // Entertainment
    { title: "Netflix vs Disney Plus", url: "en/netflix-vs-disney.html", category: "Entertainment" },
    { title: "Spotify vs Apple Music", url: "en/spotify-vs-apple.html", category: "Entertainment" },
    
    // Gaming
    { title: "PlayStation 5 vs Xbox Series X", url: "en/playstation-vs-xbox.html", category: "Gaming" },
    
    // Automotive
    { title: "Electric Car vs Gas Car", url: "en/electric-vs-gas-car.html", category: "Automotive" },
    
    // Arabic
    { title: "آيفون 15 برو مقابل سامسونج جالاكسي S24 ألترا", url: "ar/iphone-vs-samsung.html", category: "تقنية" },
    { title: "نتفليكس مقابل ديزني بلس", url: "ar/netflix-vs-disney.html", category: "ترفيه" },
];

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );
        
        displayResults(results);
    });
    
    // Close results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchResults.style.display = 'none';
        }
    });
}

function displayResults(results) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No results found</div>';
        searchResults.style.display = 'block';
        return;
    }
    
    const html = results.map(item => `
        <a href="${item.url}" class="search-result-item">
            <div class="result-category">${item.category}</div>
            <div class="result-title">${item.title}</div>
        </a>
    `).join('');
    
    searchResults.innerHTML = html;
    searchResults.style.display = 'block';
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
} else {
    initSearch();
}
