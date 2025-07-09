
# WordPress Deployment Guide

## Building for WordPress

1. **Build the WordPress-optimized version:**
   ```bash
   npm run build:wordpress
   ```

2. **Copy files to WordPress:**
   - Copy the entire `dist/` folder contents to `/wp-content/plugins/chroma-ui/`
   - Your WordPress plugin directory should look like:
     ```
     /wp-content/plugins/chroma-ui/
     ├── chroma-ui.php
     ├── assets/
     │   ├── chroma-ui.js
     │   ├── chroma-ui.css
     │   └── [other assets]
     └── index.html (optional, for reference)
     ```

## WordPress Setup

1. **Activate the plugin:**
   - Go to WordPress Admin → Plugins
   - Find "Chroma UI" and activate it

2. **Create a page:**
   - Go to Pages → Add New
   - Add the shortcode: `[chroma_ui]`
   - Set the page slug to "home" if you want it as homepage
   - Publish the page

3. **Set as homepage (optional):**
   - Go to Settings → Reading
   - Set "Your homepage displays" to "A static page"
   - Choose your page with the shortcode as the homepage

## Troubleshooting

- **Assets not loading:** Check the file paths in your WordPress installation
- **404 errors:** Ensure the plugin is activated and the page exists
- **JavaScript errors:** Check browser console for specific error messages
- **Styling issues:** Verify the CSS file is being loaded correctly

## File Structure After Deployment

```
WordPress Root/
└── wp-content/
    └── plugins/
        └── chroma-ui/
            ├── chroma-ui.php (WordPress plugin file)
            └── assets/
                ├── chroma-ui.js (Your React app)
                ├── chroma-ui.css (Styles)
                └── [other assets]
```

## Benefits of This Approach

- ✅ Clean separation between WordPress and React
- ✅ Proper asset management through WordPress
- ✅ Easy to update by rebuilding and copying files
- ✅ Works with WordPress caching plugins
- ✅ Shortcode can be used on any page/post
