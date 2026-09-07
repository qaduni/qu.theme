# qu.theme

A general-purpose, bilingual (RTL/LTR-ready) Hugo theme for universities,
academic departments, faculties, research centers and similar public-sector
organisations. Originally built for Al-Qadisiyah University.

## tech

this theme uses:
- [Sveltia cms](https://sveltiacms.app/en/)
- [Pagefind](https://pagefind.app/)

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
