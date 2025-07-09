
import { build } from 'vite';
import fs from 'fs';
import path from 'path';

async function buildForWordPress() {
  console.log('Building React app for WordPress deployment...');
  
  try {
    // Build the app with production mode
    await build({
      mode: 'production',
      base: '/wp-content/plugins/chroma-ui/assets/',
      build: {
        rollupOptions: {
          output: {
            entryFileNames: 'assets/chroma-ui.js',
            chunkFileNames: 'assets/chroma-ui-[hash].js',
            assetFileNames: (assetInfo) => {
              if (assetInfo.name?.endsWith('.css')) {
                return 'assets/chroma-ui.css';
              }
              return 'assets/[name].[ext]';
            }
          }
        },
        target: 'es2015',
        sourcemap: false,
        minify: 'terser'
      }
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
            
            // Add any additional chunks if they exist
            $assetsDir = plugin_dir_path(__FILE__) . 'assets/';
            if (is_dir($assetsDir)) {
                $files = scandir($assetsDir);
                foreach ($files as $file) {
                    if (preg_match('/chroma-ui-[a-f0-9]+\\.js$/', $file)) {
                        wp_enqueue_script(
                            'chroma-ui-chunk-' . $file,
                            plugin_dir_url(__FILE__) . 'assets/' . $file,
                            array('chroma-ui-js'),
                            '1.0.0',
                            true
                        );
                    }
                }
            }
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
      console.log('Files created:');
      console.log('- chroma-ui.php (WordPress plugin file)');
      console.log('- assets/chroma-ui.js (React application)');
      console.log('- assets/chroma-ui.css (Styles)');
      console.log('');
      console.log('Next steps:');
      console.log('1. Copy the contents of ./dist/ to your WordPress plugin directory');
      console.log('2. Activate the plugin in WordPress admin');
      console.log('3. Use the [chroma_ui] shortcode on any page or post');
    } else {
      console.error('Build failed - index.html not found');
    }
  } catch (error) {
    console.error('Build failed:', error);
  }
}

buildForWordPress().catch(console.error);
