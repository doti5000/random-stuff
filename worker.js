import Redis from 'ioredis';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*'
    };

    if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    if (url.pathname === '/api/ping' && request.method === 'POST') {
        if (!env.RNG_DB_REDIS_URL) return Response.json({ error: 'DB not configured (missing RNG_DB_REDIS_URL)' }, { status: 500, headers: corsHeaders });
        
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
            
            redis.quit();
            return Response.json({
                views: parseInt(views || 0, 10),
                domains: parseInt(domains || 0, 10)
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
