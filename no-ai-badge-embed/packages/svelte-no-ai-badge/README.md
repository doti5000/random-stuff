# @painsel/svelte-no-ai-badge

A highly-secured, self-destructing Svelte component wrapper for the **No-AI Badge**. 

Protect your art and digital assets from unauthorized AI scraping in your Svelte applications!

## Installation

```bash
npm install @painsel/svelte-no-ai-badge
```

## Usage

```svelte
<script>
  import { NoAiBadge } from '@painsel/svelte-no-ai-badge';
</script>

<main>
  <h1>My Portfolio</h1>
  <NoAiBadge position="bottom-left" width={100} hideOnMobile={true} />
</main>
```

## Props
Accepts all standard No-AI Badge options (position, width, hideOnMobile, animation, physics, etc).

## Related Packages
- **[Next.js Component](https://github.com/doti5000/random-stuff/tree/main/no-ai-badge-embed/packages/next-no-ai-badge)**: `@painsel/next-no-ai-badge`
- **[Vue Component](https://github.com/doti5000/random-stuff/tree/main/no-ai-badge-embed/packages/vue-no-ai-badge)**: `@painsel/vue-no-ai-badge`
- **[React Component](https://github.com/doti5000/random-stuff/tree/main/no-ai-badge-embed/packages/react-no-ai-badge)**: `@painsel/react-no-ai-badge`
- **[Vanilla Embed](https://github.com/doti5000/random-stuff/tree/main/no-ai-badge-embed)**: The core script.
