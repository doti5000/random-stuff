# No-AI Badge Project

The **No-AI Badge** is a highly-secured, self-destructing web widget designed to protect your art and digital assets from unauthorized AI scraping. 

This repository contains the core embed script, serverless APIs for telemetry and analytics, and several official packages to integrate the badge into any stack.

## Advanced LLM Evasion Ecosystem
No-AI Shield is more than just a visual badge; it actively defends your site against modern scraping techniques:
1. **Casual Prompt Poisoning:** Injects conversational prompt overrides to exploit RLHF behaviors in LLM crawlers.
2. **Semantic Scrambling:** Physically reverses DOM strings and re-aligns them with CSS, feeding AI crawlers incomprehensible word-salad while keeping the site readable for humans.
3. **WebCrypto Hydration:** Decrypts sensitive `data-noai-encrypt` text on-the-fly into a Closed Shadow DOM.
4. **Invisible Honeypot Traps:** Deploys `rel="nofollow"` traps to pollute bad-bot datasets with hallucinated responses.

## Official Packages & Integrations

Depending on your stack, you can use one of our official integrations to easily add the No-AI Badge to your project!

- **[Vanilla HTML / JS Embed](./no-ai-badge-embed/)**: The core script. Add a single `<script>` tag to any website.
- **[React Component](./no-ai-badge-embed/packages/react-no-ai-badge/)**: `<NoAIBadge />` component for React applications. (`npm i @painsel/react-no-ai-badge`)
- **[CLI Setup Utility](./packages/cli/)**: Automatically injects the badge script into your `index.html`. (`npx @painsel/add-no-ai-badge`)
- **[Native Web Component](./no-ai-badge-embed/packages/web-component/)**: A Custom Element wrapper. (`npm i @painsel/no-ai-badge-element`)
- **[WordPress Plugin](./packages/wordpress-no-ai-badge/)**: A fully featured WordPress plugin with an admin settings page to configure your badge visually without touching code.

## Analytics & Telemetry
This project includes a serverless API (Vercel) and edge proxy (Cloudflare) to log and track bot threats. Each badge automatically streams security data back to a domain-specific and URL-specific dashboard where you can monitor AI scrapers blocked on your site!
