/**
 * Quick Decision Tool
 * أداة القرار السريع - تساعد المستخدمين على اتخاذ قرارات مستنيرة بسرعة
 */

// بيانات الأسئلة حسب الفئة
const quizData = {
    smartphones: {
        title: "Find Your Perfect Smartphone",
        questions: [
            {
                id: 1,
                question: "What's your budget?",
                options: [
                    { value: "budget", label: "Under $500", weight: { android: 2, iphone: 0 } },
                    { value: "mid", label: "$500 - $1000", weight: { android: 1, iphone: 1 } },
                    { value: "premium", label: "Over $1000", weight: { android: 0, iphone: 2 } }
                ]
            },
            {
                id: 2,
                question: "What's your primary use?",
                options: [
                    { value: "camera", label: "📸 Photography", weight: { iphone: 2, samsung: 2, pixel: 3 } },
                    { value: "gaming", label: "🎮 Gaming", weight: { iphone: 2, samsung: 2, oneplus: 2 } },
                    { value: "productivity", label: "💼 Work & Productivity", weight: { iphone: 2, samsung: 2 } },
                    { value: "social", label: "📱 Social Media", weight: { iphone: 1, samsung: 1, pixel: 1 } }
                ]
            },
            {
                id: 3,
                question: "Which ecosystem do you prefer?",
                options: [
                    { value: "ios", label: "🍎 Apple Ecosystem", weight: { iphone: 3 } },
                    { value: "android", label: "🤖 Android Ecosystem", weight: { samsung: 2, pixel: 2, oneplus: 2 } },
                    { value: "neutral", label: "🤷 No Preference", weight: { iphone: 1, samsung: 1 } }
                ]
            },
            {
                id: 4,
                question: "How important is camera quality?",
                options: [
                    { value: "very", label: "Very Important", weight: { iphone: 2, pixel: 3, samsung: 2 } },
                    { value: "moderate", label: "Moderately Important", weight: { iphone: 1, samsung: 1, oneplus: 1 } },
                    { value: "not", label: "Not Important", weight: { oneplus: 2, samsung: 1 } }
                ]
            },
            {
                id: 5,
                question: "Battery life preference?",
                options: [
                    { value: "long", label: "🔋 Long-lasting (2+ days)", weight: { samsung: 3, oneplus: 2 } },
                    { value: "moderate", label: "⚡ Moderate (1 day)", weight: { iphone: 2, samsung: 2, pixel: 2 } },
                    { value: "fast", label: "⚡ Fast charging is enough", weight: { oneplus: 3, samsung: 2 } }
                ]
            }
        ],
        results: {
            iphone: {
                name: "iPhone 15 Pro",
                emoji: "📱",
                description: "Perfect for users who value premium quality, excellent camera, and seamless ecosystem integration.",
                pros: ["Best-in-class camera", "Premium build quality", "iOS ecosystem", "Long software support"],
                cons: ["Higher price", "Limited customization"],
                link: "/en/iphone-vs-samsung.html"
            },
            samsung: {
                name: "Samsung Galaxy S24",
                emoji: "📱",
                description: "Ideal for users who want flagship features, great display, and Android flexibility.",
                pros: ["Stunning display", "Versatile camera", "Good battery life", "More affordable"],
                cons: ["Bloatware", "Updates slower than Pixel"],
                link: "/en/iphone-vs-samsung.html"
            },
            pixel: {
                name: "Google Pixel 8 Pro",
                emoji: "📱",
                description: "Best for photography enthusiasts who want pure Android and AI features.",
                pros: ["Best camera software", "Clean Android", "Fast updates", "AI features"],
                cons: ["Battery life average", "Limited availability"],
                link: "/en/android-vs-ios.html"
            },
            oneplus: {
                name: "OnePlus 12",
                emoji: "📱",
                description: "Great for users who prioritize performance, fast charging, and value for money.",
                pros: ["Excellent performance", "Super fast charging", "Good value", "Clean software"],
                cons: ["Camera not flagship-level", "Updates inconsistent"],
                link: "/en/iphone-vs-samsung.html"
            }
        }
    },
    laptops: {
        title: "Find Your Perfect Laptop",
        questions: [
            {
                id: 1,
                question: "What's your budget?",
                options: [
                    { value: "budget", label: "Under $800", weight: { chromebook: 2, windows: 1 } },
                    { value: "mid", label: "$800 - $1500", weight: { windows: 2, mac: 1 } },
                    { value: "premium", label: "Over $1500", weight: { mac: 3, windows: 1 } }
                ]
            },
            {
                id: 2,
                question: "Primary use case?",
                options: [
                    { value: "creative", label: "🎨 Creative Work", weight: { mac: 3, windows: 1 } },
                    { value: "gaming", label: "🎮 Gaming", weight: { windows: 3 } },
                    { value: "business", label: "💼 Business/Office", weight: { windows: 2, mac: 2 } },
                    { value: "browsing", label: "🌐 Web Browsing", weight: { chromebook: 3, mac: 1, windows: 1 } }
                ]
            },
            {
                id: 3,
                question: "Operating System preference?",
                options: [
                    { value: "macos", label: "🍎 macOS", weight: { mac: 3 } },
                    { value: "windows", label: "🪟 Windows", weight: { windows: 3 } },
                    { value: "chrome", label: "🌐 Chrome OS", weight: { chromebook: 3 } },
                    { value: "any", label: "🤷 No Preference", weight: { mac: 1, windows: 1 } }
                ]
            },
            {
                id: 4,
                question: "Portability importance?",
                options: [
                    { value: "very", label: "Very Important (Travel)", weight: { mac: 2, chromebook: 2 } },
                    { value: "moderate", label: "Moderately Important", weight: { mac: 1, windows: 1 } },
                    { value: "not", label: "Desktop Replacement", weight: { windows: 2 } }
                ]
            },
            {
                id: 5,
                question: "Battery life priority?",
                options: [
                    { value: "long", label: "🔋 10+ hours", weight: { mac: 3, chromebook: 2 } },
                    { value: "moderate", label: "⚡ 6-8 hours", weight: { windows: 2, mac: 1 } },
                    { value: "plugged", label: "⚡ Usually plugged in", weight: { windows: 2 } }
                ]
            }
        ],
        results: {
            mac: {
                name: "MacBook Pro/Air",
                emoji: "💻",
                description: "Perfect for creative professionals and users in Apple ecosystem.",
                pros: ["Excellent battery life", "Premium build", "Great display", "macOS optimization"],
                cons: ["Higher price", "Limited gaming", "Less upgradable"],
                link: "/en/mac-vs-windows.html"
            },
            windows: {
                name: "Windows Laptop",
                emoji: "💻",
                description: "Ideal for gaming, business, and users who need flexibility.",
                pros: ["More options", "Gaming support", "Business software", "Upgradable"],
                cons: ["Battery life varies", "Bloatware possible"],
                link: "/en/mac-vs-windows.html"
            },
            chromebook: {
                name: "Chromebook",
                emoji: "💻",
                description: "Best for web-based tasks, students, and budget-conscious users.",
                pros: ["Very affordable", "Long battery", "Fast boot", "Secure"],
                cons: ["Limited offline use", "No heavy software", "Basic specs"],
                link: "/en/chromebook-vs-windows.html"
            }
        }
    },
    streaming: {
        title: "Find Your Perfect Streaming Service",
        questions: [
            {
                id: 1,
                question: "What's your budget?",
                options: [
                    { value: "budget", label: "Under $10/month", weight: { disney: 2, prime: 2 } },
                    { value: "mid", label: "$10-$15/month", weight: { netflix: 2, hulu: 1 } },
                    { value: "multiple", label: "Can afford multiple", weight: { netflix: 1, disney: 1, hbo: 1 } }
                ]
            },
            {
                id: 2,
                question: "Content preference?",
                options: [
                    { value: "movies", label: "🎬 Movies", weight: { netflix: 2, hbo: 2, prime: 1 } },
                    { value: "series", label: "📺 TV Series", weight: { netflix: 3, hbo: 2, hulu: 2 } },
                    { value: "family", label: "👨‍👩‍👧‍👦 Family/Kids", weight: { disney: 3, netflix: 1 } },
                    { value: "mixed", label: "🎭 Mixed", weight: { netflix: 2, prime: 1 } }
                ]
            },
            {
                id: 3,
                question: "Do you watch sports?",
                options: [
                    { value: "yes", label: "Yes, regularly", weight: { hulu: 2, prime: 1 } },
                    { value: "sometimes", label: "Sometimes", weight: { hulu: 1 } },
                    { value: "no", label: "No", weight: { netflix: 1, disney: 1, hbo: 1 } }
                ]
            },
            {
                id: 4,
                question: "How many people will use it?",
                options: [
                    { value: "solo", label: "Just me", weight: { netflix: 1, hbo: 1, prime: 1 } },
                    { value: "couple", label: "2 people", weight: { netflix: 1, hulu: 1 } },
                    { value: "family", label: "Family (3+)", weight: { disney: 2, netflix: 2 } }
                ]
            },
            {
                id: 5,
                question: "Original content importance?",
                options: [
                    { value: "very", label: "Very Important", weight: { netflix: 3, hbo: 2, disney: 2 } },
                    { value: "moderate", label: "Moderately Important", weight: { netflix: 1, prime: 1 } },
                    { value: "not", label: "Not Important", weight: { prime: 2 } }
                ]
            }
        ],
        results: {
            netflix: {
                name: "Netflix",
                emoji: "📺",
                description: "Best for original content lovers and binge-watchers.",
                pros: ["Huge library", "Great originals", "User-friendly", "No ads (most plans)"],
                cons: ["Price increases", "Content rotation", "Password sharing limits"],
                link: "/en/netflix-vs-disney.html"
            },
            disney: {
                name: "Disney+",
                emoji: "📺",
                description: "Perfect for families and Marvel/Star Wars fans.",
                pros: ["Family-friendly", "Marvel & Star Wars", "Affordable", "4K included"],
                cons: ["Smaller library", "Less mature content", "Limited originals"],
                link: "/en/netflix-vs-disney.html"
            },
            hbo: {
                name: "HBO Max",
                emoji: "📺",
                description: "Ideal for premium quality shows and movies.",
                pros: ["Premium content", "New movies faster", "Quality over quantity", "HBO originals"],
                cons: ["Smaller library", "Higher price", "Interface issues"],
                link: "/en/netflix-vs-hbo.html"
            },
            prime: {
                name: "Amazon Prime Video",
                emoji: "📺",
                description: "Great value with Prime membership benefits.",
                pros: ["Included with Prime", "Good originals", "Rent/buy options", "Additional benefits"],
                cons: ["Confusing UI", "Ads on some content", "Inconsistent quality"],
                link: "/en/netflix-vs-prime.html"
            },
            hulu: {
                name: "Hulu",
                emoji: "📺",
                description: "Best for current TV shows and live TV option.",
                pros: ["Next-day TV shows", "Live TV option", "Good originals", "Bundling options"],
                cons: ["Ads (basic plan)", "US-only", "Content gaps"],
                link: "/en/netflix-vs-hulu.html"
            }
        }
    },
    music: {
        title: "Find Your Perfect Music App",
        questions: [
            {
                id: 1,
                question: "What's your budget?",
                options: [
                    { value: "free", label: "Free (with ads)", weight: { spotify: 2, youtube: 2 } },
                    { value: "student", label: "$5-$6 (Student)", weight: { spotify: 1, apple: 1 } },
                    { value: "premium", label: "$10-$11 (Premium)", weight: { spotify: 1, apple: 1, tidal: 1 } }
                ]
            },
            {
                id: 2,
                question: "Device ecosystem?",
                options: [
                    { value: "apple", label: "🍎 Apple Devices", weight: { apple: 3, spotify: 1 } },
                    { value: "android", label: "🤖 Android Devices", weight: { spotify: 2, youtube: 2 } },
                    { value: "mixed", label: "🔀 Mixed Devices", weight: { spotify: 3, youtube: 1 } }
                ]
            },
            {
                id: 3,
                question: "Audio quality importance?",
                options: [
                    { value: "audiophile", label: "🎧 Audiophile (Lossless)", weight: { tidal: 3, apple: 2 } },
                    { value: "high", label: "📻 High Quality", weight: { apple: 2, spotify: 2 } },
                    { value: "normal", label: "🎵 Normal is fine", weight: { spotify: 2, youtube: 2 } }
                ]
            },
            {
                id: 4,
                question: "Discovery features importance?",
                options: [
                    { value: "very", label: "Very Important", weight: { spotify: 3, youtube: 2 } },
                    { value: "moderate", label: "Moderately Important", weight: { spotify: 1, apple: 1 } },
                    { value: "not", label: "I know what I like", weight: { apple: 2, tidal: 1 } }
                ]
            },
            {
                id: 5,
                question: "Podcast listening?",
                options: [
                    { value: "yes", label: "Yes, regularly", weight: { spotify: 3, apple: 2 } },
                    { value: "sometimes", label: "Sometimes", weight: { spotify: 1, youtube: 1 } },
                    { value: "no", label: "Music only", weight: { tidal: 2, apple: 1 } }
                ]
            }
        ],
        results: {
            spotify: {
                name: "Spotify",
                emoji: "🎵",
                description: "Best for discovery, playlists, and podcasts.",
                pros: ["Best discovery", "Great playlists", "Podcasts included", "Cross-platform"],
                cons: ["No lossless (yet)", "Artist payouts low", "Lyrics behind paywall"],
                link: "/en/spotify-vs-apple-music.html"
            },
            apple: {
                name: "Apple Music",
                emoji: "🎵",
                description: "Perfect for Apple users who want lossless quality.",
                pros: ["Lossless audio", "Apple integration", "Large library", "Better artist pay"],
                cons: ["Discovery weaker", "iOS-first features", "Interface learning curve"],
                link: "/en/spotify-vs-apple-music.html"
            },
            tidal: {
                name: "Tidal",
                emoji: "🎵",
                description: "Ideal for audiophiles who demand the best quality.",
                pros: ["Best audio quality", "Hi-res streaming", "Artist-friendly", "Exclusive content"],
                cons: ["More expensive", "Smaller library", "Niche audience"],
                link: "/en/spotify-vs-tidal.html"
            },
            youtube: {
                name: "YouTube Music",
                emoji: "🎵",
                description: "Great for video lovers and casual listeners.",
                pros: ["Video content", "Free tier generous", "YouTube Premium bundle", "Huge library"],
                cons: ["Interface confusing", "Discovery average", "Audio quality varies"],
                link: "/en/spotify-vs-youtube-music.html"
            }
        }
    }
};

// حالة التطبيق
let currentCategory = 'smartphones';
let currentQuestionIndex = 0;
let answers = {};
let scores = {};

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
    setupCategoryButtons();
    setupNavigationButtons();
});

// تهيئة الاختبار
function initializeQuiz() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category && quizData[category]) {
        currentCategory = category;
    }
    
    displayQuestion();
}

// إعداد أزرار الفئات
function setupCategoryButtons() {
    const categoryButtons = document.querySelectorAll('.category-card');
    
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            if (quizData[category]) {
                currentCategory = category;
                resetQuiz();
                displayQuestion();
                
                // التمرير للأعلى
                document.querySelector('.qd-quiz-card').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// إعداد أزرار التنقل
function setupNavigationButtons() {
    const nextBtn = document.getElementById('nextBtn');
    const backBtn = document.getElementById('backBtn');
    const restartBtn = document.getElementById('restartBtn');
    
    nextBtn.addEventListener('click', handleNext);
    backBtn.addEventListener('click', handleBack);
    restartBtn.addEventListener('click', resetQuiz);
}

// عرض السؤال
function displayQuestion() {
    const quiz = quizData[currentCategory];
    const question = quiz.questions[currentQuestionIndex];
    const quizContent = document.getElementById('quizContent');
    
    // تحديث شريط التقدم
    updateProgress();
    
    // إنشاء HTML للسؤال
    const questionHTML = `
        <div class="qd-question">
            <div class="question-number">Question ${currentQuestionIndex + 1}</div>
            <h3 class="question-text">${question.question}</h3>
            <div class="question-options">
                ${question.options.map((option, index) => `
                    <button class="option-btn" data-value="${option.value}" data-index="${index}">
                        <span class="option-label">${option.label}</span>
                        <span class="option-check">✓</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    
    quizContent.innerHTML = questionHTML;
    
    // إضافة event listeners للخيارات
    const optionButtons = quizContent.querySelectorAll('.option-btn');
    optionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            selectOption(this, question.id);
        });
    });
    
    // تحديد الإجابة السابقة إذا كانت موجودة
    if (answers[question.id]) {
        const selectedBtn = quizContent.querySelector(`[data-value="${answers[question.id]}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('selected');
            document.getElementById('nextBtn').disabled = false;
        }
    }
    
    // تحديث أزرار التنقل
    document.getElementById('backBtn').style.display = currentQuestionIndex > 0 ? 'block' : 'none';
}

// اختيار خيار
function selectOption(button, questionId) {
    // إزالة التحديد من الخيارات الأخرى
    const allOptions = button.parentElement.querySelectorAll('.option-btn');
    allOptions.forEach(btn => btn.classList.remove('selected'));
    
    // تحديد الخيار الحالي
    button.classList.add('selected');
    
    // حفظ الإجابة
    answers[questionId] = button.dataset.value;
    
    // تفعيل زر التالي
    document.getElementById('nextBtn').disabled = false;
}

// التالي
function handleNext() {
    const quiz = quizData[currentCategory];
    
    if (currentQuestionIndex < quiz.questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
        document.getElementById('nextBtn').disabled = true;
    } else {
        calculateResult();
        showResult();
    }
}

// السابق
function handleBack() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

// حساب النتيجة
function calculateResult() {
    scores = {};
    const quiz = quizData[currentCategory];
    
    // حساب النقاط لكل منتج
    quiz.questions.forEach(question => {
        const answerId = answers[question.id];
        if (answerId) {
            const selectedOption = question.options.find(opt => opt.value === answerId);
            if (selectedOption && selectedOption.weight) {
                Object.keys(selectedOption.weight).forEach(product => {
                    scores[product] = (scores[product] || 0) + selectedOption.weight[product];
                });
            }
        }
    });
}

// عرض النتيجة
function showResult() {
    // إيجاد المنتج بأعلى نقاط
    let topProduct = null;
    let maxScore = 0;
    
    Object.keys(scores).forEach(product => {
        if (scores[product] > maxScore) {
            maxScore = scores[product];
            topProduct = product;
        }
    });
    
    const quiz = quizData[currentCategory];
    const result = quiz.results[topProduct];
    
    // إخفاء الاختبار وإظهار النتيجة
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('navButtons').style.display = 'none';
    document.getElementById('resultSection').style.display = 'block';
    
    // ملء بيانات النتيجة
    document.getElementById('resultProduct').innerHTML = `
        <div class="product-emoji">${result.emoji}</div>
        <div class="product-name">${result.name}</div>
        <div class="product-description">${result.description}</div>
    `;
    
    document.getElementById('resultDetails').innerHTML = `
        <div class="result-pros">
            <h4>✅ Pros</h4>
            <ul>
                ${result.pros.map(pro => `<li>${pro}</li>`).join('')}
            </ul>
        </div>
        <div class="result-cons">
            <h4>❌ Cons</h4>
            <ul>
                ${result.cons.map(con => `<li>${con}</li>`).join('')}
            </ul>
        </div>
    `;
    
    document.getElementById('readComparisonBtn').href = result.link;
    
    // التمرير للنتيجة
    document.getElementById('resultSection').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// إعادة تعيين الاختبار
function resetQuiz() {
    currentQuestionIndex = 0;
    answers = {};
    scores = {};
    
    document.getElementById('quizContent').style.display = 'block';
    document.getElementById('navButtons').style.display = 'flex';
    document.getElementById('resultSection').style.display = 'none';
    document.getElementById('nextBtn').disabled = true;
    
    displayQuestion();
}

// تحديث شريط التقدم
function updateProgress() {
    const quiz = quizData[currentCategory];
    const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
    
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = quiz.questions.length;
}
