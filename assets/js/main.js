// Flip html.no-js → html.js as early as possible so the .reveal CSS rule
// only hides content when JS is actually able to un-hide it.
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

// Reveal-on-scroll — adds .is-visible to .reveal elements as they enter the
// viewport. Single-shot per element. No-ops gracefully when IO isn't
// available (old browsers just see content immediately).
(function () {
    function revealAll() {
        document.querySelectorAll('.reveal').forEach(function (el) {
            el.classList.add('is-visible');
        });
    }

    if (typeof IntersectionObserver === 'undefined') {
        document.addEventListener('DOMContentLoaded', revealAll);
        return;
    }

    document.addEventListener('DOMContentLoaded', function () {
        var targets = document.querySelectorAll('.reveal');
        if (!targets.length) return;

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        targets.forEach(function (el) { io.observe(el); });
    });
})();

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }
    
    // Header scroll effect (Throttled)
    const header = document.querySelector('.site-header');
    if (header) {
        let lastScroll = 0;
        let ticking = false;

        window.addEventListener('scroll', function() {
            lastScroll = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(function() {
                    if (lastScroll > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                    ticking = false;
                });

                ticking = true;
            }
        });
    }
    
    // Mobile dropdown handling
    const dropdownItems = document.querySelectorAll('.nav-menu li');

    dropdownItems.forEach(item => {
        const dropdown = item.querySelector('.nav-dropdown, .nav-sub-dropdown');

        if (dropdown) {
            const trigger = item.querySelector('.nav-label') || item.querySelector('a');
            if (trigger) {
                trigger.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768 || trigger.tagName.toLowerCase() === 'span') {
                        e.preventDefault();
                        e.stopPropagation();
                        item.classList.toggle('dropdown-open');
                    }
                });
            }
        }
    });

    // Service worker registration — gated on Site.Params.pwa.enabled (the
    // body carries data-pwa-enabled="true" when enabled). Sites that have
    // not provided a /sw.js will get a 404, so this stays opt-in.
    if (document.body.dataset.pwaEnabled === 'true' && 'serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/sw.js').catch(function () {
                // Intentionally silent: SW failure must not surface in console.
            });
        });
    }
});
