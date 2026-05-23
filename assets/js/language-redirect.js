(function () {
    // Language redirect — N-language aware. Reads the available languages
    // from a server-rendered <script id="theme-languages"> JSON blob so this
    // file does not need to know any language codes ahead of time. To
    // disable, omit the blob from baseof.html.
    //
    // Storage key is namespaced under the configured site name (read from
    // <html data-storage-prefix>) or "theme" as a fallback. Sites that need
    // a different key set <html data-storage-prefix="acme">.

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

    // Capture clicks on language-switcher links so the destination page
    // sees the persisted preference.
    document.addEventListener('click', function (event) {
        var link = event.target.closest && event.target.closest('a[data-lang-switch]');
        if (!link) return;
        try {
            localStorage.setItem(STORAGE_KEY, link.dataset.langSwitch);
        } catch (e) { /* private mode / quota — non-fatal */ }
    }, true);

    if (!isHomepage) return;

    // ?lang=xx URL override wins over everything else.
    var params = new URLSearchParams(window.location.search);
    var override = params.get('lang');
    var validLangs = languages.map(function (l) { return l.lang; });
    if (override && validLangs.indexOf(override) !== -1) {
        try { localStorage.setItem(STORAGE_KEY, override); } catch (e) {}
        return;
    }

    // Persisted preference — never auto-redirect once user has chosen.
    var stored;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (stored) return;

    var currentLang = document.documentElement.lang;
    var browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();

    // Pick the best matching language: prefer exact browser-lang match,
    // then default site language.
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
