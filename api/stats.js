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

    try {
        const url = process.env.RNG_DB_REDIS_URL;

        if (!url) {
            return res.status(500).json({ error: 'Database not configured' });
        }

        const redis = new Redis(url);

        // Get total views
        const views = await redis.get('no-ai-badge-total-views');
        
        // Get unique domains count
        const domains = await redis.scard('no-ai-badge-domains');

        redis.quit();
        res.status(200).json({
            views: parseInt(views || 0, 10),
            domains: parseInt(domains || 0, 10)
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
