# No-AI Badge - WordPress Plugin

A fully featured WordPress plugin to easily add the **No-AI Badge** to your WordPress site without touching any code!

Protect your art and digital assets from unauthorized AI scraping. This plugin injects a protective badge that actively defends itself against scrapers using DevTools protection, print protection, invisible steganographic watermarking, and dynamic anti-scraper physics.

## Installation

1. Zip the `wordpress-no-ai-badge` folder.
2. In your WordPress Admin Dashboard, go to **Plugins > Add New**.
3. Click **Upload Plugin** and select the `.zip` file.
4. Click **Install Now**, then **Activate**.

## Configuration

After activation, a new menu item **"No-AI Badge"** will appear under **Settings** in the WordPress sidebar.

From this settings page, you can customize:
- **Position**: Bottom Right, Bottom Left, Top Right, Top Left
- **Width**: Width of the badge in pixels
- **Margin**: Distance from the edge of the screen
- **Text Obfuscation**: Honeypot to inject zero-width spaces into text to break LLM tokenization.
- **DOM Scrambling**: Randomize element IDs and Classes (Experimental).

## Related Packages

Check out our other official integrations depending on your stack:

- **[React Component](https://github.com/doti5000/random-stuff/tree/main/no-ai-badge-embed/packages/react-no-ai-badge)**: `<NoAIBadge />` component for React applications. (`@painsel/react-no-ai-badge`)
- **[Vanilla Embed](https://github.com/doti5000/random-stuff/tree/main/no-ai-badge-embed)**: The core script for manual integration in raw HTML.
- **[Native Web Component](https://github.com/doti5000/random-stuff/tree/main/no-ai-badge-embed/packages/web-component)**: `<no-ai-badge>` Custom Element wrapper (`@painsel/no-ai-badge-element`)
- **[CLI Setup Utility](https://github.com/doti5000/random-stuff/tree/main/packages/cli)**: Automatically injects the badge script into any HTML project. (`@painsel/add-no-ai-badge`)

## Learn More
For a full list of features and the underlying telemetry system, check out the [main repository documentation](https://github.com/doti5000/random-stuff/tree/main).
