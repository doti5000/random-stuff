const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

module.exports = async (req, res) => {
    try {
        // Read the raw, unobfuscated source code
        const srcPath = path.join(__dirname, 'embed-badge.src.js');
        const sourceCode = fs.readFileSync(srcPath, 'utf8');

        // Apply dynamic, polymorphic obfuscation at runtime
        // The seed is randomized per request, so the code looks completely different every time.
        const obfuscationResult = JavaScriptObfuscator.obfuscate(sourceCode, {
            compact: true,
            controlFlowFlattening: true, // Increased security
            controlFlowFlatteningThreshold: 0.25,
            deadCodeInjection: true, // Add junk code to confuse AI models
            deadCodeInjectionThreshold: 0.1,
            stringArray: true,
            stringArrayEncoding: ['base64'],
            stringArrayThreshold: 1,
            disableConsoleOutput: false,
            selfDefending: true,
            seed: Math.floor(Math.random() * 1000000)
        });

        const polymorphicCode = obfuscationResult.getObfuscatedCode();

        // Serve with CORS headers and a 5-minute cache
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate'); // Rebuild every 5 mins

        res.status(200).send(polymorphicCode);
    } catch (err) {
        console.error('Polymorphic generation failed:', err);
        res.status(500).send('console.error("No-AI Badge Failed to load");');
    }
};
