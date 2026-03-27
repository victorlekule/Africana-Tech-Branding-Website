        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brandBlue: '#1645aa',  /* A vibrant, professional tech blue */
                        brandBlack: '#0A0A0A', /* Deep black */
                        brandWhite: '#F9FAFB', /* Slightly off-white for better contrast */
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

document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById('track');
    const numberNav = document.getElementById('numberNav');
    
    if(track && numberNav) {
        const originalCards = document.querySelectorAll('.solution-card');
        const mask = document.querySelector('.solutions-mask');
        
        originalCards.forEach(card => track.appendChild(card.cloneNode(true)));
        originalCards.forEach(card => track.insertBefore(card.cloneNode(true), track.firstChild));

        const allCards = document.querySelectorAll('.solution-card');
        let currentIndex = originalCards.length;
        const slideTime = 3500; 
        let start = Date.now();

        originalCards.forEach((_, i) => {
            const btn = document.createElement('button');
            btn.className = `num-btn ${i === 0 ? 'active' : ''}`;
            btn.textContent = i + 1;
            btn.onclick = () => { currentIndex = i + originalCards.length; resetAuto(); };
            numberNav.appendChild(btn);
        });

        function updateSlider(animate = true) {
            track.style.transition = animate ? 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
            
            const currentCardWidth = mask.getBoundingClientRect().width;
            track.style.transform = `translateX(${-currentIndex * currentCardWidth}px)`;
            
            const dots = document.querySelectorAll('.num-btn');
            const realIndex = currentIndex % originalCards.length;
            dots.forEach((b, i) => b.classList.toggle('active', i === realIndex));
        }

        function checkInfinite() {
            if (currentIndex >= originalCards.length * 2) {
                currentIndex = originalCards.length;
                updateSlider(false);
            }
            if (currentIndex < originalCards.length) {
                currentIndex = originalCards.length * 2 - 1;
                updateSlider(false);
            }
        }

        function step() {
            const now = Date.now();
            if (now - start >= slideTime) {
                currentIndex++;
                start = now;
                updateSlider();
                setTimeout(checkInfinite, 750);
            }
            requestAnimationFrame(step);
        }

        function resetAuto() { start = Date.now(); updateSlider(); }

        document.getElementById('nextBtn').onclick = () => { currentIndex++; resetAuto(); setTimeout(checkInfinite, 750); };
        document.getElementById('prevBtn').onclick = () => { currentIndex--; resetAuto(); setTimeout(checkInfinite, 750); };
        
        window.addEventListener('resize', () => { updateSlider(false); });
        
        updateSlider(false);
        requestAnimationFrame(step);
    }
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

document.addEventListener("DOMContentLoaded", () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if(filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 1. Reset all buttons to default styling
                filterBtns.forEach(b => {
                    b.classList.remove('bg-brandBlack', 'text-white', 'shadow-lg', 'shadow-black/20');
                    b.classList.add('bg-white', 'text-gray-600');
                });
                
                // 2. Highlight the clicked button
                btn.classList.remove('bg-white', 'text-gray-600');
                btn.classList.add('bg-brandBlack', 'text-white', 'shadow-lg', 'shadow-black/20');

                // 3. Filter the grid items
                const filterValue = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.9)';
                        setTimeout(() => { item.style.display = 'none'; }, 300);
                    }
                });
            });
        });
    }
});

const projectsDB = {
    'morix': {
        title: 'Morix Beyond Zanzibar', category: 'Brand Identity', client: 'Morix Tours & Safaris',
        challenge: 'Morix Tours needed a high-end, luxury brand identity that stood out from standard safari operators, capturing the unique essence of Zanzibar.',
        solution: 'We engineered a complete visual overhaul including a bespoke logo, premium typography, and a cohesive color palette.',
        impact: 'The new identity increased premium package inquiries by 45% within the first three months of launch.',
        images: ['https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&auto=format&fit=crop']
    },
    'child-comforters': {
        title: 'African Child Comforters', category: 'Web Platform', client: 'ACC NGO',
        challenge: 'The NGO needed a secure, easy-to-use platform to accept international donations and showcase their fieldwork.',
        solution: 'We developed a responsive, high-performance web platform integrated with secure payment gateways.',
        impact: 'Online donations increased by 300% in the first year.',
        images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&auto=format&fit=crop']
    },
    'fpssa': {
        title: 'FPSSA Portal', category: 'System Development', client: 'Federation of Procurement and Supplies',
        challenge: 'FPSSA required a massive digital system to manage student records securely.',
        solution: 'We built a bespoke enterprise software architecture featuring automated data management and user portals.',
        impact: 'Administrative processing time was reduced by 70%.',
        images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&auto=format&fit=crop']
    }
};

let sliderImages = [];
let sliderIndex = 0;

window.openProjectModal = function(id) {
    try {
        console.log('Opening modal for project:', id);
        
        const data = projectsDB[id];
        if(!data) {
            console.error('Project not found in projectsDB:', id);
            console.log('Available projects:', Object.keys(projectsDB));
            return;
        }

        // Update modal content
        const titleEl = document.getElementById('modal-title');
        const categoryEl = document.getElementById('modal-category');
        const clientEl = document.getElementById('modal-client');
        const challengeEl = document.getElementById('modal-challenge');
        const solutionEl = document.getElementById('modal-solution');
        const impactEl = document.getElementById('modal-impact');

        if(!titleEl || !categoryEl || !clientEl || !challengeEl || !solutionEl || !impactEl) {
            console.error('Modal elements not found');
            console.log('titleEl:', titleEl);
            console.log('categoryEl:', categoryEl);
            console.log('clientEl:', clientEl);
            console.log('challengeEl:', challengeEl);
            console.log('solutionEl:', solutionEl);
            console.log('impactEl:', impactEl);
            return;
        }

        titleEl.textContent = data.title;
        categoryEl.textContent = data.category;
        clientEl.innerHTML = `<ion-icon name="business" class="mr-2 text-brandBlue"></ion-icon> ${data.client}`;
        challengeEl.textContent = data.challenge;
        solutionEl.textContent = data.solution;
        impactEl.textContent = data.impact;

        // Setup images
        sliderImages = data.images && data.images.length > 0 ? data.images : [];
        sliderIndex = 0;
        
        if(sliderImages.length > 0) {
            window.updateSliderImage();
        } else {
            console.warn('No images found for project:', id);
        }

        // Show modal
        const overlay = document.getElementById('project-modal-overlay');
        const box = document.getElementById('project-modal-box');
        
        if(!overlay || !box) {
            console.error('Modal overlay/box not found');
            console.log('overlay:', overlay);
            console.log('box:', box);
            return;
        }

        overlay.classList.remove('hidden');
        overlay.classList.add('flex');
        setTimeout(() => { 
            box.classList.remove('scale-95', 'opacity-0'); 
            box.classList.add('scale-100', 'opacity-100'); 
        }, 10);
        document.body.style.overflow = 'hidden';
        
        console.log('Modal opened successfully');
    } catch (error) {
        console.error('Error opening project modal:', error);
    }
};

window.updateSliderImage = function() {
    try {
        const img = document.getElementById('modal-main-image');
        const counter = document.getElementById('image-counter');

        if(!img || !counter) {
            console.error('Image or counter element not found');
            return;
        }

        if(sliderImages.length === 0) {
            console.warn('No images to display');
            return;
        }

        img.style.opacity = '0.5';
        setTimeout(() => {
            img.src = sliderImages[sliderIndex];
            img.style.opacity = '1';
        }, 150);
        
        counter.textContent = `${sliderIndex + 1} / ${sliderImages.length}`;
    } catch (error) {
        console.error('Error updating slider image:', error);
    }
};

window.nextImage = function() {
    if(sliderImages.length === 0) return;
    sliderIndex = (sliderIndex + 1) % sliderImages.length;
    window.updateSliderImage();
};

window.prevImage = function() {
    if(sliderImages.length === 0) return;
    sliderIndex = (sliderIndex - 1 + sliderImages.length) % sliderImages.length;
    window.updateSliderImage();
};

window.closeProjectModal = function() {
    try {
        const overlay = document.getElementById('project-modal-overlay');
        const box = document.getElementById('project-modal-box');
        
        if(!overlay || !box) {
            console.error('Modal elements not found for closing');
            return;
        }

        box.classList.remove('scale-100', 'opacity-100');
        box.classList.add('scale-95', 'opacity-0');
        setTimeout(() => { 
            overlay.classList.add('hidden'); 
            overlay.classList.remove('flex'); 
            document.body.style.overflow = 'auto'; 
        }, 300);
    } catch (error) {
        console.error('Error closing project modal:', error);
    }
};

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




// blog
 (function() {
            // Blog Content Database
            const blogDB = {
                'tech-1': {
                    title: 'Why Do You Need a Website? The Ultimate Guide.',
                    category: 'Web Development',
                    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop',
                    content: `
                        <p class="drop-cap">A website is your digital storefront. While social media is excellent for engagement, a website is the only piece of digital real estate you truly own on the internet.</p>
                        <h3>1. Total Control over Your Brand</h3>
                        <p>When you rely solely on Facebook or Instagram, you are at the mercy of their algorithms. A website allows you to control the narrative, the design, and the user journey from start to finish without unexpected algorithm changes ruining your reach.</p>
                        <h3>2. Credibility and Trust</h3>
                        <p>Consumers expect legitimate businesses to have a professional website. A well-designed site with an SSL certificate, proper contact information, and professional email addresses builds instant trust with prospective clients.</p>
                        <blockquote class="border-l-4 border-brandBlue pl-5 py-3 my-10 text-xl sm:text-2xl italic font-semibold text-gray-800 bg-gray-50 rounded-r-xl">
                            "If your business is not on the internet, then your business will be out of business." <br>
                            <span class="text-sm text-brandBlue not-italic mt-2 block">— Bill Gates</span>
                        </blockquote>
                        <h3>3. 24/7 Lead Generation</h3>
                        <p>Your website never sleeps. With proper SEO (Search Engine Optimization) and clear calls-to-action, your website acts as a dedicated sales representative, collecting leads and making sales even when you are offline.</p>
                    `
                },
                'tech-2': {
                    title: 'What Info Should You Have Before Creating a Website?',
                    category: 'Planning',
                    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop',
                    content: `
                        <p>Jumping straight into design without a plan is a recipe for disaster. Here is the vital information you need to gather before contacting a developer.</p>
                        <ul>
                            <li><strong>Target Audience:</strong> Who are you building this for? Understanding your demographic dictates the design language.</li>
                            <li><strong>Core Features:</strong> Do you need a booking system, a payment gateway, or just a portfolio?</li>
                            <li><strong>Brand Guidelines:</strong> Have your high-resolution logos, hex color codes, and preferred fonts ready.</li>
                            <li><strong>Sitemap:</strong> A clear list of pages you need (e.g., Home, About, Services, Contact).</li>
                            <li><strong>Content:</strong> High-quality text and images are often the biggest bottleneck in web design. Prepare them early!</li>
                        </ul>
                    `
                },
                'tech-3': {
                    title: 'Payment Integration for NGOs & E-Commerce',
                    category: 'FinTech',
                    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop',
                    content: `
                        <p>The ability to securely process transactions online is no longer optional—it is the lifeblood of modern digital platforms.</p>
                        <h3>For E-Commerce</h3>
                        <p>Frictionless checkout is key to reducing cart abandonment. Integrating local solutions (like Mobile Money in Africa) alongside global processors (Stripe, PayPal) ensures you capture every possible sale.</p>
                        <h3>For NGOs</h3>
                        <p>Donors want to give securely and easily. Setting up recurring donation systems through integrated payment gateways provides a steady, reliable stream of income for charitable initiatives.</p>
                    `
                },
                'tech-4': {
                    title: 'How to Prevent Being Hacked Before It Happens',
                    category: 'Security',
                    image: 'https://images.unsplash.com/photo-1614064641913-6b059828ebbc?w=1200&auto=format&fit=crop',
                    content: `
                        <p>Cybersecurity is not just an IT problem; it is a fundamental business requirement.</p>
                        <div class="bg-red-50 p-6 rounded-xl border border-red-100 my-8">
                            <h4 class="font-bold text-red-800 mb-4 text-lg">The 3 Pillars of Defense:</h4>
                            <ol class="list-decimal pl-5 space-y-3 text-red-900">
                                <li><strong>Access Control:</strong> Enforce strong, rotating passwords and mandatory Two-Factor Authentication (2FA) for all administrative accounts.</li>
                                <li><strong>Software Updates:</strong> Outdated plugins and core files are the #1 vulnerability. Automate your patching schedule.</li>
                                <li><strong>Off-site Backups:</strong> If a breach occurs, a daily off-site backup allows you to restore your system in minutes rather than losing years of data.</li>
                            </ol>
                        </div>
                    `
                },
                'brand-1': {
                    title: 'What Are the Best Times to Post on Social Media?',
                    category: 'Strategy',
                    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&auto=format&fit=crop',
                    content: `
                        <p class="drop-cap">The algorithm favors early engagement. Posting when your audience is asleep means your content will be buried by the time they wake up.</p>
                        <h3>General Guidelines for 2025:</h3>
                        <ul>
                            <li><strong>Instagram:</strong> Weekdays between 11 AM and 1 PM (lunch breaks) or early evenings around 7 PM.</li>
                            <li><strong>LinkedIn:</strong> Tuesday through Thursday, 8 AM - 10 AM. Professional audiences engage during their morning commute or first hours at the desk.</li>
                            <li><strong>TikTok:</strong> Highly varied, but generally evenings (6 PM - 9 PM) see the highest continuous scroll rates.</li>
                        </ul>
                        <p class="font-bold text-yellow-600 bg-yellow-50 p-4 rounded-lg mt-6 border border-yellow-200">Pro Tip: Always check your own platform insights. Your specific demographic may behave differently than the global average.</p>
                    `
                },
                'brand-2': {
                    title: 'The Best Tools for Social Media Management',
                    category: 'Management',
                    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&auto=format&fit=crop',
                    content: `
                        <p>Managing multiple accounts natively is inefficient. Here are the tools professionals use to scale their operations.</p>
                        <h3>For Scheduling & Analytics</h3>
                        <p><strong>Buffer & Hootsuite:</strong> Excellent for planning a month of content in advance across multiple platforms. They provide unified inboxes so you never miss a customer comment.</p>
                        <h3>For Rapid Design</h3>
                        <p><strong>Canva Pro:</strong> The undisputed king of rapid social media asset creation. With brand kits and built-in resizing, it saves hours of production time compared to traditional software.</p>
                    `
                },
                'brand-3': {
                    title: 'Campaign Objectives: Sales, Traffic, or Awareness?',
                    category: 'Paid Media',
                    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop',
                    content: `
                        <p>Selecting the wrong objective in Meta or Google Ads is the fastest way to burn your marketing budget.</p>
                        <h3>Brand Awareness</h3>
                        <p>Tells the algorithm to show your ad to as many people as possible. Good for new product launches, but terrible for generating immediate sales.</p>
                        <h3>Traffic</h3>
                        <p>Optimizes for link clicks. The algorithm finds people who like to click, but not necessarily people who buy.</p>
                        <h3>Conversions / Sales</h3>
                        <p>The most expensive, but most valuable. The algorithm actively seeks users with a history of purchasing similar products online.</p>
                    `
                },
                'brand-4': {
                    title: 'The Best Image & Video Sizes for Social Media',
                    category: 'Design Specs',
                    image: 'https://images.unsplash.com/photo-1626785775573-4b799315345d?w=1200&auto=format&fit=crop',
                    content: `
                        <p>A pixelated logo ruins brand credibility. Here are the current standard dimensions you need to memorize.</p>
                        <div class="overflow-x-auto mt-8 border border-gray-200 rounded-xl">
                            <table class="min-w-full bg-white">
                                <thead>
                                    <tr class="bg-gray-50 border-b border-gray-200">
                                        <th class="py-4 px-6 text-left font-bold text-brandBlack">Format</th>
                                        <th class="py-4 px-6 text-left font-bold text-brandBlack">Dimensions</th>
                                        <th class="py-4 px-6 text-left font-bold text-brandBlack">Ratio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="border-b border-gray-100">
                                        <td class="py-4 px-6 text-gray-700">Instagram Square</td>
                                        <td class="py-4 px-6 font-mono text-sm">1080 x 1080 px</td>
                                        <td class="py-4 px-6 text-gray-500">1:1</td>
                                    </tr>
                                    <tr class="border-b border-gray-100">
                                        <td class="py-4 px-6 text-gray-700">Insta/TikTok Reels</td>
                                        <td class="py-4 px-6 font-mono text-sm">1080 x 1920 px</td>
                                        <td class="py-4 px-6 text-gray-500">9:16</td>
                                    </tr>
                                    <tr>
                                        <td class="py-4 px-6 text-gray-700">LinkedIn Post</td>
                                        <td class="py-4 px-6 font-mono text-sm">1200 x 627 px</td>
                                        <td class="py-4 px-6 text-gray-500">1.91:1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    `
                }
            };

            // Modal Functions
            window.openBlogModal = function(id) {
                const data = blogDB[id];
                if(!data) return;

                // Populate Modal Data
                document.getElementById('modal-title').textContent = data.title;
                document.getElementById('modal-category').textContent = data.category;
                document.getElementById('modal-hero-image').src = data.image;
                document.getElementById('modal-content').innerHTML = data.content;

                // Animate In
                const overlay = document.getElementById('blog-modal-overlay');
                const box = document.getElementById('blog-modal-box');
                
                overlay.classList.remove('hidden');
                overlay.classList.add('flex');
                
                // Small delay to allow CSS to register the display change before animating
                setTimeout(() => {
                    box.classList.remove('translate-y-full', 'sm:scale-95', 'opacity-0');
                    box.classList.add('translate-y-0', 'scale-100', 'opacity-100');
                }, 10);
                
                document.body.style.overflow = 'hidden'; // Stop background scrolling
            };

            window.closeBlogModal = function() {
                const overlay = document.getElementById('blog-modal-overlay');
                const box = document.getElementById('blog-modal-box');
                
                // Animate Out
                box.classList.remove('translate-y-0', 'scale-100', 'opacity-100');
                box.classList.add('translate-y-full', 'sm:scale-95', 'opacity-0');
                
                // Hide after animation
                setTimeout(() => {
                    overlay.classList.add('hidden');
                    overlay.classList.remove('flex');
                    document.body.style.overflow = 'auto'; // Restore background scrolling
                }, 400); 
            };
        })();
  


//footer//

document.addEventListener("DOMContentLoaded", () => {
    const footerContainer = document.getElementById("footer-container");

    const footerHtml = `
<footer class="bg-brandBlack text-white py-12">
    <div class="w-full max-w-screen-2xl mx-auto px-6 lg:px-12">
        
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 lg:gap-x-12 gap-y-10 border-b border-gray-700 pb-10">
            
            <div class="col-span-2 md:col-span-1 lg:col-span-2 space-y-4">
                <h3 class="text-xl font-semibold text-white">Africana Tech</h3>
                <p class="text-sm text-gray-400 leading-relaxed">
                    We deliver cutting-edge technology solutions that drive growth, enhance security, and establish a powerful digital presence for businesses across Africa and beyond.
                </p>
            </div>    

            <div class="col-span-1 md:col-span-1">
                <h3 class="text-lg font-semibold mb-4 text-white">Links</h3>
                <ul class="space-y-2 text-sm flex flex-col">
                    <li><a href="index.html" class="text-gray-400 hover:text-white transition">Home</a></li>
                    <li><a href="about.html" class="text-gray-400 hover:text-white transition">About Us</a></li>
                    <li><a href="tech solutions.html" class="text-gray-400 hover:text-white transition">Tech Solutions</a></li>
                    <li><a href="branding.html" class="text-gray-400 hover:text-white transition">Branding & Creative</a></li>
                    <li><a href="portfolio.html" class="text-gray-400 hover:text-white transition">Portfolio</a></li>
                    <li><a href="blog.html" class="text-gray-400 hover:text-white transition">Blog</a></li>
                </ul>
            </div>

            <div class="col-span-1 md:col-span-1">
                <h3 class="text-lg font-semibold mb-4 text-white">Social Media</h3>
                <div class="flex flex-col space-y-4 text-sm">                            
                    <a href="YOUR_INSTAGRAM_LINK" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition duration-300 flex items-center">
                        <i class="fab fa-instagram text-xl w-6"></i> 
                        <span>Instagram</span>
                    </a>                            
                    
                    <a href="YOUR_X_LINK" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition duration-300 flex items-center">
                        <span class="w-6 flex items-center justify-start">
                            <svg viewBox="0 0 24 24" fill="currentColor" class="w-[18px] h-[18px]">
                                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z"/>
                            </svg>
                        </span>
                        <span>X (Twitter)</span>
                    </a>                            
                    
                    <a href="YOUR_FACEBOOK_LINK" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition duration-300 flex items-center">
                        <i class="fab fa-facebook-f text-xl w-6"></i> 
                        <span>Facebook</span>
                    </a>
                    <a href="YOUR_TIKTOK_LINK" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition duration-300 flex items-center">
                        <i class="fab fa-tiktok text-xl w-6"></i> 
                        <span>TikTok</span>
                    </a>                            
                </div>
            </div>          

            <div class="col-span-2 md:col-span-1">
                <h3 class="text-lg font-semibold mb-4 text-white">Contact</h3>                
                
                <div class="flex flex-row gap-4 md:flex-col md:gap-5"> 
                    
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
        </div>
    </div>
</footer>
    `;

    if (footerContainer) {
        footerContainer.innerHTML = footerHtml;
    }
});

// ==========================================
// INITIALIZATION & VERIFICATION
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    // Verify modal system is ready
    console.log('=== Portfolio Modal System Verification ===');
    console.log('projectsDB available:', typeof projectsDB !== 'undefined');
    console.log('Available projects:', projectsDB ? Object.keys(projectsDB) : 'N/A');
    console.log('window.openProjectModal available:', typeof window.openProjectModal === 'function');
    console.log('window.closeProjectModal available:', typeof window.closeProjectModal === 'function');
    console.log('window.updateSliderImage available:', typeof window.updateSliderImage === 'function');
    
    // Verify modal HTML elements exist on portfolio page
    const isPortfolioPage = window.location.pathname.toLowerCase().includes('portfolio');
    if(isPortfolioPage) {
        console.log('--- Portfolio Page Elements ---');
        console.log('project-modal-overlay:', document.getElementById('project-modal-overlay') ? '✓ Found' : '✗ Missing');
        console.log('project-modal-box:', document.getElementById('project-modal-box') ? '✓ Found' : '✗ Missing');
        console.log('modal-title:', document.getElementById('modal-title') ? '✓ Found' : '✗ Missing');
        console.log('modal-category:', document.getElementById('modal-category') ? '✓ Found' : '✗ Missing');
        console.log('modal-client:', document.getElementById('modal-client') ? '✓ Found' : '✗ Missing');
        console.log('modal-challenge:', document.getElementById('modal-challenge') ? '✓ Found' : '✗ Missing');
        console.log('modal-solution:', document.getElementById('modal-solution') ? '✓ Found' : '✗ Missing');
        console.log('modal-impact:', document.getElementById('modal-impact') ? '✓ Found' : '✗ Missing');
        console.log('modal-main-image:', document.getElementById('modal-main-image') ? '✓ Found' : '✗ Missing');
        console.log('image-counter:', document.getElementById('image-counter') ? '✓ Found' : '✗ Missing');
    }
});