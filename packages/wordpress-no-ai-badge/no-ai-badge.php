<?php
/**
 * Plugin Name: No-AI Badge
 * Description: Protect your website from AI scraping and data harvesting with a self-defending badge.
 * Version: 1.0.0
 * Author: Painsel
 * License: MIT
 */

if (!defined('ABSPATH')) {
    exit;
}

class NoAIBadgePlugin {
    public function __construct() {
        add_action('wp_footer', array($this, 'inject_badge_script'));
        add_action('admin_menu', array($this, 'add_settings_page'));
        add_action('admin_init', array($this, 'register_settings'));
        
        if (get_option('no_ai_badge_full_encryption', '0') == '1' && !is_admin()) {
            add_action('template_redirect', array($this, 'start_buffer'), 1);
        }
    }

    public function get_badge_script_tag() {
        $position = get_option('no_ai_badge_position', 'bottom-right');
        $width = get_option('no_ai_badge_width', '120');
        $margin = get_option('no_ai_badge_margin', '20');
        $obfuscate = get_option('no_ai_badge_obfuscate', '0');
        $scramble = get_option('no_ai_badge_scramble', '0');
        $encrypt = get_option('no_ai_badge_full_encryption', '0');

        $script = "<!-- No-AI Badge Protection -->\n";
        $script .= "<script src=\"https://random-stuff-swart-three.vercel.app/no-ai-badge-embed/embed-badge.js\"\n";
        $script .= "    data-position=\"" . esc_attr($position) . "\"\n";
        $script .= "    data-width=\"" . esc_attr($width) . "\"\n";
        $script .= "    data-margin=\"" . esc_attr($margin) . "\"\n";
        if ($obfuscate == '1') {
            $script .= "    data-obfuscate=\"true\"\n";
        }
        if ($scramble == '1') {
            $script .= "    data-scramble=\"true\"\n";
        }
        if ($encrypt == '1') {
            $script .= "    data-hydrate=\"true\"\n";
        }
        $script .= "></script>\n";
        
        return $script;
    }

    public function inject_badge_script() {
        if (get_option('no_ai_badge_full_encryption', '0') != '1') {
            echo $this->get_badge_script_tag();
        }
    }

    public function start_buffer() {
        ob_start(array($this, 'encrypt_html'));
    }

    public function encrypt_html($html) {
        if (preg_match('/<body[^>]*>([\s\S]*?)<\/body>/i', $html, $matches)) {
            $bodyContent = $matches[1];
            
            // XOR each byte with 42
            $len = strlen($bodyContent);
            $xorStr = '';
            for ($i = 0; $i < $len; $i++) {
                $xorStr .= chr(ord($bodyContent[$i]) ^ 42);
            }
            
            $finalB64 = base64_encode($xorStr);
            
            // Construct new body with hydration target and script
            $newBody = "\n<div data-noai-encrypt=\"true\">\n{$finalB64}\n</div>\n";
            $newBody .= $this->get_badge_script_tag();
            
            $html = str_replace($matches[1], $newBody, $html);
        }
        return $html;
    }

    public function add_settings_page() {
        add_options_page('No-AI Badge Settings', 'No-AI Badge', 'manage_options', 'no-ai-badge', array($this, 'render_settings_page'));
    }

    public function register_settings() {
        register_setting('no_ai_badge_settings', 'no_ai_badge_position');
        register_setting('no_ai_badge_settings', 'no_ai_badge_width');
        register_setting('no_ai_badge_settings', 'no_ai_badge_margin');
        register_setting('no_ai_badge_settings', 'no_ai_badge_obfuscate');
        register_setting('no_ai_badge_settings', 'no_ai_badge_scramble');
        register_setting('no_ai_badge_settings', 'no_ai_badge_full_encryption');
    }

    public function render_settings_page() {
        ?>
        <div class="wrap">
            <h1>No-AI Badge Settings</h1>
            <form method="post" action="options.php">
                <?php settings_fields('no_ai_badge_settings'); ?>
                <?php do_settings_sections('no_ai_badge_settings'); ?>
                <table class="form-table">
                    <tr valign="top">
                        <th scope="row">Position</th>
                        <td>
                            <select name="no_ai_badge_position">
                                <option value="bottom-right" <?php selected(get_option('no_ai_badge_position'), 'bottom-right'); ?>>Bottom Right</option>
                                <option value="bottom-left" <?php selected(get_option('no_ai_badge_position'), 'bottom-left'); ?>>Bottom Left</option>
                                <option value="top-right" <?php selected(get_option('no_ai_badge_position'), 'top-right'); ?>>Top Right</option>
                                <option value="top-left" <?php selected(get_option('no_ai_badge_position'), 'top-left'); ?>>Top Left</option>
                            </select>
                        </td>
                    </tr>
                    <tr valign="top">
                        <th scope="row">Width (px)</th>
                        <td><input type="number" name="no_ai_badge_width" value="<?php echo esc_attr(get_option('no_ai_badge_width', '120')); ?>" /></td>
                    </tr>
                    <tr valign="top">
                        <th scope="row">Margin (px)</th>
                        <td><input type="number" name="no_ai_badge_margin" value="<?php echo esc_attr(get_option('no_ai_badge_margin', '20')); ?>" /></td>
                    </tr>
                    <tr valign="top">
                        <th scope="row">Text Obfuscation (Honeypot)</th>
                        <td><input type="checkbox" name="no_ai_badge_obfuscate" value="1" <?php checked(1, get_option('no_ai_badge_obfuscate'), true); ?> /> Inject zero-width spaces into text to break LLM tokenization.</td>
                    </tr>
                    <tr valign="top">
                        <th scope="row">DOM Scrambling</th>
                        <td><input type="checkbox" name="no_ai_badge_scramble" value="1" <?php checked(1, get_option('no_ai_badge_scramble'), true); ?> /> Randomize element IDs and Classes (Experimental).</td>
                    </tr>
                    <tr valign="top">
                        <th scope="row">Full HTML Encryption (Tier 2)</th>
                        <td><input type="checkbox" name="no_ai_badge_full_encryption" value="1" <?php checked(1, get_option('no_ai_badge_full_encryption'), true); ?> /> Automatically XOR encrypt the entire site's body on every load to defeat non-JS scrapers.</td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }
}

new NoAIBadgePlugin();
