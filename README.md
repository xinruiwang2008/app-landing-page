# Cadmus website

Static files for the public Cadmus website at https://www.cadmusapp.com.
Deploy the contents of this directory as the site root; no build is required.

## Preview

Run `python3 -m http.server 8080 --directory website` from the repository root,
then visit http://localhost:8080.

## Home page

All pages use one `style.css`, sharing fonts, colors, navigation, and buttons.
Home-only composition and motion remain scoped to `.home` or `landing-*`
classes. Support and legal pages use quiet, unboxed reading layouts without
animation. Their HTML content is unchanged.

The file structure intentionally stays buildless: public HTML, stylesheet,
and search-engine files at the root; images, the font, and its license under
`assets/`. Keep localized privacy and terms filenames at the root: these are
public URLs used by language menus and external links, not duplicate assets
to consolidate. No template engine or JavaScript loader is needed.

Product information is based on the public App Store listing:
https://apps.apple.com/us/app/cadmus-grow-your-vocabulary/id6804102789
(retrieved 2026-10-16). The three word illustrations in `assets/` are supplied
Cadmus artwork: `labyrinth.png`, `ineffable.png`, and `oculus.png`.
Descriptive filenames replace the original UUID filenames. The app icon is from the
published listing; no App Store screenshots are used.
Plus Jakarta Sans and Fraunces are self-hosted under their included SIL Open
Font Licenses. Fraunces is used for display headlines and the Cadmus wordmark;
Plus Jakarta Sans is used for interface and body text.

Illustrations use native disclosure controls to reveal meanings, with
keyboard and touch support. CSS handles staggered entrance, hover, and
progressive scroll-reveal animation. Reduce Motion disables these effects.
On small phones, the illustration gallery supports horizontal swiping.
No JavaScript or runtime dependencies are needed.

## Search and sharing

The home page includes a descriptive title and description, canonical URL,
Open Graph/Twitter metadata, an Apple Smart App Banner, and MobileApplication
JSON-LD. Ratings, prices, and unsupported product claims are intentionally
omitted. Keep structured data in sync with visible copy and the App Store.

`robots.txt` and `sitemap.xml` must be served at the domain root. After deploying,
submit the sitemap in Google Search Console and inspect the home page for
indexing. Confirm that alternative hostnames redirect to the canonical
`https://www.cadmusapp.com` host in the hosting provider's configuration.

Keep artwork and product copy current with the app. When changing
the production hostname, update canonical, social, structured-data, sitemap,
and robots URLs together. Do not add analytics without a separate privacy
review.
