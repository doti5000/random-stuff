=== No-AI Badge ===
Contributors: painsel
Tags: ai, anti-scraping, bot protection, badge
Requires at least: 5.0
Tested up to: 6.4
Stable tag: 1.0.0
License: MIT
License URI: https://opensource.org/licenses/MIT

Protect your website from AI scraping and data harvesting with a self-defending badge.

== Description ==

The No-AI Badge is a powerful, self-defending widget designed to stop unauthorized AI scrapers (like GPTBot, CCBot, Google-Extended) from harvesting your website's content and images for training data. 

This plugin easily injects the badge into your WordPress site and provides an admin interface to configure its position, size, and advanced edge-defenses like Data Poisoning (Honeypots) and DOM Scrambling.

== Installation ==

1. Upload the `wordpress-no-ai-badge` folder to the `/wp-content/plugins/` directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Go to Settings -> No-AI Badge to configure your widget options.

== Frequently Asked Questions ==

= Does this slow down my site? =
No, the script is loaded asynchronously and is highly optimized.

= Will this affect my SEO? =
The badge itself does not affect SEO. However, if you enable the "Text Obfuscation" setting, it injects zero-width spaces into text to break AI tokenization, which is an experimental feature.

== Changelog ==

= 1.0.0 =
* Initial release with full Phase 5 anti-scraping features.
