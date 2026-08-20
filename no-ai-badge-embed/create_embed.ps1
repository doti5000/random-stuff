$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$imagePath = Join-Path -Path $scriptDir -ChildPath "no-ai-badge.png"
$jsPath = Join-Path -Path $scriptDir -ChildPath "embed-badge.js"

$bytes = [IO.File]::ReadAllBytes($imagePath)
$base64 = [Convert]::ToBase64String($bytes)

# 2. XOR Encryption
$key = 42
$encryptedBase64Chunks = ""
for ($i = 0; $i -lt $base64.Length; $i += 100) {
    $len = [Math]::Min(100, $base64.Length - $i)
    $chunk = $base64.Substring($i, $len)
    
    $hexChunk = ""
    foreach ($char in $chunk.ToCharArray()) {
        $encryptedCode = [int][char]$char -bxor $key
        $hexChunk += $encryptedCode.ToString("X2")
    }
    $encryptedBase64Chunks += "'" + $hexChunk + "',`n        "
}

$jsContent = @"
(async function() {
    if (document.getElementById('no-ai-badge-embed-container')) return;

    function triggerGlitch() {
        const el = document.getElementById('no-ai-badge-embed-container');
        if (el) {
            if (!el.classList.contains('noai-glitching')) {
                el.classList.add('noai-glitching');
                el.style.backgroundColor = 'red';
                el.innerHTML = '<div style="color:white; font-weight:bold; padding:20px; text-align:center; font-family:sans-serif; height:100%; display:flex; align-items:center; justify-content:center;">TAMPER DETECTED</div>';
                setTimeout(() => el.remove(), 2000);
            }
        }
    }

    // Save currentScript synchronously before any async operations
    const currentScript = document.currentScript;
    if (currentScript && !currentScript.src.startsWith('https://random-stuff.britishdex.workers.dev/no-ai-badge-embed/') && !currentScript.src.startsWith('https://random-stuff-swart-three.vercel.app/no-ai-badge-embed/')) {
        console.error('🚫 [No-AI Badge] Unauthorized script source detected. Please use the official production CDN URL to embed this badge.');
        return;
    }

    // Remote Feature Flags Fetch
    let remoteConfig = {};
    try {
        // Use a cache-busting or short cache if needed, but for now just fetch
        const response = await fetch('https://random-stuff-swart-three.vercel.app/no-ai-badge-embed/remote-config.json');
        if (response.ok) {
            remoteConfig = await response.json();
        }
    } catch(e) {}

    if (remoteConfig.globalKillSwitch) {
        console.warn('🚫 [No-AI Badge] Badge disabled globally via remote kill switch.');
        return;
    }

    // 6. Domain Whitelisting: Override with remote config if available
    const allowedDomains = remoteConfig.allowedDomains || ['localhost', '127.0.0.1', 'your-trusted-website.com'];
    const currentDomain = window.location.hostname;
    if (currentDomain !== '' && !allowedDomains.some(d => currentDomain.endsWith(d))) {
        console.warn('🚫 [No-AI Badge] Domain not whitelisted. Badge disabled.');
        return;
    }



    // Configuration Options
    let configPosition = 'bottom-right';
    let configWidth = 120;
    let configMargin = 20;
    let configLink = null;
    let configHideOnMobile = false;
    let configOpacity = 1;
    let configAnimation = 'scale';
    let configAnalytics = null;
    
    // Anti-theft Configs (Defaults to true)
    let configPrintProtect = true;
    let configDevToolsProtect = true;
    let configWatermark = true;
    let configShield = true;
    let configObserver = true;
    let configRightClick = true;

    if (currentScript) {
        // Visuals & Features
        if (currentScript.dataset.position) configPosition = currentScript.dataset.position;
        if (currentScript.dataset.width) configWidth = parseInt(currentScript.dataset.width) || 120;
        if (currentScript.dataset.margin) configMargin = parseInt(currentScript.dataset.margin) || 20;
        if (currentScript.dataset.link) configLink = currentScript.dataset.link;
        if (currentScript.dataset.hideOnMobile === 'true') configHideOnMobile = true;
        if (currentScript.dataset.opacity) configOpacity = parseFloat(currentScript.dataset.opacity);
        if (currentScript.dataset.animation) configAnimation = currentScript.dataset.animation;
        if (currentScript.dataset.analyticsEndpoint) configAnalytics = currentScript.dataset.analyticsEndpoint;
        
        // Anti-theft Toggles
        if (currentScript.dataset.printProtect === 'false') configPrintProtect = false;
        if (currentScript.dataset.devtoolsProtect === 'false') configDevToolsProtect = false;
        if (currentScript.dataset.watermark === 'false') configWatermark = false;
        if (currentScript.dataset.shield === 'false') configShield = false;
        if (currentScript.dataset.observer === 'false') configObserver = false;
        if (currentScript.dataset.rightClick === 'false') configRightClick = false;
    }

    // 1. Print Protection
    if (configPrintProtect) {
        const style = document.createElement('style');
        style.innerHTML = '@media print { #no-ai-badge-embed-container { display: none !important; opacity: 0 !important; visibility: hidden !important; } }';
        document.head.appendChild(style);
    }

    // 3. DevTools Self-Destruct
    if (configDevToolsProtect) {
        const devtools = function() {};
        devtools.toString = function() {
            triggerGlitch();
            return '';
        }
        console.log('%c', devtools);
        setInterval(function() {
            const before = new Date().getTime();
            debugger;
            const after = new Date().getTime();
            if (after - before > 100) {
                triggerGlitch();
            }
        }, 1000);
    }

    // 2. Encryption (XOR Decryption)
    const chunks = [
        $encryptedBase64Chunks
    ];
    const hexString = chunks.join('');
    let b64 = '';
    for (let i = 0; i < hexString.length; i += 2) {
        b64 += String.fromCharCode(parseInt(hexString.substr(i, 2), 16) ^ $key);
    }

    // Mobile Hiding Configuration
    if (configHideOnMobile || remoteConfig.forceMobileHide) {
        const mobileStyle = document.createElement('style');
        mobileStyle.innerHTML = '@media (max-width: 768px) { #no-ai-badge-embed-container { display: none !important; } }';
        document.head.appendChild(mobileStyle);
    }

    // Analytics Ping Configuration
    if (configAnalytics) {
        try {
            fetch(configAnalytics, { method: 'POST', mode: 'no-cors' });
        } catch(e) {}
    }
    
    const container = document.createElement('div');
    container.id = 'no-ai-badge-embed-container';
    
    // Accessibility
    container.setAttribute('aria-label', 'No AI Protected Asset');
    container.setAttribute('role', 'img');

    // Clickable Link Configuration
    if (configLink) {
        container.style.cursor = 'pointer';
        container.onclick = function() {
            window.open(configLink, '_blank', 'noopener,noreferrer');
        };
    }

    container.style.position = 'fixed';
    container.style.zIndex = '2147483647';
    container.style.width = configWidth + 'px';
    container.style.transition = 'transform 0.2s ease-in-out';
    container.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    container.style.borderRadius = '8px';
    container.style.overflow = 'hidden';
    container.style.opacity = configOpacity;

    // Apply Position Settings
    if (configPosition.includes('top')) {
        container.style.top = configMargin + 'px';
    } else {
        container.style.bottom = configMargin + 'px';
    }
    
    if (configPosition.includes('left')) {
        container.style.left = configMargin + 'px';
    } else {
        container.style.right = configMargin + 'px';
    }

    // CSS Background Method
    container.style.backgroundImage = 'url(data:image/png;base64,' + b64 + ')';
    container.style.backgroundSize = 'contain';
    container.style.backgroundRepeat = 'no-repeat';
    container.style.backgroundPosition = 'center';
    
    // Glitch Animation CSS
    const glitchStyle = document.createElement('style');
    glitchStyle.innerHTML = "@keyframes noai-glitch { 0% { transform: translate(0) } 20% { transform: translate(-5px, 5px) } 40% { transform: translate(-5px, -5px) } 60% { transform: translate(5px, 5px) } 80% { transform: translate(5px, -5px) } 100% { transform: translate(0) } } .noai-glitching { animation: noai-glitch 0.2s infinite; filter: hue-rotate(90deg) saturate(300%) contrast(200%); }";
    document.head.appendChild(glitchStyle);

    // Anti-theft on container
    if (configRightClick) {
        container.style.userSelect = 'none';
        container.style.webkitUserSelect = 'none';
        container.style.webkitUserDrag = 'none';
        container.oncontextmenu = function(e) { e.preventDefault(); triggerGlitch(); return false; };
    }
    
    // Animation Configuration
    if (configAnimation !== 'none') {
        container.onmouseover = function() { this.style.transform = 'scale(1.05)'; };
        container.onmouseout = function() { this.style.transform = 'scale(1)'; };
    }

    const imgObj = new Image();
    imgObj.onload = function() {
        container.style.height = (configWidth * (imgObj.height / imgObj.width)) + 'px';
        
        // Canvas Method
        const canvas = document.createElement('canvas');
        canvas.width = imgObj.width;
        canvas.height = imgObj.height;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block';
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imgObj, 0, 0);
        
        // 4. Dynamic Watermarking
        if (configWatermark) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.font = 'bold ' + Math.floor(imgObj.width / 5) + 'px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(-Math.PI / 4);
            ctx.fillText('NO AI', 0, 0);
            ctx.rotate(Math.PI / 4);
            ctx.translate(-canvas.width / 2, -canvas.height / 2);
        }
        
        // Invisible Shield
        if (configShield) {
            const shield = document.createElement('div');
            shield.style.position = 'absolute';
            shield.style.top = '0';
            shield.style.left = '0';
            shield.style.width = '100%';
            shield.style.height = '100%';
            shield.style.backgroundColor = 'transparent';
            shield.style.zIndex = '10';
            
            // Anti-theft on shield
            if (configRightClick) {
                shield.oncontextmenu = function(e) { e.preventDefault(); triggerGlitch(); return false; };
                shield.ondragstart = function(e) { e.preventDefault(); triggerGlitch(); return false; };
            }
            
            container.appendChild(shield);
        }
        
        // We append the canvas first so it sits under the shield
        container.insertBefore(canvas, container.firstChild);

        // Tamper Detection (Mutation Observer)
        if (configObserver) {
            const observer = new MutationObserver((mutationsList, observer) => {
                for(let mutation of mutationsList) {
                    if (mutation.type === 'childList' || mutation.type === 'attributes') {
                        observer.disconnect();
                        triggerGlitch();
                    }
                }
            });
            
            setTimeout(() => {
                observer.observe(container, { attributes: true, childList: true, subtree: true });
            }, 100);
        }
    };
    imgObj.src = 'data:image/png;base64,' + b64;
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => document.body.appendChild(container));
    } else {
        document.body.appendChild(container);
    }
})();
"@

Set-Content -Path $jsPath -Value $jsContent -Encoding UTF8
Write-Output "Created plain javascript at $jsPath"

Write-Output "Running javascript-obfuscator (this might take a moment)..."
npx -y javascript-obfuscator $jsPath --output $jsPath --compact true --control-flow-flattening true --dead-code-injection true --string-array true --string-array-encoding 'rc4' --disable-console-output false --self-defending true
Write-Output "Obfuscation complete!"
