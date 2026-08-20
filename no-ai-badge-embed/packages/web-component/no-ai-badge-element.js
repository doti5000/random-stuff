class NoAiBadgeElement extends HTMLElement {
    connectedCallback() {
        if (document.getElementById('no-ai-badge-script')) return;

        const SCRIPT_URL = 'https://random-stuff-swart-three.vercel.app/no-ai-badge-embed/embed-badge.js';
        
        const script = document.createElement('script');
        script.src = SCRIPT_URL;
        script.id = 'no-ai-badge-script';
        script.async = true;

        // Map HTML attributes to data-* attributes on the script
        const attrs = ['position', 'width', 'margin', 'link', 'hideOnMobile', 'opacity', 'animation', 'analyticsEndpoint', 'printProtect', 'devtoolsProtect', 'watermark', 'shield', 'observer', 'rightClick'];
        
        attrs.forEach(attr => {
            if (this.hasAttribute(attr)) {
                script.dataset[attr] = this.getAttribute(attr);
            }
        });

        document.body.appendChild(script);
    }
}

customElements.define('no-ai-badge', NoAiBadgeElement);
