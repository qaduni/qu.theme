# qu.theme

A general-purpose, bilingual (RTL/LTR-ready) Hugo theme for universities,
academic departments, faculties, research centers and similar public-sector
organisations. Originally built for Al-Qadisiyah University.

## Features

- **Menu-driven navigation** — every nav surface (header, footer, quick links,
  homepage service cards, hero CTAs) reads from Hugo's `Site.Menus` so you
  reshape the IA from `hugo.toml`, not by editing templates.
- **Multilingual + RTL** — works out-of-the-box with any number of languages;
  RTL is selected from the language's `direction` config, not a hardcoded
  language code, so Arabic, Hebrew, Urdu and Persian all "just work".
- **Configurable branding** — set one CSS-variable-friendly hex value in
  `Site.Params.theme.primaryColor` and the entire UI re-skins (CSS, PWA
  `theme_color`, `<meta name="theme-color">`).
- **Self-hosted fonts** — Cairo + Inter shipped under `static/fonts/`,
  preloaded per-language. Override the font stack via the
  `--font-arabic` / `--font-english` CSS variables.
- **Hugo Pipes asset pipeline** — CSS concatenated, minified, fingerprinted;
  JS minified, fingerprinted; image processing for PWA icons.
- **PWA-ready** — `index.webmanifest` is param-driven; optional service
  worker registration is gated on `Site.Params.pwa.enabled`.
- **SEO scaffolding** — JSON-LD (`Organization` / `EducationalOrganization`
  / etc., all param-driven), Open Graph, Twitter cards, hreflang.
- **Pagefind integration** — wires the official Pagefind component
  UI into the news/announcements list page when.

## Hugo version

Requires **Hugo ≥ 0.124.0** (uses per-language `locale` for ICU date
formatting and `merge` / `dict` template features).

## Installation

### As a Git submodule

```sh
cd your-site
git submodule add https://github.com/qaduni/qu.theme themes/qu.theme
```

Then in your `hugo.toml`:

```toml
theme = "qu.theme"
```

### As a Hugo Module

```sh
cd your-site
hugo mod init github.com/you/your-site
```

Then in `hugo.toml`:

```toml
[module]
  [[module.imports]]
    path = "github.com/qaduni/qu.theme"
```

## License

[MIT](LICENSE) — use, fork, modify, redistribute. Attribution not required
but appreciated.
