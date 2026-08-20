<script>
  import { onMount, onDestroy } from 'svelte';

  export let position = 'bottom-right';
  export let width = 120;
  export let margin = 20;
  export let hideOnMobile = false;
  export let opacity = 1.0;
  export let animation = 'scale';
  export let analyticsEndpoint = undefined;
  export let physics = false;
  
  // Anti-theft toggles
  export let printProtect = true;
  export let devtoolsProtect = true;
  export let watermark = true;
  export let shield = true;
  export let observer = true;
  export let rightClick = true;

  const SCRIPT_URL = 'https://random-stuff-swart-three.vercel.app/no-ai-badge-embed/embed-badge.js';

  onMount(() => {
    if (document.getElementById('no-ai-badge-script')) return;

    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.id = 'no-ai-badge-script';
    script.async = true;

    if (position) script.dataset.position = position;
    if (width) script.dataset.width = width;
    if (margin) script.dataset.margin = margin;
    if (hideOnMobile) script.dataset.hideOnMobile = 'true';
    if (opacity !== 1.0) script.dataset.opacity = opacity;
    if (animation === 'none') script.dataset.animation = 'none';
    if (analyticsEndpoint) script.dataset.analyticsEndpoint = analyticsEndpoint;
    if (physics) script.dataset.physics = 'true';

    if (printProtect === false) script.dataset.printProtect = 'false';
    if (devtoolsProtect === false) script.dataset.devtoolsProtect = 'false';
    if (watermark === false) script.dataset.watermark = 'false';
    if (shield === false) script.dataset.shield = 'false';
    if (observer === false) script.dataset.observer = 'false';
    if (rightClick === false) script.dataset.rightClick = 'false';

    document.body.appendChild(script);
  });

  onDestroy(() => {
    const existingScript = document.getElementById('no-ai-badge-script');
    if (existingScript) existingScript.remove();
    const badgeContainer = document.getElementById('no-ai-badge-embed-container');
    if (badgeContainer) badgeContainer.remove();
  });
</script>

<div style="display: none;"></div>
