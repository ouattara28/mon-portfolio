// ===== Année automatique dans le footer =====
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// ===== Mise en surbrillance du lien de nav actif =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
        link.setAttribute('aria-current', 'page');
    }
});

// ===== Page transition légère =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pageBody = document.body;

function revealPage() {
    if (!prefersReducedMotion) {
        pageBody.classList.add('page-transition--visible');
    }
}

function attachLinkTransitions() {
    document.querySelectorAll('a[href]').forEach(link => {
        const url = link.getAttribute('href');
        if (!url || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:') || link.target === '_blank') {
            return;
        }
        link.addEventListener('click', event => {
            event.preventDefault();
            pageBody.classList.add('page-transition--exit');
            const destination = link.href;
            setTimeout(() => {
                window.location.href = destination;
            }, 240);
        });
    });
}

function initMobileNav() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    const toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.className = 'nav-toggle';
    toggleButton.textContent = 'Menu';
    toggleButton.setAttribute('aria-controls', 'navigation');
    toggleButton.setAttribute('aria-expanded', 'false');

    const navParent = nav.parentNode;
    if (navParent) {
        navParent.insertBefore(toggleButton, nav);
    }

    toggleButton.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        document.body.classList.toggle('js', isOpen);
        toggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
}

function handleReducedMotion() {
    if (prefersReducedMotion) {
        document.documentElement.classList.remove('js');
        document.body.classList.add('page-transition--visible');
    }
}

function animateReveals() {
    if (prefersReducedMotion) {
        document.querySelectorAll('.cc, .monblock, .card, ul.hobbies').forEach(el => {
            el.classList.add('reveal-visible');
        });
        return;
    }

    document.documentElement.classList.add('js');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.18
    });

    document.querySelectorAll('.cc, .monblock, .card, ul.hobbies').forEach(el => {
        observer.observe(el);
    });
}

// ===== Formulaire de contact =====
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi...';
        }

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatus.textContent = '✅ Message envoyé avec succès, merci !';
                contactForm.reset();
            } else {
                formStatus.textContent = "❌ Une erreur est survenue, réessayez ou contactez-moi par email.";
            }
        } catch (err) {
            formStatus.textContent = "❌ Impossible d'envoyer le message (connexion). Réessayez plus tard.";
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Envoyer';
            }
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    if (!prefersReducedMotion) {
        pageBody.classList.add('page-transition');
    }
    revealPage();
    animateReveals();
    handleReducedMotion();
    attachLinkTransitions();
    initMobileNav();
});
