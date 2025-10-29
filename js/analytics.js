// Google Analytics Tracking Code
// Replace G-XXXXXXXXXX with your actual Measurement ID when available

// Check if Google Analytics ID is configured
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
} else {
}
