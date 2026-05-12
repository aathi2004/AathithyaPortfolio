// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animated text
    initAnimatedText();
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize scroll to top button
    initScrollToTop();
    
    // Initialize theme toggle
    initThemeToggle();
});

// The skills marquee auto-scrolls continuously (CSS animation). It pauses on
// hover only for pointer devices via `@media (hover: hover)` in style.css, so
// touch screens keep scrolling without interruption.

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or respect OS preference
    if (localStorage.getItem('theme') === 'dark' || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'))) {
        document.body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// Animated text initialization
function initAnimatedText() {
    const roles = [
        "Aspiring Full Stack Developer",
        "UI & UX Designer",
        "Software Developer",
        "AI Enthusiast"
    ];

    let currentRole = 0;
    let currentChar = 0;
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const delayBetweenRoles = 1500;
    const typingElement = document.getElementById("typing-text");

    function typeEffect() {
        if (currentChar < roles[currentRole].length) {
            typingElement.textContent += roles[currentRole].charAt(currentChar);
            currentChar++;
            setTimeout(typeEffect, typingSpeed);
        } else {
            setTimeout(eraseEffect, delayBetweenRoles);
        }
    }

    function eraseEffect() {
        if (currentChar > 0) {
            typingElement.textContent = roles[currentRole].substring(0, currentChar - 1);
            currentChar--;
            setTimeout(eraseEffect, erasingSpeed);
        } else {
            currentRole = (currentRole + 1) % roles.length;
            setTimeout(typeEffect, typingSpeed);
        }
    }

    // Start animation
    typeEffect();
}

// Mobile navigation toggle
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (!hamburger || !navLinks) return;

    const setOpen = (open) => {
        hamburger.classList.toggle('active', open);
        navLinks.classList.toggle('active', open);
        hamburger.setAttribute('aria-expanded', String(open));
    };

    hamburger.addEventListener('click', () => {
        setOpen(!navLinks.classList.contains('active'));
    });

    // Keyboard support (Enter / Space) since the toggle is a div with role="button"
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen(!navLinks.classList.contains('active'));
        }
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(item => {
        item.addEventListener('click', () => setOpen(false));
    });

    // Close when tapping outside the menu
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            setOpen(false);
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Adjust for header height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validate name
            if (name === '') {
                showError('name', 'Please enter your name');
                isValid = false;
            } else {
                clearError('name');
            }
            
            // Validate email
            if (email === '') {
                showError('email', 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError('email');
            }
            
            // Validate message
            if (message === '') {
                showError('message', 'Please enter your message');
                isValid = false;
            } else {
                clearError('message');
            }
            
            if (isValid) {
                // Form is valid, you can submit it or send with AJAX
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            }
        });
    }
}

// Helper function to validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show error message
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    let errorElement = field.nextElementSibling;
    
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    errorElement.textContent = message;
    field.style.borderColor = '#ff6b6b';
}

// Clear error message
function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = field.nextElementSibling;
    
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
    
    field.style.borderColor = '';
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.education-card, .project-card, .certification-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Set initial state for animated elements
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

// Scroll to top button
function initScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.classList.add('scroll-to-top');
    document.body.appendChild(scrollToTopBtn);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
}