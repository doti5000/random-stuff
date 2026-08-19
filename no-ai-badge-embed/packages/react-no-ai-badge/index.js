const { useEffect } = require('react');

const SCRIPT_URL = 'https://random-stuff-swart-three.vercel.app/no-ai-badge-embed/embed-badge.js';

function NoAiBadge(props) {
  useEffect(() => {
    // Prevent multiple injections
    if (document.getElementById('no-ai-badge-script')) return;

    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.id = 'no-ai-badge-script';
    script.async = true;

    // Map props to data attributes
    if (props.position) script.dataset.position = props.position;
    if (props.width) script.dataset.width = props.width;
    if (props.margin) script.dataset.margin = props.margin;
    if (props.link) script.dataset.link = props.link;
    if (props.hideOnMobile) script.dataset.hideOnMobile = 'true';
    if (props.opacity) script.dataset.opacity = props.opacity;
    if (props.animation === 'none') script.dataset.animation = 'none';
    if (props.analyticsEndpoint) script.dataset.analyticsEndpoint = props.analyticsEndpoint;

    // Map anti-theft props
    if (props.printProtect === false) script.dataset.printProtect = 'false';
    if (props.devtoolsProtect === false) script.dataset.devtoolsProtect = 'false';
    if (props.watermark === false) script.dataset.watermark = 'false';
    if (props.shield === false) script.dataset.shield = 'false';
    if (props.observer === false) script.dataset.observer = 'false';
    if (props.rightClick === false) script.dataset.rightClick = 'false';

    document.body.appendChild(script);

    return () => {
      // Cleanup script tag on unmount
      const existingScript = document.getElementById('no-ai-badge-script');
      if (existingScript) existingScript.remove();
      // Remove badge container if it exists
      const badgeContainer = document.getElementById('no-ai-badge-embed-container');
      if (badgeContainer) badgeContainer.remove();
    };
  }, [props]);

  return null;
}

module.exports = NoAiBadge;
