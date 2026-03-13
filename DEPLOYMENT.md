# GitHub Pages Deployment Guide

This guide will help you deploy your React app to GitHub Pages.

## Prerequisites

1. A GitHub account - done
2. A GitHub repository (create one if you haven't already) - https://github.com/sheltondsouza-gotphoto/buddy-pictures
3. Git installed on your machine - done
SSH done too, you can push from my machine

## Setup Steps

you will have to overwrite the existing repo




### 3. Update Homepage in package.json

The homepage is currently set to:
```json
"homepage": "https://sheltondsouza.github.io/Entagged-proto"
```

If your repository name is different, update this in `package.json` to match:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME
```



### 5. Deploy to GitHub Pages

Run the deployment command:

```bash
npm run deploy
```

This will:
- Build your React app for production
- Create a `gh-pages` branch
- Push the build files to GitHub Pages

### 6. Access Your Deployed App

After deployment, your app will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME
```

**Note:** It may take a few minutes for the site to be live after the first deployment.

## Updating Your Deployment

Whenever you make changes and want to update the live site:

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. Deploy again:
   ```bash
   npm run deploy
   ```

## Troubleshooting

### Build Fails
- Make sure all dependencies are installed: `npm install`
- Check for any build errors in the console

### 404 Errors on Refresh
- This is normal for React Router apps on GitHub Pages
- Consider using HashRouter instead of BrowserRouter if you plan to use routing

### Changes Not Showing
- Clear your browser cache
- Wait a few minutes for GitHub Pages to update
- Check the GitHub Pages settings to ensure the branch is set correctly

## Additional Notes

- The `build` folder is in `.gitignore` and won't be committed to your main branch
- The `gh-pages` branch is automatically created and managed by the `gh-pages` package
- You can check deployment status in your repository's Actions tab (if enabled)
