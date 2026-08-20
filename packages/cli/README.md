# @painsel/add-no-ai-badge

A simple CLI utility to automatically inject the **No-AI Badge** into your website. 

The No-AI Badge is a highly-secured, self-destructing web widget designed to protect your art and digital assets from unauthorized AI scraping. It features DevTools protection, print protection, invisible steganographic watermarking, and dynamic anti-scraper physics.

## Usage

You don't even need to install this package permanently! Simply run it in your project's root directory (where your `index.html` is located) using `npx`:

```bash
npx @painsel/add-no-ai-badge
```

### Interactive Prompts
The CLI will ask you two simple questions:
1. **Position**: Where do you want the badge to appear on the screen? (`bottom-right`, `bottom-left`, `top-right`, `top-left`)
2. **Physics**: Do you want to enable the anti-scraper runaway physics? (If enabled, the badge will teleport away when hovered over to frustrate manual scrapers).

Once you answer, the CLI will automatically parse your `index.html` and safely inject the necessary `<script>` tag right before the closing `</body>` tag.

## Example Output
```text
🛡️  Welcome to the No-AI Badge CLI Setup!
-------------------------------------------
What position do you want the badge? (bottom-right/bottom-left/top-right/top-left) [bottom-right]: bottom-left
Enable anti-scraper runaway physics? (y/N) [N]: y
✅ Successfully injected the No-AI Badge into index.html!
```

## Manual Installation
If you prefer to add the script tag manually, you can simply add the following to your HTML:
```html
<script src="https://random-stuff.britishdex.workers.dev/no-ai-badge-embed/embed-badge.js"
        data-position="bottom-right"
        data-width="120">
</script>
```

## Learn More
For a full list of configuration options, check out the [main repository documentation](https://github.com/doti5000/random-stuff/tree/main/no-ai-badge-embed).
