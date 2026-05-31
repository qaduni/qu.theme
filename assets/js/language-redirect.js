(function () {
    var blob = document.getElementById('theme-languages');
    if (!blob) return;

    var languages;
    try {
        languages = JSON.parse(blob.textContent);
    } catch (e) { return; }
    if (!Array.isArray(languages) || languages.length < 2) return;

    var prefix = document.documentElement.getAttribute('data-storage-prefix') || 'theme';
    var STORAGE_KEY = prefix + '_lang_preference';

    var langUrls = languages.map(function (l) { return l.url; });
    var defaultLang = (languages.filter(function (l) { return l.default; })[0] || languages[0]).lang;
    var path = window.location.pathname;
    var isHomepage = langUrls.indexOf(path) !== -1;

    document.addEventListener('click', function (event) {
        var link = event.target.closest && event.target.closest('a[data-lang-switch]');
        if (!link) return;
        try {
            localStorage.setItem(STORAGE_KEY, link.dataset.langSwitch);
        } catch (e) {}
    }, true);

    if (!isHomepage) return;

    var params = new URLSearchParams(window.location.search);
    var override = params.get('lang');
    var validLangs = languages.map(function (l) { return l.lang; });
    if (override && validLangs.indexOf(override) !== -1) {
        try { localStorage.setItem(STORAGE_KEY, override); } catch (e) {}
        return;
    }

    var stored;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (stored) return;

    var currentLang = document.documentElement.lang;
    var browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();

    var targetLang = defaultLang;
    for (var i = 0; i < validLangs.length; i++) {
        if (browserLang.indexOf(validLangs[i].toLowerCase()) === 0) {
            targetLang = validLangs[i];
            break;
        }
    }

    if (targetLang === currentLang) {
        try { localStorage.setItem(STORAGE_KEY, currentLang); } catch (e) {}
        return;
    }

    var target = languages.filter(function (l) { return l.lang === targetLang; })[0];
    if (!target) return;
    try { localStorage.setItem(STORAGE_KEY, targetLang); } catch (e) {}
    window.location.replace(target.url);
})();
