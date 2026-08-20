<?php
/**
 * Plugin Name: No-AI Badge
 * Plugin URI: https://random-stuff-swart-three.vercel.app/
 * Description: Protect your WordPress site's images and content from unauthorized AI scraping with a self-destructing, secured web badge.
 * Version: 1.0.0
 * Author: painsel
 * License: MIT
 */

if (!defined('ABSPATH')) {
    exit;
}

class NoAiBadgePlugin {
    
    public function __construct() {
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'settings_init'));
        add_action('wp_footer', array($this, 'inject_badge_script'));
    }

    public function add_admin_menu() {
        add_options_page('No-AI Badge Settings', 'No-AI Badge', 'manage_options', 'no_ai_badge', array($this, 'options_page'));
    }

    public function settings_init() {
        register_setting('noAiBadgePlugin', 'no_ai_badge_settings');

        add_settings_section(
            'no_ai_badge_plugin_section',
            __('Badge Configuration', 'wordpress'),
            array($this, 'settings_section_callback'),
            'noAiBadgePlugin'
        );

        add_settings_field('position', __('Position', 'wordpress'), array($this, 'position_render'), 'noAiBadgePlugin', 'no_ai_badge_plugin_section');
        add_settings_field('width', __('Width (px)', 'wordpress'), array($this, 'width_render'), 'noAiBadgePlugin', 'no_ai_badge_plugin_section');
        add_settings_field('link', __('Clickable Link URL', 'wordpress'), array($this, 'link_render'), 'noAiBadgePlugin', 'no_ai_badge_plugin_section');
    }

    public function position_render() {
        $options = get_option('no_ai_badge_settings');
        $position = isset($options['position']) ? $options['position'] : 'bottom-right';
        ?>
        <select name='no_ai_badge_settings[position]'>
            <option value='bottom-right' <?php selected($position, 'bottom-right'); ?>>Bottom Right</option>
            <option value='bottom-left' <?php selected($position, 'bottom-left'); ?>>Bottom Left</option>
            <option value='top-right' <?php selected($position, 'top-right'); ?>>Top Right</option>
            <option value='top-left' <?php selected($position, 'top-left'); ?>>Top Left</option>
        </select>
        <?php
    }

    public function width_render() {
        $options = get_option('no_ai_badge_settings');
        $width = isset($options['width']) ? $options['width'] : '120';
        ?>
        <input type='number' name='no_ai_badge_settings[width]' value='<?php echo esc_attr($width); ?>'>
        <?php
    }

    public function link_render() {
        $options = get_option('no_ai_badge_settings');
        $link = isset($options['link']) ? $options['link'] : '';
        ?>
        <input type='url' name='no_ai_badge_settings[link]' value='<?php echo esc_attr($link); ?>' placeholder='https://...'>
        <?php
    }

    public function settings_section_callback() {
        echo __('Configure your No-AI Badge appearance.', 'wordpress');
    }

    public function options_page() {
        ?>
        <form action='options.php' method='post'>
            <h2>No-AI Badge Settings</h2>
            <?php
            settings_fields('noAiBadgePlugin');
            do_settings_sections('noAiBadgePlugin');
            submit_button();
            ?>
        </form>
        <?php
    }

    public function inject_badge_script() {
        $options = get_option('no_ai_badge_settings');
        
        $position = isset($options['position']) ? esc_attr($options['position']) : 'bottom-right';
        $width = isset($options['width']) && !empty($options['width']) ? esc_attr($options['width']) : '120';
        $link = isset($options['link']) && !empty($options['link']) ? esc_attr($options['link']) : '';
        
        $data_link = $link ? " data-link=\"$link\"" : "";
        
        echo "<!-- No-AI Badge Plugin -->\n";
        echo "<script src=\"https://random-stuff-swart-three.vercel.app/no-ai-badge-embed/embed-badge.js\" data-position=\"$position\" data-width=\"$width\"$data_link async></script>\n";
    }
}

new NoAiBadgePlugin();
