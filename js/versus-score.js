// Versus Score System
// نظام تقييم المقارنات

function initVersusScore() {
    const scoreContainers = document.querySelectorAll('.versus-score-container');
    
    scoreContainers.forEach(container => {
        const scores = {
            productA: {
                performance: parseInt(container.dataset.aPerformance) || 0,
                price: parseInt(container.dataset.aPrice) || 0,
                features: parseInt(container.dataset.aFeatures) || 0,
                userRating: parseInt(container.dataset.aRating) || 0
            },
            productB: {
                performance: parseInt(container.dataset.bPerformance) || 0,
                price: parseInt(container.dataset.bPrice) || 0,
                features: parseInt(container.dataset.bFeatures) || 0,
                userRating: parseInt(container.dataset.bRating) || 0
            }
        };
        
        // Calculate overall scores
        const overallA = calculateOverall(scores.productA);
        const overallB = calculateOverall(scores.productB);
        
        // Render scores
        renderScores(container, scores, overallA, overallB);
        
        // Determine winner
        determineWinner(container, overallA, overallB);
    });
}

function calculateOverall(scores) {
    const total = scores.performance + scores.price + scores.features + scores.userRating;
    return Math.round(total / 4);
}

function renderScores(container, scores, overallA, overallB) {
    const html = `
        <div class="score-comparison">
            <div class="score-product">
                <div class="score-header">
                    <h3>${container.dataset.productA || 'Product A'}</h3>
                    <div class="score-overall ${overallA > overallB ? 'winner' : ''}">${overallA}/100</div>
                </div>
                <div class="score-breakdown">
                    ${renderScoreBar('Performance', scores.productA.performance, scores.productB.performance)}
                    ${renderScoreBar('Price Value', scores.productA.price, scores.productB.price)}
                    ${renderScoreBar('Features', scores.productA.features, scores.productB.features)}
                    ${renderScoreBar('User Rating', scores.productA.userRating, scores.productB.userRating)}
                </div>
            </div>
            
            <div class="score-vs">VS</div>
            
            <div class="score-product">
                <div class="score-header">
                    <h3>${container.dataset.productB || 'Product B'}</h3>
                    <div class="score-overall ${overallB > overallA ? 'winner' : ''}">${overallB}/100</div>
                </div>
                <div class="score-breakdown">
                    ${renderScoreBar('Performance', scores.productB.performance, scores.productA.performance)}
                    ${renderScoreBar('Price Value', scores.productB.price, scores.productA.price)}
                    ${renderScoreBar('Features', scores.productB.features, scores.productA.features)}
                    ${renderScoreBar('User Rating', scores.productB.userRating, scores.productA.userRating)}
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

function renderScoreBar(label, score, compareScore) {
    const isWinner = score > compareScore;
    return `
        <div class="score-item ${isWinner ? 'winner' : ''}">
            <div class="score-label">${label}</div>
            <div class="score-bar-container">
                <div class="score-bar" style="width: ${score}%"></div>
            </div>
            <div class="score-value">${score}</div>
        </div>
    `;
}

function determineWinner(container, overallA, overallB) {
    const winnerBadge = document.createElement('div');
    winnerBadge.className = 'winner-badge';
    
    if (overallA > overallB) {
        winnerBadge.innerHTML = `
            <div class="badge-icon">🏆</div>
            <div class="badge-text">Winner: ${container.dataset.productA}</div>
            <div class="badge-score">${overallA}/100</div>
        `;
    } else if (overallB > overallA) {
        winnerBadge.innerHTML = `
            <div class="badge-icon">🏆</div>
            <div class="badge-text">Winner: ${container.dataset.productB}</div>
            <div class="badge-score">${overallB}/100</div>
        `;
    } else {
        winnerBadge.innerHTML = `
            <div class="badge-icon">🤝</div>
            <div class="badge-text">It's a Tie!</div>
            <div class="badge-score">${overallA}/100</div>
        `;
    }
    
    container.insertAdjacentElement('beforebegin', winnerBadge);
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVersusScore);
} else {
    initVersusScore();
}
