#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const SCRIPT_URL = 'https://random-stuff-swart-three.vercel.app/no-ai-badge-embed/embed-badge.js';

console.log('🛡️  Welcome to the No-AI Badge CLI Setup!');
console.log('-------------------------------------------');

rl.question('What position do you want the badge? (bottom-right/bottom-left/top-right/top-left) [bottom-right]: ', (pos) => {
    pos = pos || 'bottom-right';
    
    rl.question('Enable anti-scraper runaway physics? (y/N) [N]: ', (physics) => {
        const hasPhysics = physics.toLowerCase() === 'y';
        
        rl.question('Enable Full HTML Encryption (Protects against non-JS scrapers)? (y/N) [y]: ', (encrypt) => {
            const doEncrypt = encrypt.toLowerCase() !== 'n';

            // Find index.html
            const indexPath = path.join(process.cwd(), 'index.html');
            if (!fs.existsSync(indexPath)) {
                console.error('❌ Could not find index.html in the current directory.');
                process.exit(1);
            }
            
            let content = fs.readFileSync(indexPath, 'utf8');
            
            let snippet = `\n    <script src="${SCRIPT_URL}"`;
            if (pos !== 'bottom-right') snippet += ` data-position="${pos}"`;
            if (hasPhysics) snippet += ` data-physics="true"`;
            if (doEncrypt) snippet += ` data-hydrate="true"`;
            snippet += `></script>\n`;

            if (doEncrypt) {
                // Extract everything inside <body>...</body>
                const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
                if (bodyMatch) {
                    const bodyContent = bodyMatch[1];
                    const b64 = Buffer.from(bodyContent).toString('base64');
                    // We don't have the script key available here, so we just do base64 in the CLI, 
                    // and let embed-badge.js know we skipped XOR for this basic hydration, 
                    // OR we XOR it here with the public key 42!
                    let xorStr = '';
                    const decoded = Buffer.from(b64, 'base64').toString('utf8'); // Wait, b64 of bodyContent
                    for (let i = 0; i < b64.length; i++) {
                        xorStr += String.fromCharCode(b64.charCodeAt(i) ^ 42);
                    }
                    const finalB64 = Buffer.from(xorStr).toString('base64');

                    const newBody = `\n<div data-noai-encrypt="true">\n${finalB64}\n</div>\n${snippet}`;
                    content = content.replace(bodyMatch[1], newBody);
                } else {
                    console.error('❌ Could not find <body> tag in your index.html.');
                }
            } else {
                if (content.includes('</body>')) {
                    content = content.replace('</body>', snippet + '</body>');
                } else {
                    console.error('❌ Could not find </body> tag in your index.html.');
                }
            }
            
            // Create noai-dist and write output
            const distDir = path.join(process.cwd(), 'noai-dist');
            if (!fs.existsSync(distDir)) {
                fs.mkdirSync(distDir);
            }
            const outPath = path.join(distDir, 'index.html');
            fs.writeFileSync(outPath, content, 'utf8');
            
            console.log(`✅ Successfully protected your site! Saved to: ${outPath}`);
            rl.close();
        });
    });
});
