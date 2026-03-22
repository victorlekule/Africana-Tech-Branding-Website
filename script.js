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
        { name: "Tech Solutions", url: "tech solution.html", subPages: ["cyber info.html", "computer.html", "network info.html", "web info.html", "ai training.html", "app info.html"] },
        { name: "Branding & Creative", url: "branding.html", subPages: ["copywriting.html", "digital marketing.html", "identity.html", "strategy.html", "ux design.html", "video.html", "social media.html"] },
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

    // --- 2. PROJECT MODAL DATA ---
    const projectData = {
        'morix': {
            title: 'Morix Beyond Zanzibar',
            category: 'Brand Identity',
            client: 'Morix Tours Ltd.',
            heroImg: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&auto=format&fit=crop',
            challenge: 'Morix was expanding from a local tour operator into a premium, international travel agency. Their outdated visual identity did not reflect the luxury and exclusivity of their new high-end safari and coastal packages.',
            solution: 'We executed a complete ground-up rebrand. This included designing a luxurious new logo mark, defining a warm, earth-toned color palette reflective of the Tanzanian landscape, and producing a comprehensive brand guidelines book. We then rolled this identity out across all marketing collateral and social media templates.',
            results: `
                <div class="flex items-center mb-2"><ion-icon name="trending-up" class="text-brandBlue mr-2 text-xl"></ion-icon> <span>45% increase in high-tier package inquiries</span></div>
                <div class="flex items-center mb-2"><ion-icon name="people" class="text-brandBlue mr-2 text-xl"></ion-icon> <span>2x Social Media Engagement</span></div>
                <div class="flex items-center"><ion-icon name="star" class="text-brandBlue mr-2 text-xl"></ion-icon> <span>Awarded 'Best Local Rebrand' locally</span></div>
            `,
            gallery: [
                'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1628148906325-bb308b46e107?w=800&auto=format&fit=crop'
            ],
            link: '#'
        },
        'child-comforters': {
            title: 'African Child Comforters',
            category: 'Web Platform',
            client: 'ACC NGO',
            heroImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&auto=format&fit=crop',
            challenge: 'The NGO struggled with an outdated website that could not handle international payment gateways securely. Furthermore, their bounce rate was high due to poor mobile responsiveness and lack of clear storytelling.',
            solution: 'We engineered a highly secure, integrated digital platform built on React and Node.js. We implemented Stripe and PayPal APIs for global donation processing, ensuring absolute data security with SSL/TLS encryption. The UI was completely redesigned mobile-first to focus on immersive storytelling and transparent fund tracking.',
            results: `
                <div class="flex items-center mb-2"><ion-icon name="shield-checkmark" class="text-brandBlue mr-2 text-xl"></ion-icon> <span>100% Secure Transactions achieved</span></div>
                <div class="flex items-center mb-2"><ion-icon name="speedometer" class="text-brandBlue mr-2 text-xl"></ion-icon> <span>Page load speed increased by 3x</span></div>
                <div class="flex items-center"><ion-icon name="cash" class="text-brandBlue mr-2 text-xl"></ion-icon> <span>Online donations rose by 120% in Q1</span></div>
            `,
            gallery: [
                'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop'
            ],
            link: '#'
        },
        // You can add 'fpssa', 'coffee-packaging', 'fintech-app', etc. using this exact same structure!
    };

    // --- 3. MODAL OPEN/CLOSE LOGIC ---
    const modalOverlay = document.getElementById('project-modal-overlay');
    const modalBox = document.getElementById('project-modal-box');

    window.openProjectModal = function(projectId) {
        const data = projectData[projectId];
        if (!data) return; // If data isn't filled out yet, don't open

        // Inject Data
        document.getElementById('pm-hero').src = data.heroImg;
        document.getElementById('pm-category').innerText = data.category;
        document.getElementById('pm-title').innerText = data.title;
        document.getElementById('pm-client').innerHTML = `<ion-icon name="business" class="mr-2"></ion-icon> ${data.client}`;
        document.getElementById('pm-challenge').innerText = data.challenge;
        document.getElementById('pm-solution').innerText = data.solution;
        document.getElementById('pm-results').innerHTML = data.results;
        document.getElementById('pm-link').href = data.link;

        // Inject Gallery
        const galleryContainer = document.getElementById('pm-gallery');
        galleryContainer.innerHTML = ''; // Clear old images
        data.gallery.forEach(imgSrc => {
            const imgHtml = `
                <div class="rounded-xl overflow-hidden shadow-md aspect-video">
                    <img src="${imgSrc}" class="w-full h-full object-cover">
                </div>
            `;
            galleryContainer.innerHTML += imgHtml;
        });

        // Show Modal
        modalOverlay.classList.remove('hidden');
        modalOverlay.classList.add('flex');
        
        setTimeout(() => {
            // Remove mobile slide-down and desktop scale-down classes
            modalBox.classList.remove('translate-y-full', 'sm:scale-95', 'opacity-0');
            modalBox.classList.add('translate-y-0', 'sm:scale-100', 'opacity-100');
        }, 10);
        
        document.body.style.overflow = 'hidden'; // Lock background
    };

    window.closeProjectModal = function() {
        modalBox.classList.remove('translate-y-0', 'sm:scale-100', 'opacity-100');
        modalBox.classList.add('translate-y-full', 'sm:scale-95', 'opacity-0');
        
        setTimeout(() => {
            modalOverlay.classList.add('hidden');
            modalOverlay.classList.remove('flex');
        }, 500); // Matches the duration-500
        
        document.body.style.overflow = 'auto'; // Unlock background
    };
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

// blog//
 // TECH SOLUTIONS
const blogData = {   
    'tech-1': {
        category: 'Web Dev',
        title: 'Why do you need a website?',
        content: `
            <p class="mb-6 leading-relaxed text-lg">A website is your digital storefront – it works 24/7 to build credibility, attract customers, and showcase your products or services.</p>
            <p class="mb-6 leading-relaxed text-lg">It gives you full control over your brand narrative, unlike social media platforms that constantly change algorithms. With a website, you can capture leads, sell online, and provide valuable information to your audience. In today’s digital age, not having a website means you’re invisible to a huge part of your market.</p>
        `
    },
    'tech-2': {
        category: 'Planning',
        title: 'What information should you have before creating a website?',
        content: `
            <p class="mb-6 leading-relaxed text-lg">Before building a website, gather the following essentials:</p>
            <ul class="space-y-4 text-lg">
                <li class="flex items-start"><ion-icon name="checkmark-circle" class="text-brandBlue text-2xl mr-3 mt-1"></ion-icon> <div><strong>Purpose & Goals:</strong> What do you want the site to achieve? (e.g., sell products, generate leads, share information).</div></li>
                <li class="flex items-start"><ion-icon name="checkmark-circle" class="text-brandBlue text-2xl mr-3 mt-1"></ion-icon> <div><strong>Target Audience:</strong> Who will visit? (age, location, interests).</div></li>
                <li class="flex items-start"><ion-icon name="checkmark-circle" class="text-brandBlue text-2xl mr-3 mt-1"></ion-icon> <div><strong>Content:</strong> Texts, images, videos, logos, brand colours.</div></li>
                <li class="flex items-start"><ion-icon name="checkmark-circle" class="text-brandBlue text-2xl mr-3 mt-1"></ion-icon> <div><strong>Competitor Analysis:</strong> What do competitors’ sites look like?</div></li>
                <li class="flex items-start"><ion-icon name="checkmark-circle" class="text-brandBlue text-2xl mr-3 mt-1"></ion-icon> <div><strong>Budget & Timeline:</strong> How much can you spend and when do you need it live?</div></li>
                <li class="flex items-start"><ion-icon name="checkmark-circle" class="text-brandBlue text-2xl mr-3 mt-1"></ion-icon> <div><strong>Technical Requirements:</strong> Domain name, hosting, special features (e.g., membership, e‑commerce).</div></li>
            </ul>
        `
    },
    'tech-3': {
        category: 'Strategy',
        title: 'Before creating a website, what should be the goals, mission, and target customers?',
        content: `
            <ul class="space-y-6 text-lg">
                <li class="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h4 class="text-xl font-bold text-brandBlack mb-2">Goals</h4>
                    <p>Define measurable objectives – e.g., increase online sales by 30% in 6 months, grow email list by 500 subscribers, or boost brand awareness.</p>
                </li>
                <li class="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h4 class="text-xl font-bold text-brandBlack mb-2">Mission</h4>
                    <p>A clear statement of what your business stands for and why you exist. This guides the tone and content of your site.</p>
                </li>
                <li class="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h4 class="text-xl font-bold text-brandBlack mb-2">Target Customers</h4>
                    <p>Create detailed buyer personas – their demographics, pain points, and online behaviour. Your website design and messaging must speak directly to them.</p>
                </li>
            </ul>
        `
    },
    'tech-4': {
        category: 'Requirements',
        title: 'What requirements does a customer need to have before building a website?',
        content: `
            <p class="mb-6 leading-relaxed text-lg">To start a website project smoothly, you’ll need:</p>
            <ul class="space-y-4 text-lg">
                <li class="flex items-center"><div class="w-2 h-2 rounded-full bg-brandBlue mr-3"></div> <strong>Domain name</strong> (e.g., www.yourbusiness.com)</li>
                <li class="flex items-center"><div class="w-2 h-2 rounded-full bg-brandBlue mr-3"></div> <strong>Web hosting</strong> (a service that stores your site files)</li>
                <li class="flex items-center"><div class="w-2 h-2 rounded-full bg-brandBlue mr-3"></div> <strong>Brand assets</strong> (logo, colour palette, fonts)</li>
                <li class="flex items-center"><div class="w-2 h-2 rounded-full bg-brandBlue mr-3"></div> <strong>Content</strong> (text for each page, high‑quality images, videos)</li>
                <li class="flex items-center"><div class="w-2 h-2 rounded-full bg-brandBlue mr-3"></div> <strong>Functionality list</strong> (contact form, online shop, booking system, etc.)</li>
                <li class="flex items-center"><div class="w-2 h-2 rounded-full bg-brandBlue mr-3"></div> <strong>Third‑party accounts</strong> (payment gateways, email marketing tools)</li>
            </ul>
        `
    },
    'tech-5': {
        category: 'FinTech',
        title: 'Why do you need payment integration on your NGO e‑commerce?',
        content: `
            <p class="mb-6 leading-relaxed text-lg">Even for an NGO, payment integration is vital:</p>
            <ul class="space-y-4 text-lg">
                <li><strong class="text-brandBlue">Accept Donations:</strong> Make it easy for supporters to contribute online securely.</li>
                <li><strong class="text-brandBlue">Sell Merchandise:</strong> If you sell branded items or event tickets, you need a smooth checkout.</li>
                <li><strong class="text-brandBlue">Recurring Giving:</strong> Offer monthly donation options to build sustainable funding.</li>
                <li><strong class="text-brandBlue">Transparency:</strong> Integrated payments provide automated receipts and records, building trust with donors.</li>
                <li><strong class="text-brandBlue">Global Reach:</strong> Accept payments from anywhere in the world, 24/7.</li>
            </ul>
        `
    },
    'tech-6': {
        category: 'Security',
        title: 'How to protect your website/system from hackers and viruses?',
        content: `
            <p class="mb-6 leading-relaxed text-lg">Implement these essential security measures:</p>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
                <li class="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center"><ion-icon name="lock-closed" class="text-yellow-500 mr-3 text-2xl"></ion-icon> Use HTTPS/SSL to encrypt data.</li>
                <li class="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center"><ion-icon name="refresh-circle" class="text-brandBlue mr-3 text-2xl"></ion-icon> Keep software updated (CMS, plugins).</li>
                <li class="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center"><ion-icon name="key" class="text-brandBlack mr-3 text-2xl"></ion-icon> Strong passwords & 2FA.</li>
                <li class="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center"><ion-icon name="cloud-download" class="text-cyan-500 mr-3 text-2xl"></ion-icon> Regular backups (off‑site).</li>
                <li class="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center"><ion-icon name="shield" class="text-red-500 mr-3 text-2xl"></ion-icon> Web application firewall (WAF).</li>
                <li class="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center"><ion-icon name="bug" class="text-green-500 mr-3 text-2xl"></ion-icon> Security plugins & malware scans.</li>
            </ul>
        `
    },
    'tech-7': {
        category: 'Prevention',
        title: 'What measures can be taken to avoid being hacked?',
        content: `
            <p class="mb-6 leading-relaxed text-lg">Prevention is always better than cure:</p>
            <ul class="space-y-4 text-lg">
                <li class="flex items-center"><div class="w-2 h-2 rounded-full bg-red-500 mr-3"></div> Educate your team about phishing and safe online practices.</li>
                <li class="flex items-center"><div class="w-2 h-2 rounded-full bg-red-500 mr-3"></div> Limit login attempts and change default admin usernames.</li>
                <li class="flex items-center"><div class="w-2 h-2 rounded-full bg-red-500 mr-3"></div> Disable file editing from the dashboard.</li>
                <li class="flex items-center"><div class="w-2 h-2 rounded-full bg-red-500 mr-3"></div> Use a CDN (Content Delivery Network) that offers DDoS protection.</li>
                <li class="flex items-center"><div class="w-2 h-2 rounded-full bg-red-500 mr-3"></div> Regularly scan for malware with tools like Sucuri.</li>
                <li class="flex items-center"><div class="w-2 h-2 rounded-full bg-red-500 mr-3"></div> Remove unused themes/plugins to reduce attack surface.</li>
                <li class="flex items-center"><div class="w-2 h-2 rounded-full bg-red-500 mr-3"></div> Implement a content security policy (CSP) to prevent cross‑site scripting.</li>
            </ul>
        `
    },


// BRANDING & CREATIVE
    'brand-1': {
        category: 'Social Media',
        title: 'What are the best times to post stories on social media?',
        content: `
            <p class="mb-6 leading-relaxed text-lg">Best times vary by platform and audience, but general guidelines are:</p>
            <div class="space-y-4 text-lg">
                <div class="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <ion-icon name="logo-instagram" class="text-3xl text-[#E1306C] mr-4"></ion-icon>
                    <div><strong>Instagram/Facebook:</strong> Weekdays 9 am–11 am and 7 pm–9 pm (when people commute or relax).</div>
                </div>
                <div class="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <ion-icon name="logo-tiktok" class="text-3xl text-black mr-4"></ion-icon>
                    <div><strong>TikTok:</strong> Mornings (7 am–9 am) and evenings (6 pm–10 pm).</div>
                </div>
                <div class="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <ion-icon name="logo-linkedin" class="text-3xl text-[#0077b5] mr-4"></ion-icon>
                    <div><strong>LinkedIn:</strong> Tuesday–Thursday, 8 am–10 am and 4 pm–6 pm.</div>
                </div>
            </div>
            <p class="mt-6 text-gray-500 italic">Pro Tip: Always check your own analytics (Insights) to see when your followers are most active.</p>
        `
    },
    'brand-2': {
        category: 'Management',
        title: 'What are the best tools for social media management and analytics?',
        content: `
            <div class="overflow-x-auto rounded-xl border border-gray-200 shadow-sm mt-4">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-brandBlack text-white text-sm uppercase tracking-widest">
                            <th class="p-4 border-b border-gray-700">Tool</th>
                            <th class="p-4 border-b border-gray-700">Advantages</th>
                            <th class="p-4 border-b border-gray-700">Disadvantages</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm sm:text-base text-gray-700">
                        <tr class="border-b border-gray-100 bg-white hover:bg-gray-50 transition-colors">
                            <td class="p-4 font-bold text-brandBlack">Hootsuite</td>
                            <td class="p-4">Supports many platforms; bulk scheduling; team collaboration.</td>
                            <td class="p-4">Can be expensive; limited analytics in lower plans.</td>
                        </tr>
                        <tr class="border-b border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors">
                            <td class="p-4 font-bold text-brandBlack">Buffer</td>
                            <td class="p-4">Simple, intuitive interface; excellent analytics; affordable.</td>
                            <td class="p-4">Limited social accounts on free plan; no social listening.</td>
                        </tr>
                        <tr class="border-b border-gray-100 bg-white hover:bg-gray-50 transition-colors">
                            <td class="p-4 font-bold text-brandBlack">Sprout Social</td>
                            <td class="p-4">Deep analytics; unified inbox; CRM features.</td>
                            <td class="p-4">Pricey for small businesses; steep learning curve.</td>
                        </tr>
                        <tr class="border-b border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors">
                            <td class="p-4 font-bold text-brandBlack">Later</td>
                            <td class="p-4">Visual Instagram scheduler (drag & drop); user‑friendly.</td>
                            <td class="p-4">Best for visual platforms; fewer features for Twitter/LinkedIn.</td>
                        </tr>
                        <tr class="bg-white hover:bg-gray-50 transition-colors">
                            <td class="p-4 font-bold text-brandBlack">Canva</td>
                            <td class="p-4">Not strictly a scheduler, but has content planner; great for visuals.</td>
                            <td class="p-4">Limited scheduling capabilities; analytics basic.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    },
    'brand-3': {
        category: 'Paid Media',
        title: 'Before posting/sponsoring ads, explain different campaign objectives',
        content: `
            <p class="mb-6 leading-relaxed text-lg">On platforms like Facebook/Instagram, choose an objective based on your precise goal:</p>
            <ul class="space-y-4 text-lg">
                <li><strong class="text-yellow-600">Sales:</strong> Drive purchases on your website. Best for e‑commerce.</li>
                <li><strong class="text-yellow-600">Traffic:</strong> Send people to a specific URL (blog, landing page).</li>
                <li><strong class="text-yellow-600">Engagement:</strong> Get more likes, comments, shares, or event responses.</li>
                <li><strong class="text-yellow-600">Lead Generation:</strong> Collect user info via sign‑up forms directly in the app.</li>
                <li><strong class="text-yellow-600">Brand Awareness:</strong> Reach as many people as possible to build recognition.</li>
                <li><strong class="text-yellow-600">Video Views:</strong> Promote video content to maximise watch time.</li>
                <li><strong class="text-yellow-600">App Installs:</strong> Encourage users to download your mobile app.</li>
            </ul>
        `
    },
    'brand-4': {
        category: 'Design Specs',
        title: 'What are the best image and video sizes for social media?',
        content: `
            <p class="mb-6 leading-relaxed text-lg">Always keep text within safe zones to avoid cropping. Here are the optimal sizes:</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base sm:text-lg">
                <div class="p-4 bg-gray-50 rounded-lg border border-gray-100"><strong>Instagram Post:</strong> 1080 × 1080 px (square)</div>
                <div class="p-4 bg-gray-50 rounded-lg border border-gray-100"><strong>Story/Reels:</strong> 1080 × 1920 px (9:16)</div>
                <div class="p-4 bg-gray-50 rounded-lg border border-gray-100"><strong>Facebook Feed:</strong> 1200 × 630 px (landscape)</div>
                <div class="p-4 bg-gray-50 rounded-lg border border-gray-100"><strong>Facebook Story:</strong> 1080 × 1920 px</div>
                <div class="p-4 bg-gray-50 rounded-lg border border-gray-100"><strong>Twitter Post:</strong> 1600 × 900 px (16:9)</div>
                <div class="p-4 bg-gray-50 rounded-lg border border-gray-100"><strong>LinkedIn Post:</strong> 1200 × 627 px</div>
                <div class="p-4 bg-gray-50 rounded-lg border border-gray-100"><strong>Pinterest Pin:</strong> 1000 × 1500 px (2:3)</div>
                <div class="p-4 bg-gray-50 rounded-lg border border-gray-100"><strong>YouTube Thumbnail:</strong> 1280 × 720 px</div>
            </div>
        `
    },
    'brand-5': {
        category: 'Risk Management',
        title: 'How to protect your social media account from being banned?',
        content: `
            <ul class="space-y-4 text-lg">
                <li class="flex items-start"><div class="w-2 h-2 rounded-full bg-red-500 mr-3 mt-2"></div> <div><strong>Read and follow platform guidelines:</strong> Avoid hate speech, fake news, or prohibited content.</div></li>
                <li class="flex items-start"><div class="w-2 h-2 rounded-full bg-red-500 mr-3 mt-2"></div> <div><strong>Don’t use bots or automation:</strong> Rapid following/unfollowing violates terms of service.</div></li>
                <li class="flex items-start"><div class="w-2 h-2 rounded-full bg-red-500 mr-3 mt-2"></div> <div><strong>Post original content:</strong> Avoid copyright infringement, especially with background music in ads.</div></li>
                <li class="flex items-start"><div class="w-2 h-2 rounded-full bg-red-500 mr-3 mt-2"></div> <div><strong>Engage naturally:</strong> Don’t spam identical comments across dozens of posts.</div></li>
                <li class="flex items-start"><div class="w-2 h-2 rounded-full bg-red-500 mr-3 mt-2"></div> <div><strong>Secure your account:</strong> Use strong passwords and two‑factor authentication (2FA).</div></li>
                <li class="flex items-start"><div class="w-2 h-2 rounded-full bg-red-500 mr-3 mt-2"></div> <div><strong>Respond to warnings:</strong> If you get a violation notice, delete the content and correct the issue immediately.</div></li>
            </ul>
        `
    }
};

// 4. BLOG MODAL CONTROLS//

function openBlogModal(articleId) {
    const data = blogData[articleId];
    
    if (!data) {
        console.error("Article data not found for:", articleId);
        return; 
    }

    document.getElementById('blog-modal-category').innerText = data.category;
    document.getElementById('blog-modal-title').innerText = data.title;
    document.getElementById('blog-modal-body').innerHTML = data.content;

    const overlay = document.getElementById('blog-modal-overlay');
    const box = document.getElementById('blog-modal-box');
    
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    
    setTimeout(() => {
        box.classList.remove('translate-y-full', 'sm:translate-y-0', 'sm:scale-95', 'opacity-0');
        box.classList.add('translate-y-0', 'sm:scale-100', 'opacity-100');
    }, 10);
    
    document.body.style.overflow = 'hidden';
}

function closeBlogModal() {
    const overlay = document.getElementById('blog-modal-overlay');
    const box = document.getElementById('blog-modal-box');
    
    box.classList.remove('translate-y-0', 'sm:scale-100', 'opacity-100');
    box.classList.add('translate-y-full', 'sm:translate-y-0', 'sm:scale-95', 'opacity-0');
    
    setTimeout(() => {
        overlay.classList.add('hidden');
        overlay.classList.remove('flex');
        document.body.style.overflow = 'auto'; 
    }, 400); 
}

// ==========================================
// 5. OTHER MODAL STUBS (Prevents console errors)
// ==========================================
function openTechModal(service) { console.log("Tech Modal triggered for:", service); }
function closeTechModal() { /* Add close logic based on HTML IDs when built */ }

function openBrandModal(service) { console.log("Brand Modal triggered for:", service); }
function closeBrandModal() { /* Add close logic based on HTML IDs when built */ }

function openProjectModal(project) { console.log("Project Modal triggered for:", project); }
function closeProjectModal() { /* Add close logic based on HTML IDs when built */ }




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