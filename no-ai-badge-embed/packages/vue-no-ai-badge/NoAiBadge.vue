<template>
  <div style="display: none;"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
  position: { type: String, default: 'bottom-right' },
  width: { type: [Number, String], default: 120 },
  margin: { type: [Number, String], default: 20 },
  hideOnMobile: { type: Boolean, default: false },
  opacity: { type: Number, default: 1.0 },
  animation: { type: String, default: 'scale' },
  analyticsEndpoint: { type: String, default: undefined },
  physics: { type: Boolean, default: false },
  printProtect: { type: Boolean, default: true },
  devtoolsProtect: { type: Boolean, default: true },
  watermark: { type: Boolean, default: true },
  shield: { type: Boolean, default: true },
  observer: { type: Boolean, default: true },
  rightClick: { type: Boolean, default: true }
});

const SCRIPT_URL = 'https://random-stuff-swart-three.vercel.app/no-ai-badge-embed/embed-badge.js';

onMounted(() => {
  if (document.getElementById('no-ai-badge-script')) return;

  const script = document.createElement('script');
  script.src = SCRIPT_URL;
  script.id = 'no-ai-badge-script';
  script.async = true;

  if (props.position) script.dataset.position = props.position;
  if (props.width) script.dataset.width = props.width;
  if (props.margin) script.dataset.margin = props.margin;
  if (props.hideOnMobile) script.dataset.hideOnMobile = 'true';
  if (props.opacity !== 1.0) script.dataset.opacity = props.opacity;
  if (props.animation === 'none') script.dataset.animation = 'none';
  if (props.analyticsEndpoint) script.dataset.analyticsEndpoint = props.analyticsEndpoint;
  if (props.physics) script.dataset.physics = 'true';

  if (props.printProtect === false) script.dataset.printProtect = 'false';
  if (props.devtoolsProtect === false) script.dataset.devtoolsProtect = 'false';
  if (props.watermark === false) script.dataset.watermark = 'false';
  if (props.shield === false) script.dataset.shield = 'false';
  if (props.observer === false) script.dataset.observer = 'false';
  if (props.rightClick === false) script.dataset.rightClick = 'false';

  document.body.appendChild(script);
});

onUnmounted(() => {
  const existingScript = document.getElementById('no-ai-badge-script');
  if (existingScript) existingScript.remove();
  const badgeContainer = document.getElementById('no-ai-badge-embed-container');
  if (badgeContainer) badgeContainer.remove();
});
</script>
