import React, { useState, useEffect } from 'react';
import { renderToString } from 'react-dom/server';

export function NoAiShield({ children, position = 'bottom-right' }) {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    // On Server or Initial Client render
    if (!mounted) {
        let b64 = "";
        let nonce = "default";
        const difficulty = 4;
        
        if (typeof window === 'undefined') {
            const html = renderToString(<>{children}</>);
            
            // 1. Cloak Images
            let cloakedHtml = html.replace(/<img\s+([^>]*?)src=["']([^"']*)["']([^>]*?)>/gi, '<canvas data-noai-img="$2" $1 $3></canvas>');
            
            // 2. XOR Encrypt
            const utf8Bytes = Buffer.from(cloakedHtml, 'utf8');
            for (let i = 0; i < utf8Bytes.length; i++) {
                utf8Bytes[i] = utf8Bytes[i] ^ 42;
            }
            b64 = utf8Bytes.toString('base64');
            nonce = Math.random().toString(36).substring(2, 15);
        }
        
        return (
            <>
                <div data-noai-encrypt="true" data-pow-nonce={nonce} data-pow-difficulty={difficulty} suppressHydrationWarning>
                    {b64}
                </div>
                <script src="https://random-stuff-swart-three.vercel.app/api/embed-badge.js" data-position={position} suppressHydrationWarning></script>
            </>
        );
    }

    // After mounting, we return an empty div and let the standalone polymorphic vanilla JS take over the DOM manipulation.
    // NOTE: Interactive React components (onClick, state) inside children will not function, as they are rendered as static HTML.
    return <div data-noai-shield-mounted="true" suppressHydrationWarning></div>;
}
