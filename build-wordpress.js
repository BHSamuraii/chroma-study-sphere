
import { build } from 'vite';
import fs from 'fs';
import path from 'path';

async function buildForWordPress() {
  console.log('Building React app for WordPress deployment...');
  
  // Build the app
  await build({
    mode: 'production',
    base: '/wp-content/plugins/chroma-ui/assets/',
  });
  
  // Read the generated index.html to extract asset references
  const distPath = path.resolve('./dist');
  const indexPath = path.join(distPath, 'index.html');
  
  if (fs.existsSync(indexPath)) {
    const htmlContent = fs.readFileSync(indexPath, 'utf-8');
    
    // Create a WordPress plugin template
    const pluginTemplate = `<?php
/**
 * Plugin Name: Chroma UI
 * Description: React UI integration for WordPress
 * Version: 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class ChromaUI {
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_shortcode('chroma_ui', array($this, 'render_shortcode'));
    }
    
    public function init() {
        // Register and enqueue scripts and styles
        add_action('wp_enqueue_scripts', array($this, 'enqueue_assets'));
    }
    
    public function enqueue_assets() {
        // Only enqueue on pages that use the shortcode
        global $post;
        if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'chroma_ui')) {
            wp_enqueue_script(
                'chroma-ui-js',
                plugin_dir_url(__FILE__) . 'assets/chroma-ui.js',
                array(),
                '1.0.0',
                true
            );
            
            wp_enqueue_style(
                'chroma-ui-css',
                plugin_dir_url(__FILE__) . 'assets/chroma-ui.css',
                array(),
                '1.0.0'
            );
        }
    }
    
    public function render_shortcode($atts) {
        // Return the React root container
        return '<div id="root" class="chroma-ui-container"></div>';
    }
}

// Initialize the plugin
new ChromaUI();
?>`;
    
    // Write the plugin file
    fs.writeFileSync(path.join(distPath, 'chroma-ui.php'), pluginTemplate);
    
    console.log('WordPress plugin files generated successfully!');
    console.log('Copy the contents of ./dist/ to your WordPress plugin directory.');
  }
}

buildForWordPress().catch(console.error);
