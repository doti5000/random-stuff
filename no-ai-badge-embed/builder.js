document.addEventListener('DOMContentLoaded', () => {
    const positionEl = document.getElementById('config-position');
    const widthEl = document.getElementById('config-width');
    const marginEl = document.getElementById('config-margin');
    const linkEl = document.getElementById('config-link');
    const opacityEl = document.getElementById('config-opacity');
    const mobileEl = document.getElementById('config-mobile');
    const animationEl = document.getElementById('config-animation');
    const obfuscateEl = document.getElementById('config-obfuscate');
    const scrambleEl = document.getElementById('config-scramble');
    
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
        const obfuscate = obfuscateEl.checked;
        const scramble = scrambleEl.checked;

        // Construct HTML Snippet
        let snippet = `<script src="${SCRIPT_URL}"\n`;
        if (pos !== 'bottom-right') snippet += `        data-position="${pos}"\n`;
        if (width != 120) snippet += `        data-width="${width}"\n`;
        if (margin != 20) snippet += `        data-margin="${margin}"\n`;
        if (link) snippet += `        data-link="${link}"\n`;
        if (mobile) snippet += `        data-hide-on-mobile="true"\n`;
        if (opacity !== 1.0) snippet += `        data-opacity="${opacity}"\n`;
        if (!animation) snippet += `        data-animation="none"\n`;
        if (obfuscate) snippet += `        data-obfuscate="true"\n`;
        if (scramble) snippet += `        data-scramble="true"\n`;
        
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
    [positionEl, widthEl, marginEl, linkEl, opacityEl, mobileEl, animationEl, obfuscateEl, scrambleEl].forEach(el => {
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

    // Fetch Analytics Data
    async function fetchAnalytics() {
        try {
            const SCRIPT_URL_ROOT = SCRIPT_URL.split('/no-ai-badge-embed')[0];
            const response = await fetch(`${SCRIPT_URL_ROOT}/api/stats`);
            if (response.ok) {
                const data = await response.json();
                document.getElementById('stat-views').textContent = data.views.toLocaleString();
                document.getElementById('stat-domains').textContent = data.domains.toLocaleString();
                
                // Render Top Countries
                const countriesList = document.getElementById('stat-countries');
                if (data.topCountries && data.topCountries.length > 0) {
                    countriesList.innerHTML = '';
                    data.topCountries.forEach((country, index) => {
                        const li = document.createElement('li');
                        li.style.padding = '10px 15px';
                        li.style.borderBottom = index < data.topCountries.length - 1 ? '1px solid #eee' : 'none';
                        li.style.display = 'flex';
                        li.style.justifyContent = 'space-between';
                        li.style.alignItems = 'center';
                        
                        const nameSpan = document.createElement('span');
                        nameSpan.style.fontWeight = '600';
                        nameSpan.textContent = getCountryName(country.code) + ' ' + getFlagEmoji(country.code);
                        
                        const countSpan = document.createElement('span');
                        countSpan.style.color = '#ef4444';
                        countSpan.style.fontWeight = '800';
                        countSpan.textContent = country.count.toLocaleString();
                        
                        li.appendChild(nameSpan);
                        li.appendChild(countSpan);
                        countriesList.appendChild(li);
                    });
                } else {
                    countriesList.innerHTML = '<li style="padding: 10px; text-align: center; color: #666;">No data yet</li>';
                }
            }
        } catch(e) {
            console.error('Failed to load analytics', e);
        }
    }
    
    // Helper to convert ISO country code to emoji flag
    function getFlagEmoji(countryCode) {
        if (!countryCode || countryCode.length !== 2) return '🌍';
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char =>  127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    }
    
    // Helper to get basic country name (Intl API)
    function getCountryName(countryCode) {
        if (!countryCode || countryCode === 'Unknown' || countryCode === 'XX') return 'Unknown Region';
        try {
            const displayNames = new Intl.DisplayNames(['en'], {type: 'region'});
            return displayNames.of(countryCode);
        } catch(e) {
            return countryCode;
        }
    }
    
    // Fetch Threat Intelligence Feed
    async function fetchThreats() {
        try {
            const SCRIPT_URL_ROOT = SCRIPT_URL.split('/no-ai-badge-embed')[0];
            const response = await fetch(`${SCRIPT_URL_ROOT}/api/threats`);
            if (response.ok) {
                const data = await response.json();
                const threatsList = document.getElementById('stat-threats');
                if (data.threats && data.threats.length > 0) {
                    threatsList.innerHTML = '';
                    data.threats.forEach((threat, index) => {
                        const li = document.createElement('li');
                        li.style.padding = '10px 15px';
                        li.style.borderBottom = index < data.threats.length - 1 ? '1px solid #eee' : 'none';
                        li.style.display = 'flex';
                        li.style.flexDirection = 'column';
                        
                        const titleSpan = document.createElement('span');
                        titleSpan.style.fontWeight = '600';
                        titleSpan.style.color = '#ef4444';
                        titleSpan.textContent = `Blocked Bot: ${threat.ip}`;
                        
                        const uaSpan = document.createElement('span');
                        uaSpan.style.fontSize = '0.85em';
                        uaSpan.style.color = '#666';
                        uaSpan.style.marginTop = '4px';
                        uaSpan.style.wordBreak = 'break-all';
                        uaSpan.textContent = threat.userAgent;
                        
                        li.appendChild(titleSpan);
                        li.appendChild(uaSpan);
                        threatsList.appendChild(li);
                    });
                } else {
                    threatsList.innerHTML = '<li style="padding: 10px; text-align: center; color: #666;">No threats blocked recently</li>';
                }
            }
        } catch(e) {
            console.error('Failed to load threats', e);
        }
    }
    
    fetchAnalytics();
    fetchThreats();
    setInterval(fetchThreats, 10000); // Live feed
});
