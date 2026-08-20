# No-AI Badge Embed

This folder contains the generator script and the generated javascript to embed a highly-protected "No AI" badge on your website.

## How to Embed
To add the badge to your website, simply copy and paste the following HTML snippet into your website's HTML (either in the `<head>` or anywhere in the `<body>`):

```html
<!-- Anti-theft "No AI" Badge -->
<script src="https://random-stuff-swart-three.vercel.app/no-ai-badge-embed/embed-badge.js"
        data-position="bottom-right"
        data-width="120"
        data-margin="20">
</script>
```

### Configuration Options
You can fully customize the badge's appearance and behavior by adding these optional `data-*` attributes to your script tag:
- `data-position`: Where to place the badge. Options: `bottom-right` (default), `bottom-left`, `top-right`, `top-left`.
- `data-width`: The width of the badge in pixels (default: `120`).
- `data-margin`: The distance from the corner of the screen in pixels (default: `20`).
- `data-link`: Make the badge clickable! Pass a full URL (e.g. `https://my-website.com/no-ai`).
- `data-hide-on-mobile`: Set to `true` to automatically hide the badge on screens smaller than 768px (great for saving space on phones).
- `data-opacity`: A number from `0.0` to `1.0` to make the badge transparent (default: `1`).
- `data-animation`: Set to `none` to disable the hover scale effect.
- `data-analytics-endpoint`: Pass a URL/Webhook to send a silent POST ping whenever the badge is loaded on a page.

**Advanced Anti-Theft Toggles (All default to `true`):**
- `data-print-protect="false"`: Disables CSS print hiding.
- `data-devtools-protect="false"`: Disables the `debugger` self-destruct loop.
- `data-watermark="false"`: Removes the dynamic "NO AI" text from the canvas.
- `data-shield="false"`: Removes the invisible DOM shield overlay.
- `data-observer="false"`: Disables the MutationObserver tamper detection.
- `data-right-click="false"`: Allows right-clicking and dragging the badge container.

Example of a fully-configured badge:
```html
<script src="https://random-stuff-swart-three.vercel.app/no-ai-badge-embed/embed-badge.js"
        data-position="bottom-left"
        data-width="80"
        data-link="https://google.com"
        data-hide-on-mobile="true"
        data-opacity="0.8">
</script>
```

## Features
The badge is protected by 4 advanced anti-theft methods:
1. **True Encryption**: The image is encrypted (XOR cipher) in the source code and decrypted on the fly in the browser.
2. **Print Protection**: A CSS `@media print` rule instantly hides the badge if someone tries to print or save the page as a PDF.
3. **DevTools Self-Destruct**: An anti-debugger loop detects if the Developer Tools are opened and deletes the badge from the screen.
4. **Dynamic Canvas Watermark**: The image is drawn to an HTML `<canvas>` with a translucent "NO AI" watermark stamped diagonally across it to deter screenshots.
Additionally, standard right-click, text selection, and image drag-and-drop are completely disabled on the badge.

## NPM Packages

You can also install the No-AI Badge using our official NPM packages:

### React Component
```bash
npm i @painsel/react-no-ai-badge 
```

### Native Web Component
```bash
npm i @painsel/no-ai-badge-element 
```

### CLI Setup Utility
To automatically inject the badge script into your `index.html`:
```bash
npm i @painsel/add-no-ai-badge 
```
Then run: `npx add-no-ai-badge`
