# @painsel/no-ai-badge-element

A native Web Component (Custom Element) wrapper for the **No-AI Badge**. 

Protect your art and digital assets from unauthorized AI scraping! This framework-agnostic web component renders a protective badge that actively defends itself against scrapers using DevTools protection, print protection, invisible steganographic watermarking, and dynamic anti-scraper physics.

## Installation

```bash
npm install @painsel/no-ai-badge-element
```

## Usage

### In a module bundler (Webpack, Vite, Rollup)
Simply import the package to register the custom element:

```javascript
import '@painsel/no-ai-badge-element';
```

Then, use the `<no-ai-badge>` tag anywhere in your HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Portfolio</title>
</head>
<body>
    <h1>My Artwork</h1>
    
    <!-- The badge will render fixed to the corner of the screen -->
    <no-ai-badge 
        position="bottom-left" 
        width="100" 
        hide-on-mobile="true">
    </no-ai-badge>
</body>
</html>
```

## Attributes

You can configure the badge by passing standard HTML attributes:

- `position`: `'bottom-right'`, `'bottom-left'`, `'top-right'`, `'top-left'` (default: `'bottom-right'`)
- `width`: Width in pixels (default: `120`)
- `margin`: Distance from the screen edge in pixels (default: `20`)
- `link`: Optional URL to open when clicked
- `hide-on-mobile`: Set to `"true"` to hide the badge on screens `< 768px`
- `opacity`: Opacity from `0.1` to `1.0` (default: `1.0`)
- `animation`: Hover animation style, e.g., `"none"`
- `physics`: Set to `"true"` to enable anti-scraper runaway physics

## Learn More
For advanced anti-theft configuration options, check out the [main repository documentation](https://github.com/doti5000/random-stuff/tree/main/no-ai-badge-embed).
