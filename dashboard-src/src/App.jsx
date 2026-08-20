import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { ShieldAlert, Download, Activity, Globe, Link as LinkIcon, BarChart3 } from 'lucide-react';
import './index.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// We rely on the Vercel app's API endpoints
const API_BASE = 'https://random-stuff-swart-three.vercel.app/api';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // URL parameters
  const queryParams = new URLSearchParams(window.location.search);
  const targetUrl = queryParams.get('url');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (targetUrl) {
          // Fetch URL stats
          const res = await fetch(`${API_BASE}/url-stats?url=${encodeURIComponent(targetUrl)}`);
          if (!res.ok) throw new Error('Failed to fetch URL stats');
          const json = await res.json();
          setData({ type: 'url', ...json });
        } else {
          // Fetch Global stats
          const res = await fetch(`${API_BASE}/stats`);
          if (!res.ok) throw new Error('Failed to fetch global stats');
          const globalData = await res.json();
          
          const threatsRes = await fetch(`${API_BASE}/threats`);
          if (!threatsRes.ok) throw new Error('Failed to fetch global threats');
          const threatsData = await threatsRes.json();
          
          setData({ type: 'global', ...globalData, threats: threatsData.threats || [] });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [targetUrl]);

  const generateChartData = (threats) => {
    // Generate a simple timeline of threats
    if (!threats || threats.length === 0) return null;
    
    // Group by hour
    const counts = {};
    const now = Date.now();
    
    // Initialize last 24 hours
    for (let i = 23; i >= 0; i--) {
      const d = new Date(now - i * 3600000);
      counts[`${d.getHours()}:00`] = 0;
    }
    
    threats.forEach(t => {
      const d = new Date(t.time);
      const key = `${d.getHours()}:00`;
      if (counts[key] !== undefined) {
        counts[key]++;
      }
    });

    return {
      labels: Object.keys(counts),
      datasets: [
        {
          fill: true,
          label: 'Blocked AI Scrapers',
          data: Object.values(counts),
          borderColor: 'rgba(239, 68, 68, 1)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4,
          pointRadius: 2,
        },
      ],
    };
  };

  const exportWAF = (format) => {
    if (!data || !data.threats) return;
    
    // Extract unique IPs
    const ips = [...new Set(data.threats.map(t => t.ip))].filter(ip => ip && ip !== 'Unknown');
    
    if (ips.length === 0) {
      alert("No valid IPs to export.");
      return;
    }

    let content = '';
    let filename = '';
    let type = '';

    if (format === 'cloudflare') {
      // Cloudflare WAF format (e.g. JSON list for custom rule)
      content = JSON.stringify(ips.map(ip => ({ ip })), null, 2);
      filename = 'cloudflare_waf_blocklist.json';
      type = 'application/json';
    } else if (format === 'nginx') {
      content = ips.map(ip => `deny ${ip};`).join('\n');
      filename = 'nginx_blocklist.conf';
      type = 'text/plain';
    } else {
      content = ips.join('\n');
      filename = 'ip_blocklist.txt';
      type = 'text/plain';
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading">Initializing Threat Telemetry...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="card" style={{ borderColor: 'var(--accent-red)' }}>
          <h2 style={{ color: 'var(--accent-red)', marginBottom: '1rem' }}>Error Loading Data</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const chartData = generateChartData(data.threats);

  return (
    <div className="app-container">
      <header className="dashboard-header">
        <div className="brand">
          <ShieldAlert size={32} color="var(--accent-red)" />
          <h1>No-AI Telemetry</h1>
        </div>
        {targetUrl && (
          <div className="btn" style={{ fontSize: '0.75rem', pointerEvents: 'none' }}>
            <LinkIcon size={14} />
            {new URL(targetUrl).hostname}
          </div>
        )}
      </header>

      <div className="stat-grid">
        <div className="card">
          <div className="card-title">
            <Activity size={18} />
            Total Protected Views
          </div>
          <div className="stat-value blue">
            {data.views ? data.views.toLocaleString() : '0'}
          </div>
        </div>
        
        {data.type === 'global' && (
          <div className="card">
            <div className="card-title">
              <Globe size={18} />
              Protected Domains
            </div>
            <div className="stat-value">
              {data.domains ? data.domains.toLocaleString() : '0'}
            </div>
          </div>
        )}

        <div className="card">
          <div className="card-title" style={{ color: 'var(--accent-red)' }}>
            <ShieldAlert size={18} />
            Blocked Scrapers
          </div>
          <div className="stat-value red">
            {data.threats ? data.threats.length : '0'}
          </div>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="card">
          <div className="card-title">
            <BarChart3 size={18} />
            Scraping Activity (24h)
          </div>
          {chartData ? (
            <div style={{ height: '300px' }}>
              <Line 
                data={chartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } },
                    x: { grid: { display: false } }
                  },
                  plugins: {
                    legend: { display: false }
                  }
                }} 
              />
            </div>
          ) : (
            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
              No threat data available yet.
            </div>
          )}
          
          <div className="export-section">
            <h4 style={{ marginBottom: '1rem', color: 'white' }}>Export Threat IPs</h4>
            <div className="export-buttons">
              <button className="btn btn-primary" onClick={() => exportWAF('cloudflare')}>
                <Download size={16} /> Cloudflare WAF
              </button>
              <button className="btn" onClick={() => exportWAF('nginx')}>
                <Download size={16} /> NGINX Deny List
              </button>
              <button className="btn" onClick={() => exportWAF('raw')}>
                <Download size={16} /> Raw IPs
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">
            Recent Intrusions
          </div>
          {data.threats && data.threats.length > 0 ? (
            <ul className="threat-list">
              {data.threats.slice(0, 8).map((t, i) => (
                <li key={i} className="threat-item">
                  <div className="threat-info">
                    <h4>{t.userAgent.split('/')[0].substring(0, 20)}</h4>
                    <p>{t.ip} • {new Date(t.time).toLocaleTimeString()}</p>
                  </div>
                  <div className="threat-badge">BLOCKED</div>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>No recent intrusions.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
