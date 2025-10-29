/**
 * VS Battle - Interactive Voting System
 * يسمح للمستخدمين بالتصويت بين منتجين والحصول على نتائج فورية
 */

class VSBattle {
    constructor(battleId, productA, productB) {
        this.battleId = battleId;
        this.productA = productA;
        this.productB = productB;
        this.storageKey = `vs_battle_${battleId}`;
        this.userVoteKey = `vs_vote_${battleId}`;
        this.initBattle();
    }

    // تهيئة البيانات
    initBattle() {
        const savedData = localStorage.getItem(this.storageKey);
        if (savedData) {
            const data = JSON.parse(savedData);
            this.votesA = data.votesA || 0;
            this.votesB = data.votesB || 0;
        } else {
            // بيانات افتراضية (يمكن استبدالها ببيانات من server)
            this.votesA = Math.floor(Math.random() * 1000) + 500;
            this.votesB = Math.floor(Math.random() * 1000) + 500;
            this.saveData();
        }
    }

    // حفظ البيانات
    saveData() {
        const data = {
            votesA: this.votesA,
            votesB: this.votesB,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    // التحقق من تصويت المستخدم
    hasUserVoted() {
        return localStorage.getItem(this.userVoteKey) !== null;
    }

    // حفظ تصويت المستخدم
    saveUserVote(choice) {
        localStorage.setItem(this.userVoteKey, choice);
    }

    // التصويت
    vote(choice) {
        if (this.hasUserVoted()) {
            this.showMessage('لقد صوّت بالفعل!', 'You already voted!');
            return;
        }

        if (choice === 'A') {
            this.votesA++;
            this.saveUserVote('A');
        } else if (choice === 'B') {
            this.votesB++;
            this.saveUserVote('B');
        }

        this.saveData();
        this.updateUI();
        this.showMessage('شكراً لتصويتك! ✅', 'Thanks for voting! ✅');
    }

    // حساب النسب المئوية
    getPercentages() {
        const total = this.votesA + this.votesB;
        if (total === 0) return { percentA: 50, percentB: 50 };
        
        const percentA = Math.round((this.votesA / total) * 100);
        const percentB = 100 - percentA;
        
        return { percentA, percentB };
    }

    // تحديث الواجهة
    updateUI() {
        const { percentA, percentB } = this.getPercentages();
        const total = this.votesA + this.votesB;
        
        // تحديث النسب المئوية
        const percentAEl = document.querySelector(`#${this.battleId} .percent-a`);
        const percentBEl = document.querySelector(`#${this.battleId} .percent-b`);
        
        if (percentAEl) percentAEl.textContent = `${percentA}%`;
        if (percentBEl) percentBEl.textContent = `${percentB}%`;
        
        // تحديث شريط التقدم
        const progressBarA = document.querySelector(`#${this.battleId} .progress-bar-a`);
        const progressBarB = document.querySelector(`#${this.battleId} .progress-bar-b`);
        
        if (progressBarA) progressBarA.style.width = `${percentA}%`;
        if (progressBarB) progressBarB.style.width = `${percentB}%`;
        
        // تحديث عدد الأصوات
        const votesAEl = document.querySelector(`#${this.battleId} .votes-a`);
        const votesBEl = document.querySelector(`#${this.battleId} .votes-b`);
        
        if (votesAEl) votesAEl.textContent = this.formatNumber(this.votesA);
        if (votesBEl) votesBEl.textContent = this.formatNumber(this.votesB);
        
        // إضافة كلاس للفائز
        const btnA = document.querySelector(`#${this.battleId} .vote-btn-a`);
        const btnB = document.querySelector(`#${this.battleId} .vote-btn-b`);
        
        if (btnA && btnB) {
            btnA.classList.remove('winning', 'losing');
            btnB.classList.remove('winning', 'losing');
            
            if (percentA > percentB) {
                btnA.classList.add('winning');
                btnB.classList.add('losing');
            } else if (percentB > percentA) {
                btnB.classList.add('winning');
                btnA.classList.add('losing');
            }
        }
        
        // تعطيل الأزرار إذا صوّت المستخدم
        if (this.hasUserVoted()) {
            if (btnA) btnA.disabled = true;
            if (btnB) btnB.disabled = true;
            
            const userVote = localStorage.getItem(this.userVoteKey);
            if (userVote === 'A' && btnA) btnA.classList.add('user-voted');
            if (userVote === 'B' && btnB) btnB.classList.add('user-voted');
        }
    }

    // تنسيق الأرقام
    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }

    // عرض رسالة
    showMessage(arMsg, enMsg) {
        const lang = document.documentElement.lang;
        const message = lang === 'ar' ? arMsg : enMsg;
        
        // إنشاء toast notification
        const toast = document.createElement('div');
        toast.className = 'vs-toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // إنشاء HTML للمعركة
    static createBattleHTML(battleId, productA, productB, isRTL = false) {
        return `
            <div class="vs-battle" id="${battleId}">
                <div class="vs-battle-header">
                    <h3 class="vs-battle-title">
                        ${isRTL ? 'من تختار؟' : 'Which do you prefer?'}
                    </h3>
                    <p class="vs-battle-subtitle">
                        ${isRTL ? 'صوّت واعرف رأي الآخرين!' : 'Vote and see what others think!'}
                    </p>
                </div>
                
                <div class="vs-battle-container">
                    <div class="vs-battle-side vs-battle-a">
                        <button class="vote-btn vote-btn-a" onclick="window.battles['${battleId}'].vote('A')">
                            <span class="product-name">${productA}</span>
                            <span class="vote-icon">👍</span>
                        </button>
                        <div class="vote-stats">
                            <div class="percent percent-a">50%</div>
                            <div class="votes-count">
                                <span class="votes-a">0</span> ${isRTL ? 'صوت' : 'votes'}
                            </div>
                        </div>
                    </div>
                    
                    <div class="vs-divider">
                        <span class="vs-text">VS</span>
                    </div>
                    
                    <div class="vs-battle-side vs-battle-b">
                        <button class="vote-btn vote-btn-b" onclick="window.battles['${battleId}'].vote('B')">
                            <span class="product-name">${productB}</span>
                            <span class="vote-icon">👍</span>
                        </button>
                        <div class="vote-stats">
                            <div class="percent percent-b">50%</div>
                            <div class="votes-count">
                                <span class="votes-b">0</span> ${isRTL ? 'صوت' : 'votes'}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="vs-progress">
                    <div class="progress-bar progress-bar-a" style="width: 50%"></div>
                    <div class="progress-bar progress-bar-b" style="width: 50%"></div>
                </div>
                
                <div class="vs-total-votes">
                    ${isRTL ? 'إجمالي الأصوات:' : 'Total votes:'} 
                    <span class="total-count">0</span>
                </div>
            </div>
        `;
    }
}

// تهيئة المعارك عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة كائن عام للمعارك
    window.battles = window.battles || {};
    
    // البحث عن جميع عناصر VS Battle في الصفحة
    const battleElements = document.querySelectorAll('[data-vs-battle]');
    
    battleElements.forEach(el => {
        const battleId = el.id;
        const productA = el.dataset.productA;
        const productB = el.dataset.productB;
        
        if (battleId && productA && productB) {
            window.battles[battleId] = new VSBattle(battleId, productA, productB);
            window.battles[battleId].updateUI();
        }
    });
});
