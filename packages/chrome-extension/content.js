function injectShieldButtons() {
    const textareas = document.querySelectorAll('textarea, [contenteditable="true"]');
    
    textareas.forEach(el => {
        if (el.dataset.noaiShieldAttached) return;
        
        // Find a suitable relative parent
        const parent = el.parentElement;
        if (window.getComputedStyle(parent).position === 'static') {
            parent.style.position = 'relative';
        }

        const btn = document.createElement('button');
        btn.innerText = '🛡️ Encrypt';
        btn.className = 'noai-shield-btn';
        
        btn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const rawText = el.tagName === 'TEXTAREA' ? el.value : el.innerText;
            if (!rawText.trim()) return;

            // XOR Encrypt
            const utf8Bytes = new TextEncoder().encode(rawText);
            for (let i = 0; i < utf8Bytes.length; i++) {
                utf8Bytes[i] = utf8Bytes[i] ^ 42;
            }
            
            const b64 = btoa(String.fromCharCode.apply(null, utf8Bytes));
            const nonce = Math.random().toString(36).substring(2, 15);
            
            const encryptedPayload = `<div data-noai-encrypt="true" data-pow-nonce="${nonce}" data-pow-difficulty="4">${b64}</div><script src="https://random-stuff-swart-three.vercel.app/api/embed-badge.js"></script>`;
            
            if (el.tagName === 'TEXTAREA') {
                el.value = encryptedPayload;
                // Dispatch input event for React/Vue
                el.dispatchEvent(new Event('input', { bubbles: true })); 
            } else {
                el.innerHTML = encryptedPayload;
                el.dispatchEvent(new Event('input', { bubbles: true }));
            }
            
            btn.innerText = '✅ Secured';
            setTimeout(() => { btn.innerText = '🛡️ Encrypt'; }, 2000);
        };
        
        parent.appendChild(btn);
        el.dataset.noaiShieldAttached = "true";
    });
}

// Observe DOM for new textareas (like Twitter compose modals)
const observer = new MutationObserver(injectShieldButtons);
observer.observe(document.body, { childList: true, subtree: true });

// Initial run
injectShieldButtons();
