# ChitChat Deployment Guide for Vercel

This guide will help you deploy your ChitChat application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: Your code should be in a GitHub repository
3. **MongoDB Database**: Set up a MongoDB database (MongoDB Atlas recommended)
4. **Stream Chat Account**: Set up a Stream Chat account for real-time messaging

## Step 1: Prepare Your Environment Variables

### Backend Environment Variables (Set in Vercel Dashboard)

You'll need to add these environment variables in your Vercel project settings:

```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://your-frontend-domain.vercel.app
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
NODE_ENV=production
```

### Frontend Environment Variables (Set in Vercel Dashboard)

```
VITE_API_BASE_URL=https://your-backend-domain.vercel.app/api
VITE_STREAM_API_KEY=your_stream_api_key
VITE_NODE_ENV=production
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project root**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Set up and override settings
   - Deploy

### Option B: Deploy via GitHub Integration

1. **Push your code to GitHub**
2. **Go to [vercel.com](https://vercel.com)**
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure the project**:
   - Framework Preset: Other
   - Root Directory: `./` (root)
   - Build Command: `npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `npm run install:all`

## Step 3: Configure Environment Variables

1. **Go to your Vercel project dashboard**
2. **Navigate to Settings → Environment Variables**
3. **Add all the environment variables listed in Step 1**
4. **Redeploy your application**

## Step 4: Update CORS Settings

After deployment, update your backend environment variables:

1. **Get your frontend URL** (e.g., `https://your-app.vercel.app`)
2. **Update `CORS_ORIGIN`** in your backend environment variables
3. **Redeploy the backend**

## Step 5: Test Your Deployment

1. **Visit your frontend URL**
2. **Test user registration and login**
3. **Test chat functionality**
4. **Test video calling**

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure `CORS_ORIGIN` is set to your frontend URL
2. **Database Connection**: Ensure MongoDB Atlas is configured for your Vercel region
3. **Environment Variables**: Double-check all variables are set correctly
4. **Build Errors**: Check the build logs in Vercel dashboard

### Debugging:

1. **Check Vercel Function Logs**: Go to Functions tab in Vercel dashboard
2. **Check Build Logs**: Review the build process for errors
3. **Test API Endpoints**: Use tools like Postman to test your API

## Post-Deployment

1. **Set up custom domain** (optional)
2. **Configure SSL certificates** (automatic with Vercel)
3. **Set up monitoring and analytics**
4. **Configure automatic deployments from GitHub**

## Security Considerations

1. **Use strong JWT secrets**
2. **Keep API keys secure**
3. **Enable MongoDB Atlas security features**
4. **Regularly update dependencies**

## Support

If you encounter issues:
1. Check Vercel documentation
2. Review your application logs
3. Test locally with production environment variables
4. Contact Vercel support if needed
