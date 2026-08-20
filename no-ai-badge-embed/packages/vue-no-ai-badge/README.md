# @painsel/vue-no-ai-badge

A highly-secured, self-destructing Vue component wrapper for the **No-AI Badge**. 

Protect your art and digital assets from unauthorized AI scraping in your Vue applications!

## Installation

```bash
npm install @painsel/vue-no-ai-badge
```

## Usage

```vue
<template>
  <div>
    <h1>My Portfolio</h1>
    <NoAiBadge position="bottom-left" :width="100" :hideOnMobile="true" />
  </div>
</template>

<script setup>
import { NoAiBadge } from '@painsel/vue-no-ai-badge';
</script>
```

## Props
Accepts all standard No-AI Badge options (position, width, hideOnMobile, animation, physics, etc).

## Related Packages
- **[Next.js Component](https://github.com/doti5000/random-stuff/tree/main/no-ai-badge-embed/packages/next-no-ai-badge)**: `@painsel/next-no-ai-badge`
- **[React Component](https://github.com/doti5000/random-stuff/tree/main/no-ai-badge-embed/packages/react-no-ai-badge)**: `@painsel/react-no-ai-badge`
- **[Svelte Component](https://github.com/doti5000/random-stuff/tree/main/no-ai-badge-embed/packages/svelte-no-ai-badge)**: `@painsel/svelte-no-ai-badge`
- **[Vanilla Embed](https://github.com/doti5000/random-stuff/tree/main/no-ai-badge-embed)**: The core script.
