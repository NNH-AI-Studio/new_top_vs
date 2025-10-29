// Newsletter Signup
// نموذج الاشتراك في النشرة البريدية

function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = form.querySelector('input[type="email"]').value;
        const button = form.querySelector('button');
        const originalText = button.textContent;
        
        // Validate email
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        // Simulate API call (replace with your actual API)
        try {
            await subscribeToNewsletter(email);
            showMessage('Thank you for subscribing!', 'success');
            form.reset();
        } catch (error) {
            showMessage('Something went wrong. Please try again.', 'error');
        } finally {
            button.textContent = originalText;
            button.disabled = false;
        }
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

async function subscribeToNewsletter(email) {
    // Replace this with your actual newsletter API
    // Example: Mailchimp, SendGrid, etc.
    
    return new Promise((resolve) => {
        setTimeout(() => {
            // Store in localStorage for demo
            const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
            subscribers.push({ email, date: new Date().toISOString() });
            localStorage.setItem('subscribers', JSON.stringify(subscribers));
            resolve();
        }, 1000);
    });
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `newsletter-message ${type}`;
    messageDiv.textContent = message;
    
    const form = document.getElementById('newsletterForm');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNewsletter);
} else {
    initNewsletter();
}
