// Rating System
// نظام التقييم

function initRating() {
    const ratingContainers = document.querySelectorAll('.rating-system');
    
    ratingContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        const ratingValue = container.querySelector('.rating-value');
        const pageId = container.dataset.pageId || window.location.pathname;
        
        // Load saved rating
        const savedRating = getRating(pageId);
        if (savedRating) {
            updateStars(stars, savedRating);
            if (ratingValue) {
                ratingValue.textContent = `${savedRating}/5`;
            }
        }
        
        // Add click handlers
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                const rating = index + 1;
                saveRating(pageId, rating);
                updateStars(stars, rating);
                
                if (ratingValue) {
                    ratingValue.textContent = `${rating}/5`;
                }
                
                showRatingMessage('Thank you for rating!');
            });
            
            star.addEventListener('mouseenter', () => {
                highlightStars(stars, index + 1);
            });
        });
        
        container.addEventListener('mouseleave', () => {
            const currentRating = getRating(pageId) || 0;
            updateStars(stars, currentRating);
        });
    });
}

function updateStars(stars, rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
            star.textContent = '★';
        } else {
            star.classList.remove('active');
            star.textContent = '☆';
        }
    });
}

function highlightStars(stars, count) {
    stars.forEach((star, index) => {
        if (index < count) {
            star.textContent = '★';
        } else {
            star.textContent = '☆';
        }
    });
}

function saveRating(pageId, rating) {
    const ratings = JSON.parse(localStorage.getItem('ratings') || '{}');
    ratings[pageId] = rating;
    localStorage.setItem('ratings', JSON.stringify(ratings));
}

function getRating(pageId) {
    const ratings = JSON.parse(localStorage.getItem('ratings') || '{}');
    return ratings[pageId] || 0;
}

function showRatingMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'rating-message';
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => messageDiv.remove(), 300);
    }, 2000);
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRating);
} else {
    initRating();
}
