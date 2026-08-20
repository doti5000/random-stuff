const Redis = require('ioredis');

module.exports = async (req, res) => {
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { domain } = req.query;
    if (!domain) {
        return res.status(400).json({ error: 'Missing domain parameter' });
    }

    try {
        const url = process.env.RNG_DB_REDIS_URL;

        if (!url) {
            return res.status(500).json({ error: 'Database not configured' });
        }

        const redis = new Redis(url);

        // Get total views for Domain
        const viewsStr = await redis.get(`no-ai-badge-views:domain:${domain}`);
        const views = parseInt(viewsStr || 0, 10);
        
        // Get threats for Domain
        const threatsRaw = await redis.lrange(`no-ai-badge-threats:domain:${domain}`, 0, 99);
        const threats = threatsRaw.map(t => JSON.parse(t));

        redis.quit();
        res.status(200).json({ 
            domain,
            views,
            threats 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
