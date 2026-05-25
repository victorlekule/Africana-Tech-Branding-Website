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
        { name: "Tech Solutions", url: "tech solution.html", subPages: ["cyber info.html", "computer.html", "network info.html", "web info.html", "ai training.html", "app info.html", "system.html", "corparate info.html"] },
        { name: "Branding & Creative", url: "branding.html", subPages: ["copywriting.html", "digital marketing.html", "identity.html", "strategy.html", "ux design.html", "video.html", "social media.html", "3d.html"] },
        { name: "Portfolio", url: "portfolio.html", subPages: [] },
        { name: "Blog", url: "blog.html", subPages: [] },
        { name: "Contact Us", url: "contact.html", subPages: [] }
    ];

    // 3. Detect Current Page
    const pathParts = window.location.pathname.split(/[\/\\]/);
    const rawPath = pathParts[pathParts.length - 1] || "index.html";
    const currentPath = decodeURIComponent(rawPath).toLowerCase().trim(); 

    // 3A. Desktop Links
    const desktopNavItemsHtml = navLinks.map(link => {
        const isActive = currentPath === link.url.toLowerCase().trim() || link.subPages.some(page => currentPath === page.toLowerCase().trim());
        
        const activeClasses = isActive 
            ? "text-yellow-400 border-yellow-400" 
            : "text-brandWhite border-transparent hover:text-yellow-400 hover:border-yellow-400";

        return `<li>
            <a href="${link.url}" class="nav-link pb-1 border-b-2 transition-all duration-300 font-semibold text-base tracking-wide ${activeClasses}">
                ${link.name}
            </a>
        </li>`;
    }).join('');

    // 3B. Mobile Links
    const mobileNavItemsHtml = navLinks.map(link => {
        const isActive = currentPath === link.url.toLowerCase().trim() || link.subPages.some(page => currentPath === page.toLowerCase().trim());
        
        // Active: Yellow text, yellow line on the backside (border-r-4), no background.
        const activeClasses = isActive 
            ? "text-yellow-400 border-r-4 border-yellow-400 bg-transparent" 
            : "text-brandBlue border-r-4 border-transparent hover:text-blue-800 hover:bg-gray-50";

        return `<li class="border-b border-gray-200 last:border-b-0 m-0 p-0">
            <a href="${link.url}" class="mobile-nav-link block w-full transition-colors duration-300 font-semibold text-base tracking-wide py-4 px-6 ${activeClasses}">
                ${link.name}
            </a>
        </li>`;
    }).join('');

    // 4. Construct Header HTML (RESTORED EXACTLY TO YOUR ORIGINAL)
    const headerHtml = `
        <header class="w-full bg-brandBlue shadow-md fixed top-0 z-50">
            <div class="w-full px-4 md:px-8 py-5 xl:py-8 flex justify-between items-center">
                
                <div class="flex-shrink-0 z-50 overflow-hidden">
                    <a href="#" class="text-xl md:text-2xl font-bold text-brandWhite tracking-wide whitespace-nowrap">
                        AFRICANA TECH COMPANY
                    </a>
                </div>

                <nav class="hidden xl:block">
                    <ul class="flex space-x-8 items-center m-0 p-0">
                        ${desktopNavItemsHtml}
                    </ul>
                </nav>

                <div class="xl:hidden flex items-center z-50">
                    <button id="mobile-menu-btn" class="text-brandWhite hover:text-gray-200 focus:outline-none p-2 mr-[-8px]">
                        <svg id="icon-open" class="w-7 h-7 block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                        <svg id="icon-close" class="w-7 h-7 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div id="mobile-menu" class="hidden xl:hidden absolute top-full left-0 bg-brandWhite shadow-xl border-b border-r border-gray-300 h-fit w-max overflow-hidden">
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
    const iconOpen = document.getElementById("icon-open");
    const iconClose = document.getElementById("icon-close");

    mobileBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
        iconOpen.classList.toggle("hidden");
        iconOpen.classList.toggle("block");
        iconClose.classList.toggle("hidden");
        iconClose.classList.toggle("block");
    });

    // 7. Active State & Auto-Close Logic (Simplified since URL handles active state)
    const allLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Closes menu when a link is clicked
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
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



document.addEventListener('DOMContentLoaded', function() {
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
            if(openModalBtn) {
                openModalBtn.addEventListener('click', () => {
                    modal.classList.remove('hidden');
                    document.body.style.overflow = 'hidden'; // Stop background scrolling
                });
            }

            // Close Modal
            if(closeModalBtn) {
                closeModalBtn.addEventListener('click', () => {
                    modal.classList.add('hidden');
                    document.body.style.overflow = 'auto'; // Restore scrolling
                });
            }

            // Toggle dynamic fields when checkboxes are clicked
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
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
            if(openModalBtn) { openModalBtn.addEventListener('click', () => { modal.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }); }
            if(closeModalBtn) { closeModalBtn.addEventListener('click', () => { modal.classList.add('hidden'); document.body.style.overflow = 'auto'; }); }
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
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

 document.addEventListener('DOMContentLoaded', function() {
            const subjectSelect = document.getElementById('subject');
            const techGroup = document.getElementById('tech-topics-group');
            const brandingGroup = document.getElementById('branding-topics-group');
            const techSelect = document.getElementById('tech_topic');
            const brandingSelect = document.getElementById('branding_topic');

            subjectSelect.addEventListener('change', function() {
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
window.openAwardLightbox = function(imageSrc, captionText) {
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

window.closeAwardLightbox = function() {
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
                <h3 class="text-xl font-semibold text-white">Africana Tech</h3>
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
                     <a href="YOUR_LINKEDIN_LINK" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition duration-300 flex items-center">
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

                    <a href="mailto:africanatech@gmail.com" class="flex items-center group transition-all duration-300">
                        <div class="w-12 h-12 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                            <i class="fas fa-envelope text-xl md:text-lg"></i>
                        </div>
                        <div class="hidden md:flex flex-col ml-3">
                            <span class="text-[10px] font-bold uppercase text-gray-500">Email Us</span>
                            <span class="text-xs font-medium text-gray-300 group-hover:text-indigo-400">africanatech@gmail.com</span>
                        </div>
                    </a>

                    <a href="#" target="_blank" class="flex items-center group transition-all duration-300">
                        <div class="w-12 h-12 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center bg-emerald-100 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                            <i class="fas fa-map-marker-alt text-xl md:text-lg"></i>
                        </div>
                        <div class="hidden md:flex flex-col ml-3">
                            <span class="text-[10px] font-bold uppercase text-gray-500">Location</span>
                            <span class="text-xs font-medium text-gray-300 group-hover:text-emerald-400">Mwanza, Tanzania</span>
                        </div>
                    </a>

                </div>
            </div>

        </div> 
        
        <div class="pt-8 text-center text-sm text-gray-400 font-medium">
            <p>© 2026 Africana Tech Company. All rights reserved.</p>
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


