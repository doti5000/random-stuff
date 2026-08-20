const Redis = require('ioredis');

module.exports = async (req, res) => {
    // Add CORS headers to allow pings from any domain
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const url = process.env.RNG_DB_REDIS_URL;

        if (!url) {
            console.error('Redis URL environment variable missing.');
            return res.status(500).json({ error: 'Database not configured' });
        }

        const redis = new Redis(url);

        let targetUrl = req.headers.referer || req.headers.origin || 'unknown';
        let domain = 'unknown';
        // Clean URL (remove query params for canonical tracking)
        try {
            if (targetUrl !== 'unknown') {
                const u = new URL(targetUrl);
                targetUrl = u.href.split('?')[0];
                domain = u.hostname;
            }
        } catch(e) {}

        // Increment total views
        const views = await redis.incr('no-ai-badge-total-views');

        // Add to unique domains set and increment URL and Domain specific views
        if (targetUrl !== 'unknown') {
            await redis.sadd('no-ai-badge-domains', domain);
            await redis.incr(`no-ai-badge-views:url:${targetUrl}`);
            await redis.incr(`no-ai-badge-views:domain:${domain}`);
        }

        redis.quit();
        res.status(200).json({ success: true, views });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
