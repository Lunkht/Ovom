document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
    }

    // Close mobile menu when clicking on a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
            document.body.classList.remove('nav-open');
        });
    });

    // Close mobile menu when scrolling
    window.addEventListener('scroll', () => {
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
            document.body.classList.remove('nav-open');
        }
    }, { passive: true });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && mobileMenuToggle) {
            const isClickInsideNav = navLinks.contains(e.target);
            const isClickOnToggle = mobileMenuToggle.contains(e.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        }
    });

    // Smooth scrolling for navigation links
    const allNavLinks = document.querySelectorAll('header .nav-links a[href^="#"]');

    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});
// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
};

scrollTopBtn.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});


// Cookie Consent Banner (robust: localStorage + cookie fallback)
function setCookie(name, value, days) {
    try {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
    } catch (e) {
        // ignore
    }
}

function getCookie(name) {
    try {
        return document.cookie.split('; ').reduce((r, v) => {
            const parts = v.split('=');
            return parts[0] === name ? decodeURIComponent(parts[1]) : r;
        }, '');
    } catch (e) {
        return '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAcceptBtn = document.getElementById('cookie-accept');
    const cookieDeclineBtn = document.getElementById('cookie-decline');

    // Determine existing consent from localStorage first, then cookie fallback
    const consent = localStorage.getItem('cookieConsent') || getCookie('cookieConsent');

    if (cookieBanner) {
        if (consent) {
            cookieBanner.style.display = 'none';
        } else {
            cookieBanner.style.display = 'flex';
        }
    }

    if (cookieAcceptBtn) {
        cookieAcceptBtn.addEventListener('click', () => {
            try { localStorage.setItem('cookieConsent', 'accepted'); } catch (e) {}
            setCookie('cookieConsent', 'accepted', 365);
            if (cookieBanner) cookieBanner.style.display = 'none';
        });
    }

    if (cookieDeclineBtn) {
        cookieDeclineBtn.addEventListener('click', () => {
            try { localStorage.setItem('cookieConsent', 'declined'); } catch (e) {}
            setCookie('cookieConsent', 'declined', 365);
            if (cookieBanner) cookieBanner.style.display = 'none';
        });
    }
});

