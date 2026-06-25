# 🚀 Deployment Guide: Cloud Portfolio on Render

Your portfolio is fully built using React + Vite and configured to be easily deployed on **Render** using a Node.js/Express server.

Follow these simple steps to deploy your portfolio live so recruiters can see it!

## Prerequisites

1. **GitHub Account:** Ensure your code is pushed to a repository on GitHub.
2. **Render Account:** Sign up or log in at [Render.com](https://render.com/).

## Step-by-Step Deployment on Render

1. Log into your Render dashboard.
2. Click the **"New"** button and select **"Web Service"**.
3. Choose **"Build and deploy from a Git repository"** and connect your GitHub account.
4. Select the repository containing this portfolio code.
5. Fill in the deployment details exactly as follows:
   
   - **Name:** `omm-portfolio` (or whatever you prefer)
   - **Region:** Choose the region closest to you or your target audience.
   - **Branch:** `main` (or the default branch of your repo)
   - **Root Directory:** *(leave blank)*
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free` (the free tier works perfectly for this)

6. Scroll down and click **"Create Web Service"**.

## What happens next?

Render will now download your code, run `npm install`, build the optimized Vite production bundle using `npm run build`, and then start your Express server using `npm start` which will serve your portfolio on the web!

Once the deployment finishes (it usually takes 2-3 minutes), Render will provide you with a live URL (e.g., `https://omm-portfolio.onrender.com`). 

You can then add this URL to your resume, LinkedIn, and share it with recruiters!

## Updating Your Portfolio
Whenever you want to make changes to your portfolio:
1. Edit the code locally.
2. Commit and push the changes to your GitHub repository.
3. Render will automatically detect the push and trigger a new deployment to update your live site!
