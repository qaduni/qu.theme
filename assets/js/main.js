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

document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }

    const header = document.querySelector('.site-header');
    if (header) {
        let lastScroll = 0;
        let ticking = false;

        window.addEventListener('scroll', function () {
            lastScroll = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(function () {
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

    const dropdownItems = document.querySelectorAll('.nav-menu li');

    dropdownItems.forEach(item => {
        const dropdown = item.querySelector('.nav-dropdown, .nav-sub-dropdown');

        if (dropdown) {
            const trigger = item.querySelector('.nav-label') || item.querySelector('a');
            if (trigger) {
                trigger.addEventListener('click', function (e) {
                    if (window.innerWidth <= 768 || trigger.tagName.toLowerCase() === 'span') {
                        e.preventDefault();
                        e.stopPropagation();
                        item.classList.toggle('dropdown-open');
                    }
                });
            }
        }
    });

    if (document.body.dataset.pwaEnabled === 'true' && 'serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/sw.js').catch(function () { });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const navToggles = document.querySelectorAll('.nav-dropdown-toggle');

    navToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

            // Close sibling menus on the same level
            const parentLi = toggle.closest('li');
            const siblingToggles = parentLi.parentElement.querySelectorAll(':scope > li > .nav-dropdown-toggle');
            siblingToggles.forEach(sib => {
                if (sib !== toggle) {
                    sib.setAttribute('aria-expanded', 'false');
                    sib.closest('li').classList.remove('is-open');
                }
            });

            // Toggle active state
            toggle.setAttribute('aria-expanded', !isExpanded);
            parentLi.classList.toggle('is-open', !isExpanded);
        });
    });

    // Handle ESC Key to close open menus sequentially
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openToggles = Array.from(document.querySelectorAll('.nav-dropdown-toggle[aria-expanded="true"]'));
            if (openToggles.length > 0) {
                // Target the deepest open submenu first
                const deepestToggle = openToggles.pop();
                deepestToggle.setAttribute('aria-expanded', 'false');
                deepestToggle.closest('li').classList.remove('is-open');
                deepestToggle.focus();
            }
        }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-nav')) {
            document.querySelectorAll('.nav-dropdown-toggle[aria-expanded="true"]').forEach(toggle => {
                toggle.setAttribute('aria-expanded', 'false');
                toggle.closest('li').classList.remove('is-open');
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const fixFilterLabel = () => {
        document.querySelectorAll('pagefind-filter-dropdown').forEach(filter => {
            const button = filter.querySelector('.pf-dropdown-trigger');
            const label = filter.getAttribute('label');

            if (button && label && !button.hasAttribute('aria-label')) {
                button.setAttribute('aria-label', label);
            }
        });
    };

    fixFilterLabel();

    new MutationObserver(fixFilterLabel).observe(document.body, {
        childList: true,
        subtree: true
    });
});