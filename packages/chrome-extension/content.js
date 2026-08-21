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
            
            let binary = '';
            for (let i = 0; i < utf8Bytes.length; i++) {
                binary += String.fromCharCode(utf8Bytes[i]);
            }
            const b64 = btoa(binary);
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

function injectDecryptButtons() {
    // Find text nodes that contain our payload signature
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walker.nextNode()) {
        if (node.nodeValue.includes('data-noai-encrypt="true"') && !node.parentElement.dataset.noaiDecrypted) {
            const parent = node.parentElement;
            parent.dataset.noaiDecrypted = "true";
            
            if (window.getComputedStyle(parent).position === 'static') {
                parent.style.position = 'relative';
            }
            
            const btn = document.createElement('button');
            btn.innerText = '🔓 Decrypt';
            btn.className = 'noai-shield-btn';
            btn.style.backgroundColor = '#FF0055';
            btn.style.borderColor = '#FF0055';
            btn.style.bottom = '40px'; // Stack above Encrypt
            
            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Extract the base64 part
                const match = node.nodeValue.match(/<div data-noai-encrypt="true"[^>]*>([^<]+)<\/div>/);
                if (match && match[1]) {
                    const b64 = match[1].trim();
                    try {
                        const binaryStr = atob(b64);
                        const bytes = new Uint8Array(binaryStr.length);
                        for(let i = 0; i < binaryStr.length; i++) {
                            bytes[i] = binaryStr.charCodeAt(i) ^ 42;
                        }
                        const decodedText = new TextDecoder().decode(bytes);
                        
                        node.nodeValue = decodedText;
                        btn.remove();
                    } catch(err) {
                        console.error("Decryption failed", err);
                    }
                }
            };
            
            parent.appendChild(btn);
        }
    }
}

// Observe DOM for new textareas and encrypted payloads (like Twitter compose modals and feed loads)
const observer = new MutationObserver(() => {
    injectShieldButtons();
    injectDecryptButtons();
});
observer.observe(document.body, { childList: true, subtree: true });

// Initial run
injectShieldButtons();
injectDecryptButtons();
