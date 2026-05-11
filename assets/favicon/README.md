# Favicon set

The mark-only SVG (`../EZLogo-mark.svg`) is the source. Generate the binary favicon set with [realfavicongenerator.net](https://realfavicongenerator.net) and drop the output into this directory.

## What you should end up with

```
favicon/
├── favicon.ico           (16, 32, 48 multi-resolution)
├── apple-touch-icon.png  (180×180)
├── icon-192.png          (192×192, PWA)
├── icon-512.png          (512×512, PWA)
├── site.webmanifest
└── README.md             (this file)
```

## Carrd usage

Carrd Pro accepts a custom favicon under **Site Settings → Favicon** — upload `favicon.ico`. Apple touch icon and webmanifest are stitched in via Carrd's `<head>` HTML widget (see `../carrd-build-guide.md`).

## Local generation (no internet)

If you'd rather not use the online generator, with `imagemagick` installed:

```bash
# Run from marketing/landing-page/assets/
magick EZLogo-mark.svg -background none -resize 16x16    favicon/icon-16.png
magick EZLogo-mark.svg -background none -resize 32x32    favicon/icon-32.png
magick EZLogo-mark.svg -background none -resize 48x48    favicon/icon-48.png
magick EZLogo-mark.svg -background none -resize 180x180  favicon/apple-touch-icon.png
magick EZLogo-mark.svg -background none -resize 192x192  favicon/icon-192.png
magick EZLogo-mark.svg -background none -resize 512x512  favicon/icon-512.png
magick favicon/icon-16.png favicon/icon-32.png favicon/icon-48.png favicon/favicon.ico
```

Then hand-write `site.webmanifest`:

```json
{
  "name": "EZLogs",
  "short_name": "EZLogs",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#01E63E",
  "background_color": "#0A0A0A",
  "display": "standalone"
}
```
