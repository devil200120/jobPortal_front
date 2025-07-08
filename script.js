// Enhanced JavaScript for Responsive Job Portal

document.addEventListener('DOMContentLoaded', function() {
    // Initialize responsive functionality
    initResponsiveMenu();
    initSmoothScrolling();
    initButtonHandlers();
    initJobFilters();
    initSearchFunctionality();
    initScrollEffects();
    initLazyLoading();
    
    // Add resize event listener
    window.addEventListener('resize', handleResize);
    
    // Add scroll event listener for header behavior
    window.addEventListener('scroll', handleScroll);
});

// Mobile menu functionality
function initResponsiveMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle') || document.querySelector('.yzz7op3p');
    const navMenu = document.querySelector('.nav-menu') || document.querySelector('.softlite-block-div[id*="block-isnv20yk"]');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.toggle('active');
            
            // Toggle hamburger animation
            this.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId) || document.querySelector(`[id*="${targetId}"]`);
            
            if (target) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 80;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced button handlers
function initButtonHandlers() {
    const buttons = {
        '.wxiybzph': 'login.html',
        '.nbfw7oqb': 'hire.html',
        '.fr1g48rb': 'jobs.html',
        '.uz1tsoz7': 'contact.html',
        '.i2cyb2bo': 'hire.html',
        '.smdpo7na': 'about.html',
        '.fye0cq5h': 'industry.html',
        '.m8jqfr6s': 'jobs.html',
        '.ka1muz0o': 'jobs.html'
    };
    
    Object.entries(buttons).forEach(([selector, page]) => {
        const btn = document.querySelector(selector);
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                // Add loading state
                this.classList.add('loading');
                
                // Navigate after short delay for UX
                setTimeout(() => {
                    window.location.href = page;
                }, 300);
            });
        }
    });
}

// Job filtering functionality
function initJobFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const jobCards = document.querySelectorAll('.job-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter jobs
            jobCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    // Add animation
                    card.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Search functionality
function initSearchFunctionality() {
    const searchInputs = document.querySelectorAll('.search-input');
    const searchBtn = document.querySelector('.job-search .btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const jobTitle = searchInputs[0]?.value || '';
            const location = searchInputs[1]?.value || '';
            
            // Simple search simulation
            if (jobTitle || location) {
                this.textContent = 'Searching...';
                this.classList.add('loading');
                
                setTimeout(() => {
                    this.textContent = 'Search Jobs';
                    this.classList.remove('loading');
                    alert(`Searching for: ${jobTitle} in ${location}`);
                }, 1000);
            }
        });
    }
    
    // Enter key support
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn?.click();
            }
        });
    });
}

// Scroll effects
function initScrollEffects() {
    const cards = document.querySelectorAll('.card, .job-card, .industry-card');
    const stats = document.querySelectorAll('[class*="block-mteszh5f"], [class*="block-y22po7qs"], [class*="block-lnz0it4j"], [class*="block-v9xg5zm5"]');
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out';
                entry.target.style.opacity = '1';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
    
    // Animate stats counter
    stats.forEach(stat => {
        observer.observe(stat);
        stat.addEventListener('animationstart', () => {
            animateCounter(stat);
        });
    });
}

// Counter animation
function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/\D/g, ''));
    
    if (number) {
        let current = 0;
        const increment = number / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            element.textContent = text.replace(/\d+/, Math.floor(current));
        }, 30);
    }
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Handle window resize
function handleResize() {
    const navMenu = document.querySelector('.nav-menu') || document.querySelector('.softlite-block-div[id*="block-isnv20yk"]');
    const mobileToggle = document.querySelector('.mobile-menu-toggle') || document.querySelector('.yzz7op3p');
    
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && navMenu) {
        navMenu.classList.remove('active');
        if (mobileToggle) {
            mobileToggle.classList.remove('active');
        }
        document.body.style.overflow = '';
    }
    
    // Adjust grid layouts
    adjustGridLayouts();
}

// Adjust grid layouts based on screen size
function adjustGridLayouts() {
    const grids = document.querySelectorAll('.grid-2, .grid-3, .grid-4, .jobs-grid');
    
    grids.forEach(grid => {
        const items = grid.children.length;
        const screenWidth = window.innerWidth;
        
        if (screenWidth < 480) {
            grid.style.gridTemplateColumns = '1fr';
        } else if (screenWidth < 768) {
            grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
        } else {
            grid.style.gridTemplateColumns = ''; // Reset to CSS default
        }
    });
}

// Handle scroll events
function handleScroll() {
    const header = document.querySelector('header') || document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (header) {
        if (scrollTop > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '#fff';
            header.style.backdropFilter = 'none';
        }
    }
    
    // Show/hide scroll to top button
    const scrollToTop = document.querySelector('.scroll-to-top');
    if (scrollToTop) {
        if (scrollTop > 500) {
            scrollToTop.style.display = 'block';
        } else {
            scrollToTop.style.display = 'none';
        }
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideInLeft {
        from {
            transform: translateX(-30px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(30px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .mobile-menu-toggle.active {
        transform: rotate(90deg);
    }
    
    .nav-menu.active {
        animation: slideInLeft 0.3s ease-out;
    }
    
    .lazy {
        filter: blur(5px);
        transition: filter 0.3s;
    }
    
    .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #007bff;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: none;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
    }
    
    .scroll-to-top:hover {
        background: #0056b3;
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);

// Add scroll to top button
const scrollToTop = document.createElement('div');
scrollToTop.className = 'scroll-to-top';
scrollToTop.innerHTML = '↑';
scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
document.body.appendChild(scrollToTop);

// Performance optimization
const debouncedResize = debounce(handleResize, 250);
const debouncedScroll = debounce(handleScroll, 16);

window.removeEventListener('resize', handleResize);
window.removeEventListener('scroll', handleScroll);
window.addEventListener('resize', debouncedResize);
window.addEventListener('scroll', debouncedScroll);