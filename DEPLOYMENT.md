# 🚀 Deployment Guide - The Shadow Archive

## Current Status

✅ **Code Pushed to GitHub**
- Repository: [https://github.com/ayaan000/shadow-archive](https://github.com/ayaan000/shadow-archive)
- Branch: `main`
- Commit: Initial commit with complete game

## Enable GitHub Pages (Final Step)

### Quick Guide

1. **Navigate to Pages Settings**
   - Go to: [https://github.com/ayaan000/shadow-archive/settings/pages](https://github.com/ayaan000/shadow-archive/settings/pages)

2. **Configure Source**
   - Under "Build and deployment"
   - **Source**: Deploy from a branch
   - **Branch**: Select `main` from dropdown
   - **Folder**: `/ (root)`

3. **Save**
   - Click the **Save** button

4. **Wait for Deployment**
   - GitHub will build and deploy your site (takes 1-2 minutes)
   - Refresh the page to see the deployment status
   - A green banner will appear with your live URL

### Your Live URL

Once deployed, your game will be accessible at:

**https://ayaan000.github.io/shadow-archive/**

## Verification

After deployment:
1. Visit the URL above
2. You should see the dark game canvas with "The Forest" in the top right
3. Use WASD to move around
4. Discover entities by approaching shadows
5. Press J to open the journal

## Troubleshooting

### Pages Not Enabled
- Make sure you're logged into GitHub
- Ensure the repository is public
- Check that the Pages settings show `main` branch selected

### 404 Error
- Wait a few more minutes (first deployment can take up to 5 minutes)
- Check the Actions tab to see build status
- Ensure `index.html` is in the root directory

### Blank Page
- Open browser console (F12) to check for errors
- Verify JavaScript modules are loading correctly
- Try hard refresh (Ctrl+Shift+R)

## Local Development

To run locally for testing:

```bash
cd C:\Users\ayaan\.gemini\antigravity\scratch\shadow_archive
python -m http.server 8000
```

Then visit: http://localhost:8000

## Updates

To push updates after making changes:

```bash
git add .
git commit -m "Your update message"
git push
```

GitHub Pages will automatically redeploy within 1-2 minutes.

---

**Ready to share!** Once deployed, you can share the live URL with anyone.
