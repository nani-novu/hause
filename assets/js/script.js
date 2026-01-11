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
        
        // --- VARIABLES ---
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const themeToggleBtn = document.getElementById('themeToggle');
        const searchInput = document.getElementById('searchInput');
        const body = document.body;

        // --- 1. THEME PERSISTENCE LOGIC ---
        
        // Check LocalStorage on page load
        const savedTheme = localStorage.getItem('hause_theme');

        if (savedTheme === 'light') {
            body.classList.add('light-theme');
            themeToggleBtn.innerHTML = moonSVG; // Set to Moon icon
        } else {
            themeToggleBtn.innerHTML = sunSVG; // Set to Sun icon (Default)
        }

        // Toggle Event
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            
            const isLight = body.classList.contains('light-theme');

            if (isLight) {
                themeToggleBtn.innerHTML = moonSVG;
                // Save 'light' to LocalStorage
                localStorage.setItem('hause_theme', 'light');
            } else {
                themeToggleBtn.innerHTML = sunSVG;
                // Save 'dark' to LocalStorage
                localStorage.setItem('hause_theme', 'dark');
            }
        });

        // --- 2. SEARCH REDIRECT LOGIC ---
        
        if (searchInput) {
            searchInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    const query = searchInput.value.trim();
                    if (query) {
                        // Redirect logic:
                        // Replace '/search' with your actual search page URL
                        // Example: window.location.href = '/search.html?q=' + encodeURIComponent(query);
                        
                        console.log("Searching for:", query); // Debugging
                        window.location.href = '/search?q=' + encodeURIComponent(query);
                    }
                }
            });
        }

        // --- 3. HAMBURGER MENU LOGIC ---
        if (hamburgerBtn) {
            hamburgerBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                
                // Toggle Icon Visuals
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
    
    // Config
    const STORAGE_KEY = 'hause_access_granted';
    const EXPIRY_DAYS = 7;
    const REDIRECT_URL = 'https://www.google.com'; // Change to desired URL

    function checkAccess() {
        const storedData = localStorage.getItem(STORAGE_KEY);
        let isValid = false;

        if (storedData) {
            const parsedData = JSON.parse(storedData);
            const now = new Date().getTime();
            const sevenDaysInMs = EXPIRY_DAYS * 24 * 60 * 60 * 1000;
            
            // Check if 7 days have passed
            if (now - parsedData.timestamp < sevenDaysInMs) {
                isValid = true;
            }
        }

        if (!isValid) {
            showAgeGate();
        }
    }

    function showAgeGate() {
        // Blur background
        document.body.classList.add('modal-active');
        // Show Overlay
        modalOverlay.style.display = 'block';
        // Show Age Modal
        ageModal.style.display = 'block';
        // Show Cookie Modal (behind age modal due to z-index)
        cookieModal.style.display = 'block'; 
    }

    function grantAccess() {
        // Save current timestamp to local storage
        const data = { timestamp: new Date().getTime() };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

        // Remove UI elements
        ageModal.style.display = 'none';
        cookieModal.style.display = 'none';
        modalOverlay.style.display = 'none';
        document.body.classList.remove('modal-active');
    }

    // --- Event Listeners for Modals ---

    // 1. User clicks "Enter" on Age Modal
    ageEnterBtn.addEventListener('click', () => {
        // Hide Age Modal
        ageModal.style.display = 'none';
        
        // Background remains blurred because body.modal-active is still there.
        // Overlay remains visible.
        // Cookie modal is now the top visible element.
    });

    // 2. User clicks "Exit"
    ageExitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = REDIRECT_URL;
    });

    // 3. Cookie Buttons (Accept All or Selection)
    // Both do the same final action: grant access and clear blur
    function closeCookieModal() {
        grantAccess(); 
    }

    cookieAcceptBtn.addEventListener('click', closeCookieModal);
    cookieSelectBtn.addEventListener('click', closeCookieModal);

    // Initial Check
    checkAccess();
    
    // --- 6. COOKIE ACCORDION LOGIC ---
    
    const cookieGroups = document.querySelectorAll('.cookie-group');

    cookieGroups.forEach(group => {
        const header = group.querySelector('.cookie-row');
        
        header.addEventListener('click', (e) => {
            // Prevent triggering if clicking directly on the toggle switch wrapper
            // (Note: The onclick="event.stopPropagation()" in HTML handles the switch itself, 
            // but this is a safety check if user clicks near it)
            if(e.target.closest('.switch')) return;

            // Check if this group is already open
            const isOpen = group.classList.contains('active');

            // 1. Close ALL groups (One at a time logic)
            cookieGroups.forEach(g => g.classList.remove('active'));

            // 2. If it wasn't open before, open it now
            if (!isOpen) {
                group.classList.add('active');
            }
        });
    });
    });