# @painsel/next-no-ai-badge

A highly-secured, self-destructing Next.js component wrapper for the **No-AI Badge** (compatible with Next.js App Router & Pages Router). 

Protect your art and digital assets from unauthorized AI scraping in your Next.js applications!

## Installation

```bash
npm install @painsel/next-no-ai-badge
```

## Usage (App Router & Pages Router)

Simply import and drop it into your `layout.tsx`, `page.tsx`, or `_app.tsx`! It's pre-configured with `"use client"`.

```tsx
import { NoAiBadge } from '@painsel/next-no-ai-badge';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <NoAiBadge position="bottom-right" width={120} />
      </body>
    </html>
  );
}
```

## Props
Accepts all standard No-AI Badge options (position, width, hideOnMobile, animation, physics, etc).

## Related Packages
- **[React Component](https://github.com/doti5000/random-stuff/tree/main/no-ai-badge-embed/packages/react-no-ai-badge)**: `@painsel/react-no-ai-badge`
- **[Vue Component](https://github.com/doti5000/random-stuff/tree/main/no-ai-badge-embed/packages/vue-no-ai-badge)**: `@painsel/vue-no-ai-badge`
- **[Svelte Component](https://github.com/doti5000/random-stuff/tree/main/no-ai-badge-embed/packages/svelte-no-ai-badge)**: `@painsel/svelte-no-ai-badge`
- **[Vanilla Embed](https://github.com/doti5000/random-stuff/tree/main/no-ai-badge-embed)**: The core script.
