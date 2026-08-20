import Redis from 'ioredis';

// Common AI Bots
const AI_BOTS = [
    'CCBot', 'GPTBot', 'ChatGPT-User', 'Google-Extended', 
    'Anthropic-ai', 'Omgilibot', 'Omgili', 'FacebookBot', 
    'Diffbot', 'Bytespider', 'ImagesiftBot'
];

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const userAgent = request.headers.get('User-Agent') || '';
    
    // 1. Anti-Scraper Middleware
    const isBot = AI_BOTS.some(bot => userAgent.includes(bot));
    if (isBot) {
        return new Response('403 Forbidden: AI Scraping is strictly prohibited by this domain. For more information, visit https://no-ai-badge.com', {
            status: 403,
            headers: { 'Content-Type': 'text/plain' }
        });
    }

    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*'
    };

    if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }
    
    // SVG Badge Endpoint
    if (url.pathname === '/api/badge.svg' && request.method === 'GET') {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 28" width="100" height="28">
            <rect width="100" height="28" rx="4" fill="#1e293b"/>
            <rect x="55" width="45" height="28" rx="4" fill="#ef4444"/>
            <text x="10" y="19" font-family="Verdana,sans-serif" font-size="12" font-weight="bold" fill="#fff">PROTECT</text>
            <text x="61" y="19" font-family="Verdana,sans-serif" font-size="12" font-weight="bold" fill="#fff">NO AI</text>
        </svg>`;
        return new Response(svg, {
            headers: { ...corsHeaders, 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=86400' }
        });
    }

    if (url.pathname === '/api/ping' && request.method === 'POST') {
        if (!env.RNG_DB_REDIS_URL) return Response.json({ error: 'DB not configured' }, { status: 500, headers: corsHeaders });
        
        try {
            const redis = new Redis(env.RNG_DB_REDIS_URL);
            
            let origin = request.headers.get('origin') || request.headers.get('referer') || 'unknown';
            try {
                const u = new URL(origin);
                origin = u.hostname;
            } catch(e) {}

            const views = await redis.incr('no-ai-badge-total-views');
            if (origin !== 'unknown') {
                await redis.sadd('no-ai-badge-domains', origin);
            }
            
            // Geo-Tracking
            const country = request.cf?.country || 'Unknown';
            if (country !== 'Unknown') {
                await redis.hincrby('no-ai-badge-countries', country, 1);
            }
            
            redis.quit();
            return Response.json({ success: true, views }, { headers: corsHeaders });
        } catch(err) {
            console.error(err);
            return Response.json({ error: err.message }, { status: 500, headers: corsHeaders });
        }
    }

    if (url.pathname === '/api/stats' && request.method === 'GET') {
        if (!env.RNG_DB_REDIS_URL) return Response.json({ error: 'DB not configured' }, { status: 500, headers: corsHeaders });
        
        try {
            const redis = new Redis(env.RNG_DB_REDIS_URL);
            const views = await redis.get('no-ai-badge-total-views');
            const domains = await redis.scard('no-ai-badge-domains');
            const countriesData = await redis.hgetall('no-ai-badge-countries');
            
            // Format country data
            let countries = [];
            if (countriesData) {
                countries = Object.entries(countriesData)
                    .map(([code, count]) => ({ code, count: parseInt(count, 10) }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 5); // Top 5
            }
            
            redis.quit();
            return Response.json({
                views: parseInt(views || 0, 10),
                domains: parseInt(domains || 0, 10),
                topCountries: countries
            }, { headers: corsHeaders });
        } catch(err) {
            console.error(err);
            return Response.json({ error: err.message }, { status: 500, headers: corsHeaders });
        }
    }

    // Pass-through for static assets (test-analytics.html, index.html, etc)
    return env.ASSETS.fetch(request);
  }
};
