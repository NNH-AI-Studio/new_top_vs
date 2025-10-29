/**
 * Price History Tracker
 * عرض تاريخ الأسعار للمنتجات
 */

class PriceHistory {
    constructor(productId, productName, currentPrice) {
        this.productId = productId;
        this.productName = productName;
        this.currentPrice = currentPrice;
        this.priceData = this.generatePriceHistory();
    }

    // توليد بيانات تاريخ الأسعار (في الواقع، ستأتي من database أو API)
    generatePriceHistory() {
        const months = 6;
        const data = [];
        const today = new Date();
        
        // توليد أسعار عشوائية واقعية
        const basePrice = this.currentPrice;
        const variation = basePrice * 0.15; // تغيير بنسبة ±15%
        
        for (let i = months; i >= 0; i--) {
            const date = new Date(today);
            date.setMonth(date.getMonth() - i);
            
            // حساب السعر مع بعض التذبذب
            let price;
            if (i === 0) {
                price = this.currentPrice; // السعر الحالي
            } else {
                const randomVariation = (Math.random() - 0.5) * variation;
                price = basePrice + randomVariation;
                price = Math.round(price / 10) * 10; // تقريب لأقرب 10
            }
            
            data.push({
                date: date,
                price: price,
                month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
            });
        }
        
        return data;
    }

    // حساب الإحصائيات
    getStats() {
        const prices = this.priceData.map(d => d.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
        
        const priceDiff = this.currentPrice - this.priceData[0].price;
        const priceChangePercent = (priceDiff / this.priceData[0].price) * 100;
        
        return {
            min: minPrice,
            max: maxPrice,
            avg: Math.round(avgPrice),
            current: this.currentPrice,
            change: priceDiff,
            changePercent: priceChangePercent.toFixed(1),
            trend: priceDiff > 0 ? 'up' : priceDiff < 0 ? 'down' : 'stable'
        };
    }

    // رسم الرسم البياني
    renderChart(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const stats = this.getStats();
        const data = this.priceData;
        
        // إنشاء HTML للرسم البياني
        const chartHTML = `
            <div class="price-history-chart">
                <div class="chart-header">
                    <h3 class="chart-title">💰 Price History</h3>
                    <div class="chart-subtitle">${this.productName}</div>
                </div>
                
                <div class="price-stats">
                    <div class="stat-card">
                        <div class="stat-label">Current Price</div>
                        <div class="stat-value">$${this.currentPrice}</div>
                        <div class="stat-change ${stats.trend}">
                            ${stats.trend === 'up' ? '↗' : stats.trend === 'down' ? '↘' : '→'} 
                            ${stats.changePercent}%
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Lowest Price</div>
                        <div class="stat-value">$${stats.min}</div>
                        <div class="stat-subtext">6 months low</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Highest Price</div>
                        <div class="stat-value">$${stats.max}</div>
                        <div class="stat-subtext">6 months high</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Average Price</div>
                        <div class="stat-value">$${stats.avg}</div>
                        <div class="stat-subtext">6 months avg</div>
                    </div>
                </div>
                
                <div class="chart-container">
                    <div class="chart-grid" id="chart-${this.productId}">
                        ${this.renderBars(data, stats)}
                    </div>
                    <div class="chart-labels">
                        ${data.map(d => `<div class="chart-label">${d.month}</div>`).join('')}
                    </div>
                </div>
                
                <div class="price-recommendation">
                    ${this.getRecommendation(stats)}
                </div>
            </div>
        `;
        
        container.innerHTML = chartHTML;
    }

    // رسم الأعمدة
    renderBars(data, stats) {
        const maxPrice = stats.max;
        const minPrice = stats.min;
        const range = maxPrice - minPrice;
        
        return data.map((point, index) => {
            const height = range > 0 ? ((point.price - minPrice) / range) * 100 : 50;
            const isLowest = point.price === minPrice;
            const isHighest = point.price === maxPrice;
            const isCurrent = index === data.length - 1;
            
            let barClass = 'chart-bar';
            if (isCurrent) barClass += ' current';
            if (isLowest) barClass += ' lowest';
            if (isHighest) barClass += ' highest';
            
            return `
                <div class="chart-bar-container">
                    <div class="${barClass}" style="height: ${height}%">
                        <div class="bar-price">$${point.price}</div>
                        ${isLowest ? '<div class="bar-badge lowest-badge">Lowest</div>' : ''}
                        ${isHighest ? '<div class="bar-badge highest-badge">Highest</div>' : ''}
                        ${isCurrent ? '<div class="bar-badge current-badge">Now</div>' : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    // الحصول على التوصية
    getRecommendation(stats) {
        const isRTL = document.documentElement.lang === 'ar';
        
        if (stats.current === stats.min) {
            return `
                <div class="recommendation good">
                    <span class="rec-icon">🎉</span>
                    <span class="rec-text">
                        ${isRTL ? 'رائع! السعر الحالي هو الأقل في 6 أشهر!' : 'Great! Current price is the lowest in 6 months!'}
                    </span>
                </div>
            `;
        } else if (stats.current === stats.max) {
            return `
                <div class="recommendation bad">
                    <span class="rec-icon">⚠️</span>
                    <span class="rec-text">
                        ${isRTL ? 'انتبه! السعر الحالي هو الأعلى في 6 أشهر. قد يكون من الأفضل الانتظار.' : 'Warning! Current price is the highest in 6 months. Consider waiting.'}
                    </span>
                </div>
            `;
        } else if (stats.current < stats.avg) {
            return `
                <div class="recommendation good">
                    <span class="rec-icon">👍</span>
                    <span class="rec-text">
                        ${isRTL ? 'جيد! السعر أقل من المتوسط. وقت جيد للشراء!' : 'Good! Price is below average. Good time to buy!'}
                    </span>
                </div>
            `;
        } else if (stats.current > stats.avg) {
            return `
                <div class="recommendation neutral">
                    <span class="rec-icon">💡</span>
                    <span class="rec-text">
                        ${isRTL ? 'السعر أعلى من المتوسط. قد ترغب في الانتظار للحصول على صفقة أفضل.' : 'Price is above average. You might want to wait for a better deal.'}
                    </span>
                </div>
            `;
        } else {
            return `
                <div class="recommendation neutral">
                    <span class="rec-icon">ℹ️</span>
                    <span class="rec-text">
                        ${isRTL ? 'السعر قريب من المتوسط.' : 'Price is close to average.'}
                    </span>
                </div>
            `;
        }
    }

    // إنشاء HTML مبسط للعرض السريع
    static createQuickView(productName, currentPrice, trend = 'stable', changePercent = 0) {
        const trendIcon = trend === 'up' ? '↗️' : trend === 'down' ? '↘️' : '→';
        const trendClass = trend === 'up' ? 'trend-up' : trend === 'down' ? 'trend-down' : 'trend-stable';
        
        return `
            <div class="price-quick-view">
                <div class="price-current">
                    <span class="price-label">Current Price:</span>
                    <span class="price-amount">$${currentPrice}</span>
                </div>
                <div class="price-trend ${trendClass}">
                    <span class="trend-icon">${trendIcon}</span>
                    <span class="trend-value">${Math.abs(changePercent)}%</span>
                    <span class="trend-period">vs last month</span>
                </div>
            </div>
        `;
    }
}

// تهيئة المخططات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // البحث عن جميع عناصر price-history في الصفحة
    const priceElements = document.querySelectorAll('[data-price-history]');
    
    priceElements.forEach(el => {
        const productId = el.dataset.productId;
        const productName = el.dataset.productName;
        const currentPrice = parseInt(el.dataset.currentPrice);
        
        if (productId && productName && currentPrice) {
            const priceHistory = new PriceHistory(productId, productName, currentPrice);
            priceHistory.renderChart(el.id);
        }
    });
});

// تصدير الفئة للاستخدام العام
window.PriceHistory = PriceHistory;
