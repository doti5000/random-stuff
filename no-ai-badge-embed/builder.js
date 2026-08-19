document.addEventListener('DOMContentLoaded', () => {
    const positionEl = document.getElementById('config-position');
    const widthEl = document.getElementById('config-width');
    const marginEl = document.getElementById('config-margin');
    const linkEl = document.getElementById('config-link');
    const opacityEl = document.getElementById('config-opacity');
    const mobileEl = document.getElementById('config-mobile');
    const animationEl = document.getElementById('config-animation');
    
    const iframe = document.getElementById('preview-box');
    const codeSnippet = document.getElementById('code-snippet');
    const copyBtn = document.getElementById('copy-btn');

    // The base URL of the CDN
    // Usually this would be production, but for testing we can just use the local file relative path.
    // If you host this on Vercel at the root, the path '/embed-badge.js' will work perfectly!
    const SCRIPT_URL = 'https://random-stuff-swart-three.vercel.app/no-ai-badge-embed/embed-badge.js';

    function updateWidget() {
        // Collect variables
        const pos = positionEl.value;
        const width = widthEl.value || 120;
        const margin = marginEl.value || 20;
        const link = linkEl.value.trim();
        const opacity = parseFloat(opacityEl.value) || 1.0;
        const mobile = mobileEl.checked;
        const animation = animationEl.checked;

        // Construct HTML Snippet
        let snippet = `<script src="${SCRIPT_URL}"\n`;
        if (pos !== 'bottom-right') snippet += `        data-position="${pos}"\n`;
        if (width != 120) snippet += `        data-width="${width}"\n`;
        if (margin != 20) snippet += `        data-margin="${margin}"\n`;
        if (link) snippet += `        data-link="${link}"\n`;
        if (mobile) snippet += `        data-hide-on-mobile="true"\n`;
        if (opacity !== 1.0) snippet += `        data-opacity="${opacity}"\n`;
        if (!animation) snippet += `        data-animation="none"\n`;
        
        // Remove trailing newline if attributes were added, then close tag
        snippet = snippet.trimEnd() + `></script>`;

        // Update the code box
        codeSnippet.textContent = snippet;

        // Render into the iframe
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        // Provide a dummy grey background for the preview and inject the script
        iframeDoc.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { background-color: #f1f5f9; color: #334155; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                    h1 { opacity: 0.3; }
                </style>
            </head>
            <body>
                <h1>Your Website Here</h1>
                <!-- Inject the live snippet but replace the production URL with our local one for the preview to work without CORS or domain whitelist issues -->
                ${snippet.replace(SCRIPT_URL, 'embed-badge.js')}
            </body>
            </html>
        `);
        iframeDoc.close();
    }

    // Attach listeners
    [positionEl, widthEl, marginEl, linkEl, opacityEl, mobileEl, animationEl].forEach(el => {
        el.addEventListener('input', updateWidget);
        el.addEventListener('change', updateWidget);
    });

    // Copy button
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeSnippet.textContent).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => { copyBtn.textContent = 'Copy Code'; }, 2000);
        });
    });

    // Initial render
    updateWidget();
});
