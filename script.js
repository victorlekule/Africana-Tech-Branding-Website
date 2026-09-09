tailwind.config = {
    theme: {
        extend: {
            colors: {
                brandBlue: '#136db6',  /* A vibrant, professional tech blue */
                brandBlack: '#0A0A0A', /* Deep black */
                brandWhite: '#F9FAFB',
                brandGreen: '#009444', /* Slightly off-white for better contrast */
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            }
        }
    }
}

//header//

document.addEventListener("DOMContentLoaded", () => {
    // 1. Select the container
    const headerContainer = document.getElementById("header-container");

    // 2. Define links with sub-page mappings
    const navLinks = [
        { name: "Home", url: "index.html", subPages: [] },
        { name: "About Us", url: "about us.html", subPages: [] },
        { name: "Tech Solutions", url: "tech solution.html", subPages: ["cyber info.html", "computer.html", "network info.html", "web info.html", "ai training.html", "app info.html", "system.html", "corparate info.html", "electrical.html"] },
        { name: "Branding & Creative", url: "branding.html", subPages: ["copywriting.html", "digital marketing.html", "identity.html", "strategy.html", "ux design.html", "video.html", "social media.html", "3d.html"] },
        { name: "Portfolio", url: "portfolio.html", subPages: [] },
        { name: "Blog", url: "blog.html", subPages: [] }
    ];

    // Extract "Contact Us" to use it as the CTA button on the right
    const contactLink = { name: "Contact Us", url: "contact.html", subPages: [] };

    // 3. Detect Current Page
    const pathParts = window.location.pathname.split(/[\/\\]/);
    const rawPath = pathParts[pathParts.length - 1] || "index.html";
    const currentPath = decodeURIComponent(rawPath).toLowerCase().trim();

    // 3A. Desktop Links
    const desktopNavItemsHtml = navLinks.map(link => {
        const isActive = currentPath === link.url.toLowerCase().trim() || link.subPages.some(page => currentPath === page.toLowerCase().trim());
        const hasSubPages = link.subPages.length > 0;

        // Active State: Purple text with bottom line
        if (isActive) {
            return `
            <a href="${link.url}" class="relative flex flex-col items-center group cursor-pointer text-brandBlue text-base font-semibold tracking-wide">
                <span>${link.name}</span>
                <span class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-brandBlue rounded-full"></span>
            </a>`;
        }
        // Default State
        else {
            const chevron = hasSubPages ? `
                <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600 mt-0.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path>
                </svg>` : '';

            return `
            <a href="${link.url}" class="flex items-center text-[#4B5563] hover:text-[#111827] text-base font-medium tracking-wide group">
                <span>${link.name}</span>
                ${chevron}
            </a>`;
        }
    }).join('');

    // 3B. Mobile Links
    const allMobileLinks = [...navLinks, contactLink];

    const mobileNavItemsHtml = allMobileLinks.map(link => {
        const isActive = currentPath === link.url.toLowerCase().trim() || link.subPages.some(page => currentPath === page.toLowerCase().trim());
        const isContact = link.url === contactLink.url;

        const activeClasses = isContact
            ? "text-white bg-brandBlue border border-transparent rounded-full px-6 py-3 shadow-md hover:bg-brandBlack hover:text-white"
            : isActive
                ? "mobile-nav-link-active text-brandBlue bg-[#F5F3FF] border-l-4 border-brandBlue"
                : "text-gray-600 border-l-4 border-transparent hover:text-gray-900 hover:bg-gray-50";

        return `<li class="m-0 p-0 border-b border-gray-100 last:border-none">
            <a href="${link.url}" class="mobile-nav-link inline-flex w-fit font-medium text-base tracking-wide ${isContact ? "" : "py-4 px-6"} ${activeClasses}">
                ${link.name}
            </a>
        </li>`;
    }).join('');

    // 4. Construct Header HTML (with all responsive fixes)
    const headerHtml = `
        <style>
            .site-info-bar { min-height: 34px; background: #136db6; color: #F9FAFB; }
            #mobile-menu-backdrop, #mobile-menu { top: 124px; } /* default for tablet (nav height 90px) */

            /* Mobile: reduce nav height and adjust menu positions */
            @media (max-width: 767px) {
                .site-info-bar { min-height: 34px; }
                #mobile-menu-backdrop, #mobile-menu { top: 104px; } /* 34px info + 70px nav */
                .site-info-bar > div { justify-content: center; }
                .site-info-contact { flex-wrap: wrap; justify-content: center; gap: 4px 12px; }
                .site-info-location, .site-info-location-separator, .site-info-links { display: none; }
                .site-info-whatsapp, .site-info-email { white-space: normal; font-size: 11px; }
                .site-main-nav { height: 70px; padding-left: 8px; padding-right: 8px; }
                .site-main-brand { min-width: 0; flex: 1 1 auto; overflow: hidden; }
                .site-main-brand h1 { font-size: 10px; line-height: 1.15; word-spacing: normal !important; }
                .site-main-brand p { font-size: 9px; line-height: 1.15; }
                .site-main-actions { flex: 0 0 40px; margin-left: 8px; }
                /* Hide decorative SVG on very small screens */
                .site-main-nav .absolute.left-0 { display: none; }
            }

            /* Mobile menu animation */
            #mobile-menu {
                transform: scaleY(0);
                opacity: 0;
                transform-origin: top;
                transition: transform 0.3s ease, opacity 0.3s ease;
            }
            #mobile-menu:not(.hidden) {
                transform: scaleY(1);
                opacity: 1;
            }
        </style>
        <header class="w-full fixed top-0 left-0 z-50 flex flex-col pointer-events-none">
            <!-- Top info bar -->
            <div class="site-info-bar text-[10px] sm:text-xs pointer-events-auto">
                <div class="w-full px-2 sm:px-4 lg:px-5 py-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                    <div class="site-info-contact flex flex-wrap items-center justify-start gap-x-4 gap-y-1">
                        <a href="https://wa.me/255672743065" target="_blank" rel="noopener noreferrer" class="site-info-whatsapp inline-flex items-center gap-1.5 hover:text-white/75" aria-label="WhatsApp +255 672 743 065">
                            <svg class="w-3.5 h-3.5 flex-none" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a9.8 9.8 0 00-8.5 14.7L2 22l5.5-1.4A9.8 9.8 0 1012 2zm0 17.8a8 8 0 01-4.1-1.1l-.3-.2-3.3.8.9-3.2-.2-.3A8 8 0 1112 19.8zm4.4-5.9c-.2-.1-1.3-.7-1.5-.8-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1a6.8 6.8 0 01-2-1.2 7.6 7.6 0 01-1.4-1.7c-.1-.2 0-.3.1-.5l.4-.5c.1-.2.1-.3 0-.5l-.7-1.6c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.4 2.3.9 2.3.6 2.7.6.4 0 1.3-.5 1.5-1 .2-.5.2-.9.1-1-.1-.1-.3-.2-.5-.3z"></path></svg>
                            +255 672 743 065
                        </a>
                        <span class="site-info-location-separator hidden sm:inline text-white/30">|</span>
                        <span class="site-info-location inline-flex items-center gap-1.5"><svg class="w-3.5 h-3.5 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21s7-4.35 7-11a7 7 0 10-14 0c0 6.65 7 11 7 11z"></path><circle cx="12" cy="10" r="2.5" stroke-width="2"></circle></svg>Arusha, Tanzania</span>
                        <span class="site-info-location-separator hidden sm:inline text-white/30">|</span>
                        <a href="mailto:info@africana.co.tz" class="site-info-email inline-flex items-center gap-1.5 hover:text-white/75"><svg class="w-3.5 h-3.5 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l9 6 9-6M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"></path></svg>info@africana.co.tz</a>
                    </div>
                    <nav class="site-info-links flex items-center gap-3 sm:gap-4 ml-auto" aria-label="Legal links">
                        <a href="privacy.html" class="hover:text-white/75">Privacy</a>
                        <a href="faqs.html" class="hover:text-white/75">FAQs</a>
                        <a href="partners.html" class="hover:text-white/75">Partners</a>
                        <a href="terms.html" class="hover:text-white/75">Terms</a>
                    </nav>
                </div>
            </div>
            
            <!-- Main navigation -->
            <nav class="site-main-nav relative w-full h-[90px] bg-white shadow-[0_4px_30px_-10px_rgba(0,0,0,0.08)] flex items-center justify-between px-4 lg:px-8 xl:px-12 overflow-hidden pointer-events-auto">
                
                <!-- Decorative SVG background (hidden on very small screens) -->
                <div class="absolute left-0 top-0 bottom-0 w-[550px] pointer-events-none z-0">
                    <svg width="100%" height="100%" viewBox="0 0 550 90" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0 H 360 C 440 0 380 90 480 90 H 0 V 0 Z" fill="#136db6" />
                        <path d="M0 0 H 300 C 390 0 330 90 420 90 H 0 V 0 Z" fill="#fcfcfd" opacity="100"/>
                    </svg>
                </div>

                <!-- Brand -->
                <div class="site-main-brand relative z-10 flex items-center flex-none pl-1 sm:pl-2">
                    <div class="flex flex-col justify-center">
                        <h1 class="text-brandBlue font-extrabold text-sm sm:text-base md:text-lg lg:text-sm xl:text-sm leading-tight tracking-wide truncate" style="word-spacing: 0.25em;">
                            AFRICANA TECH & BRANDING LTD
                        </h1>
                        <p class="text-brandBlack text-xs text-center sm:text-sm md:text-sm lg:text-sm xl:text-base font-medium tracking-wide mt-1 truncate">
                            Innovate. Build. Transform.
                        </p>
                    </div>
                </div>

                <!-- Desktop navigation (now visible from lg breakpoint) -->
                <div class="hidden lg:flex items-center gap-8 bg-white rounded-full px-10 py-4 border border-blue-600 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04),inset_0_0_0_1px_rgba(243,244,246,0.8)] relative z-10">
                    ${desktopNavItemsHtml}
                </div>

                <!-- Right side actions -->
                <div class="site-main-actions relative z-10 flex items-center gap-4 md:gap-5 flex-shrink-0">
                    <a href="${contactLink.url}" class="hidden sm:flex items-center gap-2 bg-brandBlue text-white px-7 py-3.5 rounded-full text-[14px] font-semibold hover:shadow-[0_8px_20px_-6px_rgba(99,102,241,0.5)] hover:bg-brandBlack">
                        ${contactLink.name}
                        <svg class="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </a>

                    <!-- Hamburger / Close button (visible below lg) -->
                    <button type="button" id="mobile-menu-btn" class="lg:hidden relative flex-none inline-flex w-10 h-10 items-center justify-center text-gray-700 hover:text-brandBlue bg-transparent hover:bg-transparent p-2 rounded-full focus:outline-none">
                        <svg id="icon-open" class="absolute top-1/2 left-1/2 w-6 h-6 block pr-[2px] -translate-x-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                        <svg id="icon-close" class="absolute top-1/2 left-1/2 w-6 h-6 hidden pr-[2px] -translate-x-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </nav>

            <!-- Backdrop for mobile menu -->
            <div id="mobile-menu-backdrop" class="hidden lg:hidden fixed top-[124px] right-0 bottom-0 left-0 z-40 bg-black/10 backdrop-blur-md pointer-events-auto"></div>

            <!-- Mobile dropdown menu -->
            <div id="mobile-menu" class="hidden lg:hidden fixed top-[124px] left-3 right-3 z-50 bg-white shadow-xl border border-gray-200 rounded-xl overflow-hidden pointer-events-auto origin-top transition-all duration-300 ease-in-out">
                <ul class="flex flex-col m-0 p-0 list-none">
                    ${mobileNavItemsHtml}
                </ul>
            </div>
            
        </header>
    `;

    // 5. Inject HTML
    headerContainer.innerHTML = headerHtml;

    // 6. Interactive Logic for Mobile Toggle
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileMenuBackdrop = document.getElementById("mobile-menu-backdrop");
    const iconOpen = document.getElementById("icon-open");
    const iconClose = document.getElementById("icon-close");

    mobileBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
        mobileMenuBackdrop.classList.toggle("hidden");
        iconOpen.classList.toggle("hidden");
        iconOpen.classList.toggle("block");
        iconClose.classList.toggle("hidden");
        iconClose.classList.toggle("block");
    });

    mobileMenuBackdrop.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        mobileMenuBackdrop.classList.add("hidden");
        iconOpen.classList.remove("hidden");
        iconOpen.classList.add("block");
        iconClose.classList.remove("block");
        iconClose.classList.add("hidden");
    });

    // 7. Active State & Auto-Close Logic
    const allLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    allLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuBackdrop.classList.add("hidden");
                iconOpen.classList.remove("hidden");
                iconOpen.classList.add("block");
                iconClose.classList.remove("block");
                iconClose.classList.add("hidden");
            }
        });
    });
});


//HOME PAGE//

// --- SERVICES SLIDER LOGIC ---//



document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('track');
    const cards = track.querySelectorAll('.solution-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const numberNav = document.getElementById('numberNav');

    if (!track || cards.length === 0) return;

    // --- Image preloader (removes loading jank) ---
    const preloadImages = () => {
        cards.forEach(card => {
            const img = card.querySelector('img');
            if (img && img.src) {
                const preload = new Image();
                preload.src = img.src;
            }
        });
    };
    preloadImages();

    // --- Clone first card for seamless infinite loop ---
    const firstCardClone = cards[0].cloneNode(true);
    track.appendChild(firstCardClone);

    let currentIndex = 0;
    const originalCardCount = cards.length;
    let autoPlayTimer;
    let isTransitioning = false; // Prevent clicks during the invisible snap

    // --- Generate numbered dots (only for original cards) ---
    cards.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${index === 0 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-blue-300'}`;
        dot.innerText = index + 1;
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);

        dot.addEventListener('click', () => {
            if (isTransitioning) return;
            currentIndex = index;
            updateSlider();
            resetAutoPlay();
        });

        numberNav.appendChild(dot);
    });

    const dots = numberNav.querySelectorAll('button');

    // --- Update the slider position and UI ---
    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        const activeDotIndex = currentIndex === originalCardCount ? 0 : currentIndex;
        dots.forEach((dot, index) => {
            dot.className = `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${index === activeDotIndex ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-blue-300'}`;
        });

        prevBtn.disabled = currentIndex === 0;
    }

    // --- Move to next slide ---
    function nextSlide() {
        if (isTransitioning) return;

        currentIndex++;
        updateSlider(); // transition class is already present; CSS handles the animation

        if (currentIndex === originalCardCount) {
            isTransitioning = true;
            // Listen for the exact end of the transition, then snap back silently
            const onTransitionEnd = () => {
                track.removeEventListener('transitionend', onTransitionEnd);
                // Disable transition momentarily
                track.style.transition = 'none';
                currentIndex = 0;
                track.style.transform = `translateX(0%)`; // instant jump
                // Force reflow so the jump is painted before re‑enabling transition
                void track.offsetWidth;
                track.style.transition = ''; // restore original CSS transition
                updateSlider(); // fix button states and dot highlights
                isTransitioning = false;
            };
            track.addEventListener('transitionend', onTransitionEnd);
        }
    }

    // --- Move to previous slide ---
    function prevSlide() {
        if (isTransitioning || currentIndex === 0) return;
        currentIndex--;
        updateSlider();
    }

    // --- Event listeners for navigation buttons ---
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    // --- Auto‑play logic ---
    function startAutoPlay() {
        autoPlayTimer = setInterval(nextSlide, 3000);
    }
    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    // Pause on hover / touch
    track.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    track.addEventListener('mouseleave', startAutoPlay);
    track.addEventListener('touchstart', () => clearInterval(autoPlayTimer), { passive: true });
    track.addEventListener('touchend', startAutoPlay);

    // --- Initialise ---
    updateSlider();
    startAutoPlay();
});



document.addEventListener("DOMContentLoaded", () => {
    // --- SCROLL REVEAL / CASCADING FADE-UP ANIMATION ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the active class to trigger the CSS transition
                entry.target.classList.add('active');
                // Stop observing once animated so it doesn't replay annoyingly
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});


// 3. TESTIMONIAL SLIDER LOGIC//

const testSlides = document.querySelectorAll('.test-slide');
const testDots = document.querySelectorAll('.test-dot');

if (testSlides.length > 0) {
    let currentTestSlide = 0;

    function goToTestSlide(index) {
        // Hide all slides
        testSlides.forEach((slide, i) => {
            slide.classList.remove('opacity-100', 'translate-x-0');
            slide.classList.add('opacity-0');

            // Directional slide logic
            if (i < index) {
                slide.classList.add('-translate-x-full');
                slide.classList.remove('translate-x-full');
            } else if (i > index) {
                slide.classList.add('translate-x-full');
                slide.classList.remove('-translate-x-full');
            }
        });

        // Show active slide
        testSlides[index].classList.remove('opacity-0', 'translate-x-full', '-translate-x-full');
        testSlides[index].classList.add('opacity-100', 'translate-x-0');

        // Update dots
        testDots.forEach(dot => {
            dot.classList.remove('bg-brandBlue', 'scale-125');
            dot.classList.add('bg-gray-300');
        });
        testDots[index].classList.remove('bg-gray-300');
        testDots[index].classList.add('bg-brandBlue', 'scale-125');

        currentTestSlide = index;
    }

    // Add click events to dots
    testDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToTestSlide(index);
        });
    });

    // Auto slide every 6 seconds
    setInterval(() => {
        let nextSlide = (currentTestSlide + 1) % testSlides.length;
        goToTestSlide(nextSlide);
    }, 6000);
}



//tech servies//
document.addEventListener("DOMContentLoaded", () => {
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modal = document.getElementById('projectInquiryModal');
    const checkboxes = document.querySelectorAll('.service-checkbox');

    // Open Modal
    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Stop background scrolling
        });
    }

    // Close Modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }

    // Toggle dynamic fields when checkboxes are clicked
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const targetId = this.getAttribute('data-detail');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                if (this.checked) {
                    targetElement.classList.remove('hidden');
                } else {
                    targetElement.classList.add('hidden');
                    // Optional: Reset the select value when hidden
                    targetElement.querySelector('select').value = "";
                }
            }
        });
    });
});



//creative and branding services////
document.addEventListener("DOMContentLoaded", () => {
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modal = document.getElementById('projectInquiryModal');
    const checkboxes = document.querySelectorAll('.service-checkbox');
    if (openModalBtn) { openModalBtn.addEventListener('click', () => { modal.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }); }
    if (closeModalBtn) { closeModalBtn.addEventListener('click', () => { modal.classList.add('hidden'); document.body.style.overflow = 'auto'; }); }
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const targetId = this.getAttribute('data-detail');
            const targetElement = document.getElementById(targetId);
            if (targetElement) { if (this.checked) { targetElement.classList.remove('hidden'); } else { targetElement.classList.add('hidden'); targetElement.querySelector('select').value = ""; } }
        });
    });
});




//portfolio//
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. FILTER LOGIC ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active state from all buttons
            filterBtns.forEach(b => {
                b.classList.remove('bg-brandBlack', 'text-white', 'shadow-lg');
                b.classList.add('bg-white', 'text-gray-600', 'border-gray-200');
            });

            // Add active state to clicked button
            btn.classList.remove('bg-white', 'text-gray-600', 'border-gray-200');
            btn.classList.add('bg-brandBlack', 'text-white', 'shadow-lg');

            const filterValue = btn.getAttribute('data-filter');

            // Loop through grid items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    // Re-trigger animation
                    setTimeout(() => { item.classList.add('active'); }, 50);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('active');
                }
            });
        });
    });

    // --- 2. PROJECT MODAL DATA (REMOVED - see line 588 for correct version) ---
    // Consolidated into single projectsDB object below

    // --- 3. MODAL OPEN/CLOSE LOGIC (REMOVED - using consolidated version below) ---

});

// contact form validation//

document.addEventListener('DOMContentLoaded', function () {
    const subjectSelect = document.getElementById('subject');
    const techGroup = document.getElementById('tech-topics-group');
    const brandingGroup = document.getElementById('branding-topics-group');
    const techSelect = document.getElementById('tech_topic');
    const brandingSelect = document.getElementById('branding_topic');

    subjectSelect.addEventListener('change', function () {
        const value = this.value;

        // 1. Hide both groups by default on change
        techGroup.classList.add('hidden');
        brandingGroup.classList.add('hidden');

        // 2. Remove the "required" attribute so the form doesn't get stuck if they are hidden
        techSelect.removeAttribute('required');
        brandingSelect.removeAttribute('required');

        // 3. Show specific groups and make them required based on the selection
        if (value === 'tech') {
            techGroup.classList.remove('hidden');
            techSelect.setAttribute('required', 'required');
        } else if (value === 'branding') {
            brandingGroup.classList.remove('hidden');
            brandingSelect.setAttribute('required', 'required');
        } else if (value === 'both') {
            techGroup.classList.remove('hidden');
            brandingGroup.classList.remove('hidden');
            techSelect.setAttribute('required', 'required');
            brandingSelect.setAttribute('required', 'required');
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // Triggers when element is 100px into the screen

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    // Listen for scroll events
    window.addEventListener('scroll', revealOnScroll);

    // Trigger once on page load to catch anything already at the top
    revealOnScroll();
});


// 2. PORTFOLIO GRID FILTERING//



// AWARD LIGHTBOX FUNCTIONS
window.openAwardLightbox = function (imageSrc, captionText) {
    const modal = document.getElementById('awardLightbox');
    const img = document.getElementById('lightboxImage');
    const caption = document.getElementById('lightboxCaption');

    img.src = imageSrc;
    caption.textContent = captionText;

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    setTimeout(() => {
        modal.classList.remove('opacity-0');
        img.classList.remove('scale-95');
        img.classList.add('scale-100');
    }, 10);

    document.body.style.overflow = 'hidden';
};

window.closeAwardLightbox = function () {
    const modal = document.getElementById('awardLightbox');
    const img = document.getElementById('lightboxImage');

    modal.classList.add('opacity-0');
    img.classList.remove('scale-100');
    img.classList.add('scale-95');

    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }, 300);
};







//footer//
document.addEventListener("DOMContentLoaded", () => {
    const footerContainer = document.getElementById("footer-container");

    const footerHtml = `
<footer class="bg-brandBlack text-white py-12 overflow-hidden w-full">
    <!-- Removed px-6, lg:px-12, and max-w-screen-2xl to make it fit the screen perfectly edge-to-edge -->
    <div class="w-full mx-auto pr-6 pl-12">
        
        <!-- Upgraded to a 7-column grid on large screens to fit the 2 new columns -->
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-x-6 lg:gap-x-8 gap-y-10 border-b border-gray-700 pb-10">
            
            <!-- About Section (Spans 2 columns on desktop, full width on tablet/mobile) -->
            <div class="col-span-2 md:col-span-4 lg:col-span-2 space-y-4 pr-0 lg:pr-6">
                <h3 class="text-xl font-semibold text-white">Africana Tech & Branding Ltd</h3>
                <p class="text-sm text-gray-400 leading-relaxed text-justify sm:text-left">
                    Born from a passion for African innovation, Africana Tech is a unified digital powerhouse. We deliver cutting-edge technology solutions that drive operational growth, ensure uncompromising data security, and establish an unforgettable digital presence. Whether we are architecting complex enterprise systems or crafting resonant brand identities, our mission is to equip ambitious businesses across Africa and beyond with the ultimate competitive edge.
                </p>
            </div>    

             <!-- Links Column -->
            <div class="col-span-1 md:col-span-1 lg:col-span-1">
                <h3 class="text-lg font-semibold mb-4 text-white">Links</h3>
                <ul class="space-y-2 text-sm flex flex-col">
                    <li><a href="index.html" class="text-gray-400 hover:text-white transition">Home</a></li>
                    <li><a href="about.html" class="text-gray-400 hover:text-white transition">About Us</a></li>
                    <li><a href="portfolio.html" class="text-gray-400 hover:text-white transition">Portfolio</a></li>
                    <li><a href="blog.html" class="text-gray-400 hover:text-white transition">Tech Solutions</a></li>
                     <li><a href="blog.html" class="text-gray-400 hover:text-white transition">Branding & Creative</a></li>
                      <li><a href="blog.html" class="text-gray-400 hover:text-white transition">Portfolio</a></li>
                       <li><a href="blog.html" class="text-gray-400 hover:text-white transition">Blog</a></li>
                       <li><a href="blog.html" class="text-gray-400 hover:text-white transition">Contact Us</a></li>
                </ul>
            </div>

            <!-- NEW: Tech Solutions Column -->
            <div class="col-span-1 md:col-span-1 lg:col-span-1">
                <h3 class="text-lg font-semibold mb-4 text-white">Tech Solutions</h3>
                <ul class="space-y-2 text-sm flex flex-col">
                    <li><a href="web info.html" class="text-gray-400 hover:text-white transition">Web Development</a></li>
                    <li><a href="system.html" class="text-gray-400 hover:text-white transition">System Development</a></li>
                    <li><a href="app info.html" class="text-gray-400 hover:text-white transition">App Development</a></li>
                    <li><a href="cyber info.html" class="text-gray-400 hover:text-white transition">Cyber Security</a></li>
                    <li><a href="network info.html" class="text-gray-400 hover:text-white transition">Networking</a></li>
                    <li><a href="computer.html" class="text-gray-400 hover:text-white transition">IT Maintenance</a></li>
                    <li><a href="ai training.html" class="text-gray-400 hover:text-white transition">AI Training</a></li>
                    <li><a href="corparate info.html" class="text-gray-400 hover:text-white transition">Corporate Training</a></li>
                   
                </ul>
            </div>

            <!-- NEW: Branding Solutions Column -->
            <div class="col-span-1 md:col-span-1 lg:col-span-1">
                <h3 class="text-lg font-semibold mb-4 text-white">Branding</h3>
                <ul class="space-y-2 text-sm flex flex-col">
                    <li><a href="branding.html" class="text-gray-400 hover:text-white transition">Brand Identity</a></li>
                    <li><a href="ux design.html" class="text-gray-400 hover:text-white transition">UI/UX Design</a></li>
                    <li><a href="digital marketing.html" class="text-gray-400 hover:text-white transition">Digital Marketing</a></li>
                    <li><a href="social media.html" class="text-gray-400 hover:text-white transition">Social Media</a></li>
                    <li><a href="strategy.html" class="text-gray-400 hover:text-white transition">Brand Strategy</a></li>
                    <li><a href="copywriting.html" class="text-gray-400 hover:text-white transition">Copywriting</a></li>
                    <li><a href="video.html" class="text-gray-400 hover:text-white transition">Video & Motion</a></li>
                    <li><a href="3d.html" class="text-gray-400 hover:text-white transition">3D & Packaging</a></li>
                    
                </ul>
            </div>

           

            <!-- Social Media Column -->
            <div class="col-span-1 md:col-span-1 lg:col-span-1">
                <h3 class="text-lg font-semibold mb-4 text-white">Social Media</h3>
                <div class="flex flex-col space-y-4 text-sm">                            
                    <a href="https://www.instagram.com/africana_tech_company?igsh=MXZ4b2JoNHBwaDdqbQ==" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition duration-300 flex items-center">
                        <i class="fab fa-instagram text-xl w-6"></i> 
                        <span>Instagram</span>
                    </a>                            
                    
                    <a href="https://www.tiktok.com/@africana_tech_company?_r=1&_t=ZS-96ct8p8j7Ro" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition duration-300 flex items-center">
                        <i class="fab fa-tiktok text-xl w-6"></i> 
                        <span>TikTok</span>
                    </a>
                     <a href="https://www.linkedin.com/in/africana-branding-b57a7542b?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition duration-300 flex items-center">
                        <i class="fab fa-linkedin-in text-xl w-6"></i> 
                        <span>LinkedIn</span>
                    </a>
                     
                    
                    <a href="YOUR_FACEBOOK_LINK" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition duration-300 flex items-center">
                        <i class="fab fa-facebook-f text-xl w-6"></i> 
                        <span>Facebook</span>
                    </a>
                      <a href="YOUR_X_LINK" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition duration-300 flex items-center">
                        <span class="w-6 flex items-center justify-start">
                            <svg viewBox="0 0 24 24" fill="currentColor" class="w-[18px] h-[18px]">
                                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z"/>
                            </svg>
                        </span>
                        <span>X (Twitter)</span>
                    </a>
            
                           
                </div>
            </div>          

            <!-- Contact Column -->
            <div class="col-span-2 md:col-span-4 lg:col-span-1">
                <h3 class="text-lg font-semibold mb-4 text-white">Contact</h3>                
                
                <div class="flex flex-row gap-4 md:flex-col md:gap-5 justify-start"> 
                    
                    <a href="https://wa.me/255672743065" target="_blank" rel="noopener noreferrer" class="flex items-center group transition-all duration-300">
                        <div class="w-12 h-12 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center bg-green-100 text-green-600 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm">
                            <i class="fab fa-whatsapp text-xl md:text-lg"></i>
                        </div>
                        <div class="hidden md:flex flex-col ml-3">
                            <span class="text-[10px] font-bold uppercase text-gray-500">WhatsApp</span>
                            <span class="text-xs font-medium text-gray-300 group-hover:text-green-400">(+255) 0672 743 065</span>
                        </div>
                    </a>

                    <a href="mailto:info@africana.co.tz" class="flex items-center group transition-all duration-300">
                        <div class="w-12 h-12 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                            <i class="fas fa-envelope text-xl md:text-lg"></i>
                        </div>
                        <div class="hidden md:flex flex-col ml-3">
                            <span class="text-[10px] font-bold uppercase text-gray-500">Email Us</span>
                            <span class="text-xs font-medium text-gray-300 group-hover:text-indigo-400">info@africana.co.tz</span>
                        </div>
                    </a>

                    <a href="#" target="_blank" class="flex items-center group transition-all duration-300">
                        <div class="w-12 h-12 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center bg-emerald-100 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                            <i class="fas fa-map-marker-alt text-xl md:text-lg"></i>
                        </div>
                        <div class="hidden md:flex flex-col ml-3">
                            <span class="text-[10px] font-bold uppercase text-gray-500">Location</span>
                            <span class="text-xs font-medium text-gray-300 group-hover:text-emerald-400">Arusha, Tanzania</span>
                        </div>
                    </a>

                </div>
            </div>

        </div> 
        
        <div class="pt-8 text-center text-sm text-gray-400 font-medium">
            <p>© 2026 Africana Tech & Branding Ltd. All rights reserved.</p>
            <div class="mt-3 flex justify-center items-center space-x-4">
                <a href="privacy.html" class="hover:text-blue-500 hover:underline transition-all duration-300">Privacy Policy</a>
                <span class="text-gray-600">|</span>
                <a href="terms.html" class="hover:text-blue-500 hover:underline transition-all duration-300">Terms & Conditions</a>
            </div>
        </div>
    </div>
</footer>
    `;

    if (footerContainer) {
        footerContainer.innerHTML = footerHtml;
    }
});


