# @painsel/react-no-ai-badge

A highly-secured, self-destructing React component wrapper for the **No-AI Badge**. 

Protect your art and digital assets from unauthorized AI scraping in your React applications! This component renders a protective badge that actively defends itself against scrapers using DevTools protection, print protection, invisible steganographic watermarking, and dynamic anti-scraper physics.

## Installation

```bash
npm install @painsel/react-no-ai-badge
```
or
```bash
yarn add @painsel/react-no-ai-badge
```

## Usage

Simply import the component and render it anywhere in your React application (usually near the root of your App layout).

```jsx
import React from 'react';
import { NoAIBadge } from '@painsel/react-no-ai-badge';

function App() {
  return (
    <div>
      <h1>My Portfolio</h1>
      <p>Welcome to my artwork collection.</p>
      
      {/* The badge will render fixed to the corner of the screen */}
      <NoAIBadge 
        position="bottom-left" 
        width={100} 
        hideOnMobile={true} 
      />
    </div>
  );
}

export default App;
```

## Props

The component accepts all standard configuration options as React props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Screen position for the badge |
| `width` | `number` | `120` | Width of the badge in pixels |
| `margin` | `number` | `20` | Distance from the edge of the screen in pixels |
| `link` | `string` | `undefined` | Optional URL to open when the badge is clicked |
| `hideOnMobile` | `boolean` | `false` | Automatically hide the badge on screens `< 768px` |
| `opacity` | `number` | `1.0` | Opacity of the badge (0.1 to 1.0) |
| `animation` | `'scale' \| 'none'` | `'scale'` | Hover animation style |
| `physics` | `boolean` | `false` | Enable anti-scraper runaway physics (teleports on hover) |

## Learn More
For advanced anti-theft configuration options, check out the [main repository documentation](https://github.com/doti5000/random-stuff/tree/main/no-ai-badge-embed).
