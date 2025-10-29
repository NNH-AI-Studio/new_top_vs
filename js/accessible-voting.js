/**
 * Accessible Voting System
 * Replacement for VS Battle with full keyboard support and ARIA
 * Progressive enhancement: works without JS (shows static results)
 */

class AccessibleVoting {
    constructor(container, options = {}) {
        this.container = container;
        this.battleId = container.id || `voting-${Date.now()}`;
        this.productA = options.productA || container.dataset.productA;
        this.productB = options.productB || container.dataset.productB;

        this.storageKey = `voting_${this.battleId}`;
        this.userVoteKey = `user_vote_${this.battleId}`;

        this.init();
    }

    init() {
        this.loadData();
        this.render();
        this.setupEventListeners();
        this.setupKeyboardNavigation();
    }

    loadData() {
        // Try to load from localStorage first
        const savedData = localStorage.getItem(this.storageKey);

        if (savedData) {
            const data = JSON.parse(savedData);
            this.votesA = data.votesA || 0;
            this.votesB = data.votesB || 0;
        } else {
            // Initial mock data
            this.votesA = Math.floor(Math.random() * 1000) + 500;
            this.votesB = Math.floor(Math.random() * 1000) + 500;
        }

        this.userVote = localStorage.getItem(this.userVoteKey);
    }

    saveData() {
        const data = {
            votesA: this.votesA,
            votesB: this.votesB,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    getPercentages() {
        const total = this.votesA + this.votesB;
        if (total === 0) return { percentA: 50, percentB: 50 };

        const percentA = Math.round((this.votesA / total) * 100);
        const percentB = 100 - percentA;

        return { percentA, percentB };
    }

    render() {
        const { percentA, percentB } = this.getPercentages();
        const total = this.votesA + this.votesB;
        const isRTL = document.documentElement.dir === 'rtl';

        const html = `
            <div class="accessible-voting" role="group" aria-labelledby="${this.battleId}-title">
                <h3 id="${this.battleId}-title" class="voting-title">
                    ${isRTL ? 'أيهما تفضل؟' : 'Which do you prefer?'}
                </h3>

                <div class="voting-options">
                    <div class="voting-option">
                        <button
                            class="voting-btn voting-btn-a ${this.userVote === 'A' ? 'voted' : ''}"
                            data-choice="A"
                            aria-pressed="${this.userVote === 'A'}"
                            ${this.userVote ? 'disabled' : ''}>
                            <span class="voting-product">${this.productA}</span>
                            <span class="voting-icon" aria-hidden="true">
                                ${this.userVote === 'A' ? '✓' : ''}
                            </span>
                        </button>

                        <div class="voting-stats" aria-label="Results for ${this.productA}">
                            <div class="voting-percentage" aria-label="${percentA} percent">${percentA}%</div>
                            <div class="voting-count">
                                <span class="sr-only">${this.votesA} votes</span>
                                <span aria-hidden="true">${this.formatNumber(this.votesA)} ${isRTL ? 'صوت' : 'votes'}</span>
                            </div>
                        </div>

                        <div class="voting-bar-container" role="progressbar"
                             aria-valuenow="${percentA}"
                             aria-valuemin="0"
                             aria-valuemax="100"
                             aria-label="${this.productA} has ${percentA}% of votes">
                            <div class="voting-bar voting-bar-a" style="width: ${percentA}%"></div>
                        </div>
                    </div>

                    <div class="voting-divider" aria-hidden="true">
                        <span class="voting-vs">VS</span>
                    </div>

                    <div class="voting-option">
                        <button
                            class="voting-btn voting-btn-b ${this.userVote === 'B' ? 'voted' : ''}"
                            data-choice="B"
                            aria-pressed="${this.userVote === 'B'}"
                            ${this.userVote ? 'disabled' : ''}>
                            <span class="voting-product">${this.productB}</span>
                            <span class="voting-icon" aria-hidden="true">
                                ${this.userVote === 'B' ? '✓' : ''}
                            </span>
                        </button>

                        <div class="voting-stats" aria-label="Results for ${this.productB}">
                            <div class="voting-percentage" aria-label="${percentB} percent">${percentB}%</div>
                            <div class="voting-count">
                                <span class="sr-only">${this.votesB} votes</span>
                                <span aria-hidden="true">${this.formatNumber(this.votesB)} ${isRTL ? 'صوت' : 'votes'}</span>
                            </div>
                        </div>

                        <div class="voting-bar-container" role="progressbar"
                             aria-valuenow="${percentB}"
                             aria-valuemin="0"
                             aria-valuemax="100"
                             aria-label="${this.productB} has ${percentB}% of votes">
                            <div class="voting-bar voting-bar-b" style="width: ${percentB}%"></div>
                        </div>
                    </div>
                </div>

                <div class="voting-total" role="status" aria-live="polite">
                    <span class="sr-only">Total votes: ${total}</span>
                    <span aria-hidden="true">
                        ${isRTL ? 'إجمالي الأصوات:' : 'Total votes:'} ${this.formatNumber(total)}
                    </span>
                </div>

                <div class="voting-message" role="status" aria-live="polite" aria-atomic="true"></div>
            </div>
        `;

        this.container.innerHTML = html;
    }

    setupEventListeners() {
        const buttons = this.container.querySelectorAll('.voting-btn');

        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const choice = e.currentTarget.dataset.choice;
                this.vote(choice);
            });
        });
    }

    setupKeyboardNavigation() {
        const buttons = this.container.querySelectorAll('.voting-btn');

        buttons.forEach((btn, index) => {
            btn.addEventListener('keydown', (e) => {
                switch(e.key) {
                    case 'ArrowRight':
                    case 'ArrowDown':
                        e.preventDefault();
                        const nextBtn = buttons[(index + 1) % buttons.length];
                        nextBtn.focus();
                        break;

                    case 'ArrowLeft':
                    case 'ArrowUp':
                        e.preventDefault();
                        const prevBtn = buttons[(index - 1 + buttons.length) % buttons.length];
                        prevBtn.focus();
                        break;

                    case 'Home':
                        e.preventDefault();
                        buttons[0].focus();
                        break;

                    case 'End':
                        e.preventDefault();
                        buttons[buttons.length - 1].focus();
                        break;
                }
            });
        });
    }

    vote(choice) {
        if (this.userVote) {
            this.showMessage('You have already voted', 'warning');
            return;
        }

        // Optimistic update
        if (choice === 'A') {
            this.votesA++;
        } else if (choice === 'B') {
            this.votesB++;
        }

        this.userVote = choice;
        localStorage.setItem(this.userVoteKey, choice);
        this.saveData();

        // Re-render with animation
        this.container.classList.add('voting-updating');
        setTimeout(() => {
            this.render();
            this.setupEventListeners();
            this.setupKeyboardNavigation();
            this.container.classList.remove('voting-updating');
            this.showMessage('Thank you for voting!', 'success');
        }, 300);
    }

    showMessage(text, type = 'info') {
        const messageEl = this.container.querySelector('.voting-message');
        if (!messageEl) return;

        messageEl.textContent = text;
        messageEl.className = `voting-message voting-message-${type}`;
        messageEl.style.display = 'block';

        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }
}

/* CSS for Accessible Voting */
const votingStyles = `
.accessible-voting {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    border: 2px solid #000;
    background: #fff;
}

.voting-title {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    font-weight: 600;
}

.voting-options {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 2rem;
    align-items: start;
}

.voting-option {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.voting-btn {
    width: 100%;
    min-height: 80px;
    padding: 1.5rem;
    background: #fff;
    border: 3px solid #000;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    position: relative;
}

.voting-btn:hover:not(:disabled),
.voting-btn:focus {
    background: #000;
    color: #fff;
    transform: translateY(-2px);
}

.voting-btn:disabled {
    cursor: not-allowed;
    opacity: 0.7;
}

.voting-btn.voted {
    background: #000;
    color: #fff;
    border-style: solid;
}

.voting-icon {
    font-size: 1.5rem;
}

.voting-stats {
    text-align: center;
    padding: 1rem;
}

.voting-percentage {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.voting-count {
    font-size: 0.875rem;
    color: #666;
}

.voting-bar-container {
    width: 100%;
    height: 8px;
    background: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
}

.voting-bar {
    height: 100%;
    background: #000;
    transition: width 0.5s ease;
}

.voting-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 2rem;
}

.voting-vs {
    font-size: 1.5rem;
    font-weight: 700;
    opacity: 0.5;
}

.voting-total {
    text-align: center;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #e0e0e0;
    font-weight: 600;
}

.voting-message {
    display: none;
    margin-top: 1rem;
    padding: 1rem;
    text-align: center;
    font-weight: 500;
    border-radius: 4px;
}

.voting-message-success {
    background: #e8f5e9;
    color: #2e7d32;
    border: 2px solid #2e7d32;
}

.voting-message-warning {
    background: #fff3e0;
    color: #e65100;
    border: 2px solid #e65100;
}

.voting-updating {
    opacity: 0.6;
    pointer-events: none;
}

@media (max-width: 768px) {
    .voting-options {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .voting-divider {
        padding: 0;
    }

    .voting-vs {
        transform: rotate(90deg);
    }
}

@media (prefers-reduced-motion: reduce) {
    .voting-btn,
    .voting-bar {
        transition: none;
    }
}
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = votingStyles;
document.head.appendChild(styleSheet);

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    const votingContainers = document.querySelectorAll('[data-accessible-voting]');

    votingContainers.forEach(container => {
        new AccessibleVoting(container, {
            productA: container.dataset.productA,
            productB: container.dataset.productB
        });
    });
});
