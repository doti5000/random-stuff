#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const SCRIPT_URL = 'https://random-stuff.britishdex.workers.dev/no-ai-badge-embed/embed-badge.js';

console.log('🛡️  Welcome to the No-AI Badge CLI Setup!');
console.log('-------------------------------------------');

rl.question('What position do you want the badge? (bottom-right/bottom-left/top-right/top-left) [bottom-right]: ', (pos) => {
    pos = pos || 'bottom-right';
    
    rl.question('Enable anti-scraper runaway physics? (y/N) [N]: ', (physics) => {
        const hasPhysics = physics.toLowerCase() === 'y';
        
        // Find index.html
        const indexPath = path.join(process.cwd(), 'index.html');
        if (!fs.existsSync(indexPath)) {
            console.error('❌ Could not find index.html in the current directory.');
            process.exit(1);
        }
        
        let content = fs.readFileSync(indexPath, 'utf8');
        
        if (content.includes(SCRIPT_URL)) {
            console.log('✅ The No-AI Badge is already installed in your index.html!');
            process.exit(0);
        }
        
        let snippet = `\n    <script src="${SCRIPT_URL}"`;
        if (pos !== 'bottom-right') snippet += ` data-position="${pos}"`;
        if (hasPhysics) snippet += ` data-physics="true"`;
        snippet += `></script>\n`;
        
        // Inject before </body>
        if (content.includes('</body>')) {
            content = content.replace('</body>', snippet + '</body>');
            fs.writeFileSync(indexPath, content, 'utf8');
            console.log('✅ Successfully injected the No-AI Badge into index.html!');
        } else {
            console.error('❌ Could not find </body> tag in your index.html.');
        }
        
        rl.close();
    });
});
