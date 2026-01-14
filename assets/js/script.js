// 1. Define SVGs
    const sunSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"/>
            <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
        </svg>`;

    const moonSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>
        </svg>`;

    document.addEventListener('DOMContentLoaded', () => {
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const themeToggleBtn = document.getElementById('themeToggle');
        const searchInput = document.getElementById('searchInput');
        const body = document.body;

        // Check LocalStorage on page load
        const savedTheme = localStorage.getItem('hause_theme');

        if (savedTheme === 'light') {
            body.classList.add('light-theme');
            themeToggleBtn.innerHTML = moonSVG;
        } else {
            themeToggleBtn.innerHTML = sunSVG;
        }

        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            
            const isLight = body.classList.contains('light-theme');

            if (isLight) {
                themeToggleBtn.innerHTML = moonSVG;
                localStorage.setItem('hause_theme', 'light');
            } else {
                themeToggleBtn.innerHTML = sunSVG;
                localStorage.setItem('hause_theme', 'dark');
            }
        });

        // --- 2. SEARCH REDIRECT LOGIC ---
        
        if (searchInput) {
            searchInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    const query = searchInput.value.trim();
                    if (query) {
                         console.log("Searching for:", query); // Debugging
                        window.location.href = 'https://ey43.com/4/8513330';
                        //window.location.href = '/search?q=' + encodeURIComponent(query);
                    }
                }
            });
        }

        // --- 3. HAMBURGER MENU LOGIC ---
        if (hamburgerBtn) {
            hamburgerBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                if (mobileMenu.classList.contains('active')) {
                    hamburgerBtn.classList.remove('fa-bars');
                    hamburgerBtn.classList.add('fa-times');
                } else {
                    hamburgerBtn.classList.remove('fa-times');
                    hamburgerBtn.classList.add('fa-bars');
                }
            });
        }

        // --- 4. SLIDER SCROLL LOGIC ---
        const sliders = document.querySelectorAll('.slider-container');
        sliders.forEach(container => {
            const slider = container.querySelector('.slider');
            const prevBtn = container.querySelector('.prev-btn');
            const nextBtn = container.querySelector('.next-btn');

            if(prevBtn && nextBtn) {
                nextBtn.addEventListener('click', () => {
                    slider.scrollBy({ left: 350, behavior: 'smooth' });
                });

                prevBtn.addEventListener('click', () => {
                    slider.scrollBy({ left: -350, behavior: 'smooth' });
                });
            }
        });
        
    // --- 5. AGE & COOKIE GATE LOGIC ---
    
    const ageModal = document.getElementById('ageModal');
    const cookieModal = document.getElementById('cookieModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const ageEnterBtn = document.getElementById('ageEnterBtn');
    const ageExitBtn = document.getElementById('ageExitBtn');
    const cookieAcceptBtn = document.getElementById('cookieAcceptBtn');
    const cookieSelectBtn = document.getElementById('cookieSelectBtn');
    
    const STORAGE_KEY = 'hause_access_granted';
    const EXPIRY_DAYS = 7;
    const REDIRECT_URL = 'https://ey43.com/4/8513330';

    function checkAccess() {
        const storedData = localStorage.getItem(STORAGE_KEY);
        let isValid = false;

        if (storedData) {
            const parsedData = JSON.parse(storedData);
            const now = new Date().getTime();
            const sevenDaysInMs = EXPIRY_DAYS * 24 * 60 * 60 * 1000;
            
            if (now - parsedData.timestamp < sevenDaysInMs) {
                isValid = true;
            }
        }

        if (!isValid) {
            showAgeGate();
        }
    }

    function showAgeGate() {
        document.body.classList.add('modal-active');
        modalOverlay.style.display = 'block';
        ageModal.style.display = 'block';
        cookieModal.style.display = 'block'; 
    }

    function grantAccess() {
        const data = { timestamp: new Date().getTime() };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        ageModal.style.display = 'none';
        cookieModal.style.display = 'none';
        modalOverlay.style.display = 'none';
        document.body.classList.remove('modal-active');
    }

    ageEnterBtn.addEventListener('click', () => {
        ageModal.style.display = 'none';
    });

    ageExitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = REDIRECT_URL;
    });

    // 3. Cookie Buttons (Accept All or Selection)
    function closeCookieModal() {
        grantAccess(); 
    }

    cookieAcceptBtn.addEventListener('click', closeCookieModal);
    cookieSelectBtn.addEventListener('click', closeCookieModal);
    checkAccess();
    
    // --- 6. COOKIE ACCORDION LOGIC ---
    
    const cookieGroups = document.querySelectorAll('.cookie-group');

    cookieGroups.forEach(group => {
        const header = group.querySelector('.cookie-row');
        
        header.addEventListener('click', (e) => {
            if(e.target.closest('.switch')) return;
            const isOpen = group.classList.contains('active');
            cookieGroups.forEach(g => g.classList.remove('active'));
            if (!isOpen) {
                group.classList.add('active');
            }
        });
    });
    
    // --- 7. SHUFFLE LOGIC ---

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Step A: Cross-Pollination (Trending <-> Top Picks)
    // We mix cards from both into one pool, shuffle and redistribute.
    const trendingSec = document.getElementById('sec-trending');
    const topPicksSec = document.getElementById('sec-top-picks');

    if (trendingSec && topPicksSec) {
        const trendingSlider = trendingSec.querySelector('.slider');
        const topPicksSlider = topPicksSec.querySelector('.slider');
        const trendingCards = Array.from(trendingSlider.children);
        const topPicksCards = Array.from(topPicksSlider.children);
        
        const combinedPool = [...trendingCards, ...topPicksCards];
        
        shuffleArray(combinedPool);

        trendingSlider.innerHTML = '';
        topPicksSlider.innerHTML = '';

        const splitIndex = Math.ceil(combinedPool.length / 2);
        
        combinedPool.slice(0, splitIndex).forEach(card => trendingSlider.appendChild(card));
        combinedPool.slice(splitIndex).forEach(card => topPicksSlider.appendChild(card));
    }

    // Step B: General Internal Card Shuffling
    // Shuffle cards inside every section EXCEPT "Top Categories"
    const allSections = document.querySelectorAll('.category-section');

    allSections.forEach(section => {
        if (section.id === 'sec-categories') return;

        const slider = section.querySelector('.slider');
        if (slider) {
            const cards = Array.from(slider.children);
            const shuffledCards = shuffleArray(cards);
            slider.innerHTML = '';
            shuffledCards.forEach(card => slider.appendChild(card));
        }
    });

    // Step C: Section Order Shuffling
    // Shuffle the sections themselves within the wrapper
    const sectionsWrapper = document.getElementById('sections-wrapper');
    if (sectionsWrapper) {
        const sections = Array.from(sectionsWrapper.children);
        const shuffledSections = shuffleArray(sections);
        
        sectionsWrapper.innerHTML = '';
        shuffledSections.forEach(sec => sectionsWrapper.appendChild(sec));
    }
    });