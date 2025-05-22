// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeAnimatedBackground();
    initializeNavbar();
    initializeTypingAnimation();
    initializeSkillBars();
    initializeProjectFilters();
    initializeTestimonialSlider();
    initializeContactForm();
    initializeScrollAnimations();
    initializeCounterAnimations();
    initializeParallaxEffects();
    initializeScrollToTop();
    initializePreloader();
});

// ===============================
// ANIMATED BACKGROUND
// ===============================
function initializeAnimatedBackground() {
    const animatedBg = document.getElementById('animated-bg');
    const particleCount = 30;
    const colors = ['#6c5ce087', '#00cec9', '#fd79a8'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        const posX = Math.floor(Math.random() * window.innerWidth);
        const posY = Math.floor(Math.random() * window.innerHeight);
        
        // Random size
        const size = Math.floor(Math.random() * 20) + 5;
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Random animation delay
        const delay = Math.random() * 5;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.backgroundColor = color;
        particle.style.animationDelay = `${delay}s`;
        
        animatedBg.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    createStars();
});


function createStars() {
    const starsBg = document.querySelector('.stars-bg');
    if (!starsBg) return;
    const starCount = 120;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 2 + 1}px`;
        star.style.height = star.style.width;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starsBg.appendChild(star);
    }
}










// ===============================
// ENHANCED MOBILE NAVBAR
// ===============================
function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('nav-links');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    burger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking overlay
    mobileOverlay.addEventListener('click', closeMobileMenu);
    
    // Close mobile menu when clicking on nav links
    navLinkItems.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });
    
    // Handle navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Handle window resize
    window.addEventListener('resize', handleWindowResize);
    
    // Handle keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    function toggleMobileMenu() {
        const isActive = navLinks.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        navLinks.classList.add('active');
        burger.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation to nav items
        const navItems = navLinks.querySelectorAll('li');
        navItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
        
        // Focus management for accessibility
        setTimeout(() => {
            const firstNavLink = navLinks.querySelector('.nav-link');
            if (firstNavLink) firstNavLink.focus();
        }, 100);
    }
    
    function closeMobileMenu() {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset animation delays
        const navItems = navLinks.querySelectorAll('li');
        navItems.forEach(item => {
            item.style.animationDelay = '';
        });
    }
    
    function handleNavLinkClick(e) {
        const targetId = e.target.getAttribute('href');
        
        // Close mobile menu
        closeMobileMenu();
        
        // Update active nav link
        navLinkItems.forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');
        
        // Smooth scroll to target
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    }
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    function handleWindowResize() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
        
        // Update particle positions on resize
        updateParticlePositions();
    }
    
    function handleKeyboardNavigation(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMobileMenu();
            burger.focus();
        }
        
        // Tab key navigation within mobile menu
        if (e.key === 'Tab' && navLinks.classList.contains('active')) {
            const focusableElements = navLinks.querySelectorAll('.nav-link');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
    
    function updateParticlePositions() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            const newPosX = Math.floor(Math.random() * window.innerWidth);
            const newPosY = Math.floor(Math.random() * window.innerHeight);
            particle.style.left = `${newPosX}px`;
            particle.style.top = `${newPosY}px`;
        });
    }
}
















// ===============================
// TYPING ANIMATION
// ===============================
function initializeTypingAnimation() {
    const typedText = document.getElementById('typed-text');
    const textArray = [
        'Programmer',
        'UI/UX Designer',
        'Full Stack Developer',
        
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            typedText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typeSpeed = 50;
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
}

















// ===============================
// SKILL BARS ANIMATION
// ===============================
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    const skillSection = document.querySelector('.skills');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    if (skillSection) {
        observer.observe(skillSection);
    }
    
    function animateSkillBars() {
        skillBars.forEach((bar, index) => {
            const width = bar.dataset.width;
            setTimeout(() => {
                bar.style.width = `${width}%`;
            }, index * 200);
        });
    }
}









// ===============================
// PROJECT FILTERING
// ===============================
function initializeProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });
    
    function handleFilterClick(e) {
        const filterValue = e.target.dataset.filter;
        
        // Update active filter button
        filterBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Filter projects with animation
        filterProjects(filterValue);
    }
    
    function filterProjects(filterValue) {
        projectCards.forEach((card, index) => {
            const categories = card.dataset.category ? card.dataset.category.split(' ') : [];
            
            if (filterValue === 'all' || categories.includes(filterValue)) {
                showProject(card, index);
            } else {
                hideProject(card);
            }
        });
    }
    
    function showProject(card, index) {
        card.style.display = 'block';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    }
    
    function hideProject(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        setTimeout(() => {
            card.style.display = 'none';
        }, 300);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...

    // For each project card, fetch and display contributors
    document.querySelectorAll('.project-card').forEach(card => {
        const repo = card.getAttribute('data-github');
        const membersDiv = card.querySelector('.project-members');
        if (repo && membersDiv) {
            fetch(`https://api.github.com/repos/${repo}/contributors`)
                .then(res => res.json())
                .then(contributors => {
                    membersDiv.innerHTML = contributors.slice(0, 5).map(user =>
                        `<img src="${user.avatar_url}" alt="${user.login}" class="member-avatar" title="${user.login}">`
                    ).join('');
                    // Store contributors for modal use
                    card._contributors = contributors;
                })
                .catch(() => {
                    membersDiv.innerHTML = '<span style="color:#888;font-size:0.9em;">No data</span>';
                });

       

        // Click event for modal
        card.addEventListener('click', function() {
            showProjectModal(card);
        });
    }
    });

    // Modal close
    document.querySelector('.close-modal').onclick = function() {
        document.getElementById('project-modal').style.display = 'none';
    };
    window.onclick = function(event) {
        if (event.target === document.getElementById('project-modal')) {
            document.getElementById('project-modal').style.display = 'none';
        }
    };
});



document.querySelectorAll('.project-card').forEach(card => {
    const repo = card.getAttribute('data-github');
    const membersDiv = card.querySelector('.project-members');
    const languagesDiv = card.querySelector('.project-languages');
    if (repo && membersDiv) {
        // Fetch contributors
        fetch(`https://api.github.com/repos/${repo}/contributors`)
            .then(res => res.json())
            .then(contributors => {
                membersDiv.innerHTML = contributors.slice(0, 5).map(user =>
                    `<img src="${user.avatar_url}" alt="${user.login}" class="member-avatar" title="${user.login}">`
                ).join('');
                card._contributors = contributors;
            })
            .catch(() => {
                membersDiv.innerHTML = '<span style="color:#888;font-size:0.9em;">No data</span>';
            });

        // Fetch languages
        if (languagesDiv) {
            fetch(`https://api.github.com/repos/${repo}/languages`)
                .then(res => res.json())
                .then(langs => {
                    const langNames = Object.keys(langs);
                    if (langNames.length) {
                        languagesDiv.innerHTML = langNames.map(lang =>
                            `<span class="project-language">${lang}</span>`
                        ).join('');
                        card._languages = langNames;
                    } else {
                        languagesDiv.innerHTML = '<span style="color:#888;font-size:0.9em;">No languages</span>';
                        card._languages = [];
                    }
                })
                .catch(() => {
                    languagesDiv.innerHTML = '<span style="color:#888;font-size:0.9em;">No languages</span>';
                    card._languages = [];
                });
        }
    }

    // Click event for modal
    card.addEventListener('click', function() {
        showProjectModal(card, repo);
    });
});

// Show modal with contributors, images, and languages
function showProjectModal(card, repo) {
    const contributors = card._contributors || [];
    const languages = card._languages || [];
    const modalMembers = document.getElementById('modal-members');
    const modalImages = document.getElementById('modal-images');
    const modalLanguages = document.getElementById('modal-languages');
    const modalTitle = document.getElementById('modal-title');

    // Set project title
    const projectTitle = card.querySelector('.project-title')?.textContent || 'Project Members';
    modalTitle.textContent = projectTitle;

    // Show images (static, from projectExtras)
    const extras = projectExtras[repo] || {};
    if (extras.images && extras.images.length) {
        modalImages.innerHTML = extras.images.map(img =>
            `<img src="${img}" alt="Project image">`
        ).join('');
    } else {
        modalImages.innerHTML = '';
    }

    // Show languages
    if (languages.length) {
        modalLanguages.innerHTML = languages.map(lang =>
            `<span class="modal-language">${lang}</span>`
        ).join('');
    } else {
        modalLanguages.innerHTML = '<span style="color:#888;font-size:0.9em;">No languages</span>';
    }

    // Show contributors with GitHub and LinkedIn links
    if (contributors.length === 0) {
        modalMembers.innerHTML = '<p style="color:#fff;">No contributors found.</p>';
    } else {
        modalMembers.innerHTML = contributors.map(user => {
            const linkedinUrl = extras.linkedin && extras.linkedin[user.login] ? extras.linkedin[user.login] : null;
            return `<div style="margin-bottom:1rem;">
                <img src="${user.avatar_url}" class="member-avatar" alt="${user.login}">
                <div style="color:#fff;font-size:0.9rem">${user.login}</div>
                <div class="modal-member-links">
                    <a href="https://github.com/${user.login}" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>
                    ${linkedinUrl ? `<a href="${linkedinUrl}" target="_blank" title="LinkedIn"><i class="fab fa-linkedin"></i></a>` : ''}
                </div>
            </div>`;
        }).join('');
    }
    document.getElementById('project-modal').style.display = 'flex';
}

// Modal close logic (unchanged)
document.querySelector('.close-modal').onclick = function() {
    document.getElementById('project-modal').style.display = 'none';
};
window.onclick = function(event) {
    if (event.target === document.getElementById('project-modal')) {
        document.getElementById('project-modal').style.display = 'none';
    }
};

















// ===============================
// CONTACT FORM
// ===============================
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Add real-time validation
    const formControls = contactForm.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.addEventListener('blur', validateField);
        control.addEventListener('input', clearErrors);
    });
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        if (!validateForm(name, email, subject, message)) {
            return;
        }
        
        // Simulate form submission
        submitForm({ name, email, subject, message });
    }
    
    function validateForm(name, email, subject, message) {
        let isValid = true;
        
        // Clear previous errors
        clearAllErrors();
        
        if (!name) {
            showError('name', 'Name is required');
            isValid = false;
        }
        
        if (!email) {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!subject) {
            showError('subject', 'Subject is required');
            isValid = false;
        }
        
        if (!message) {
            showError('message', 'Message is required');
            isValid = false;
        }
        
        return isValid;
    }
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        clearError(field.id);
        
        if (!value) {
            showError(field.id, `${field.placeholder} is required`);
        } else if (field.type === 'email' && !isValidEmail(value)) {
            showError(field.id, 'Please enter a valid email address');
        }
    }
    
    function clearErrors(e) {
        clearError(e.target.id);
    }
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.parentElement;
        
        // Remove existing error
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#fd79a8';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.5rem';
        
        formGroup.appendChild(errorElement);
        field.style.borderColor = '#fd79a8';
    }
    
    function clearError(fieldId) {
        const field = document.getElementById(fieldId);
        const formGroup = field.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        field.style.borderColor = '';
    }
    
    function clearAllErrors() {
        const errorMessages = contactForm.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        formControls.forEach(control => {
            control.style.borderColor = '';
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function submitForm(formData) {
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showSuccessMessage();
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        successMessage.style.cssText = `
            background: rgba(0, 206, 201, 0.1);
            color: #00cec9;
            padding: 1rem;
            border-radius: 5px;
            margin-bottom: 1rem;
            text-align: center;
            animation: fadeIn 0.5s ease;
        `;
        
        contactForm.insertBefore(successMessage, contactForm.firstChild);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
}









// ===============================
// SCROLL ANIMATIONS
// ===============================
function initializeScrollAnimations() {
    const animateElements = document.querySelectorAll('.project-card, .service-card, .skills-card, .about-image, .stats');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ===============================
// COUNTER ANIMATIONS
// ===============================
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    let hasAnimated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };
            
            updateCounter();
        });
    }
}

// ===============================
// PARALLAX EFFECTS
// ===============================
function initializeParallaxEffects() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-content');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
}

// ===============================
// SCROLL TO TOP BUTTON
// ===============================
function initializeScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    
    // Styles
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
    });
}

// ===============================
// PRELOADER
// ===============================
function initializePreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">
                <i class="fas fa-code"></i>
                <span>Loading...</span>
            </div>
            <div class="preloader-spinner"></div>
        </div>
    `;
    
    // Styles
    const preloaderStyles = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--dark-bg);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        
        .preloader-content {
            text-align: center;
            color: var(--text-primary);
        }
        
        .preloader-logo {
            font-size: 2rem;
            margin-bottom: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }
        
        .preloader-logo i {
            font-size: 3rem;
            color: var(--primary-color);
            animation: pulse 1.5s infinite;
        }
        
        .preloader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(108, 92, 231, 0.3);
            border-top: 3px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    
    // Add styles to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = preloaderStyles;
    document.head.appendChild(styleSheet);
    
    document.body.appendChild(preloader);
    
    // Hide preloader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
                styleSheet.remove();
                
                // Trigger entrance animations
                triggerEntranceAnimations();
            }, 500);
        }, 1000);
    });
}

// ===============================
// ENTRANCE ANIMATIONS
// ===============================
function triggerEntranceAnimations() {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-cta');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// ===============================
// UTILITY FUNCTIONS
// ===============================

// Debounce function for performance optimization
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===============================
// ACCESSIBILITY ENHANCEMENTS
// ===============================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus management for modal elements
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

// ===============================
// PERFORMANCE OPTIMIZATIONS
// ===============================

// Optimize scroll events
const optimizedScrollHandler = throttle(() => {
    // Handle scroll-based animations here
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Optimize resize events
const optimizedResizeHandler = debounce(() => {
    // Handle resize-based updates here
    updateParticlePositions();
}, 250);

window.addEventListener('resize', optimizedResizeHandler);

// ===============================
// TOUCH GESTURES (Mobile Enhancement)
// ===============================
function initializeTouchGestures() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        handleSwipeGesture();
    }, { passive: true });
    
    function handleSwipeGesture() {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const threshold = 50;
        
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                // Swipe right
                console.log('Swipe right detected');
            } else {
                // Swipe left
                console.log('Swipe left detected');
            }
        } else if (Math.abs(deltaY) > threshold) {
            if (deltaY > 0) {
                // Swipe down
                console.log('Swipe down detected');
            } else {
                // Swipe up
                console.log('Swipe up detected');
            }
        }
    }
}

// Initialize touch gestures
initializeTouchGestures();

// ===============================
// ERROR HANDLING
// ===============================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // You can add error reporting here
});

// ===============================
// SMOOTH SCROLLING FOR ALL LINKS
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===============================
// LAZY LOADING FOR IMAGES
// ===============================
function initializeLazyLoading() {
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
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
initializeLazyLoading();

// ===============================
// DARK MODE TOGGLE (Optional)
// ===============================
function initializeDarkModeToggle() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
    // Add to navbar or wherever you want it
    // document.querySelector('.nav-container').appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const icon = darkModeToggle.querySelector('i');
        icon.className = document.body.classList.contains('light-mode') 
            ? 'fas fa-sun' 
            : 'fas fa-moon';
    });
}

// Uncomment if you want dark mode toggle
// initializeDarkModeToggle();

// ===============================
// INITIALIZATION COMPLETE
// ===============================
console.log('Portfolio website initialized successfully!');

// Update particle positions function for resize handler
function updateParticlePositions() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        const newPosX = Math.floor(Math.random() * window.innerWidth);
        const newPosY = Math.floor(Math.random() * window.innerHeight);
        particle.style.left = `${newPosX}px`;
        particle.style.top = `${newPosY}px`;
    });
}