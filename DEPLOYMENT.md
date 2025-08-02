# Tamil News Channel - Deployment Guide

## GitHub Setup and Deployment Options

### Prerequisites
- Git installed on your system
- GitHub account
- Node.js and npm installed

### GitHub Repository Setup

1. **Create a new repository on GitHub:**
   - Go to https://github.com
   - Click "New repository"
   - Repository name: `tamil-news-channel`
   - Description: `Tamil News Channel Web Application`
   - Make it Public (for free deployment options)
   - Don't initialize with README (we already have files)

2. **Connect your local project to GitHub:**
   ```bash
   # Initialize git repository
   git init
   
   # Add all files
   git add .
   
   # Make first commit
   git commit -m "Initial commit: Tamil News Channel web application"
   
   # Add remote repository (replace YOUR_USERNAME with your GitHub username)
   git remote add origin https://github.com/YOUR_USERNAME/tamil-news-channel.git
   
   # Push to GitHub
   git push -u origin main
   ```

### Deployment Options

#### Option 1: Netlify (Recommended for Frontend)
1. Connect your GitHub repository to Netlify
2. Build settings:
   - Build command: `npm run build` (if needed)
   - Publish directory: `public`
3. For full-stack, use Netlify Functions

#### Option 2: Vercel
1. Import your GitHub repository to Vercel
2. Vercel will auto-detect Node.js project
3. Set environment variables in Vercel dashboard

#### Option 3: Railway
1. Connect GitHub repository to Railway
2. Railway supports Node.js + MongoDB
3. Set environment variables
4. Automatic deployments on git push

#### Option 4: Render
1. Connect GitHub repository to Render
2. Create Web Service
3. Set build and start commands:
   - Build: `npm install`
   - Start: `npm start`

#### Option 5: Heroku
1. Create Heroku app
2. Connect to GitHub repository
3. Set environment variables
4. Enable automatic deploys

### Environment Variables for Deployment

Set these environment variables in your deployment platform:

```env
PORT=3000
NODE_ENV=production
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secure-jwt-secret
```

### Database Options for Production

#### MongoDB Atlas (Recommended)
1. Create free account at https://www.mongodb.com/atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in your deployment platform

#### Railway PostgreSQL (Alternative)
- Use Railway's built-in PostgreSQL
- Modify code to use PostgreSQL instead of MongoDB

### Pre-deployment Checklist

- [ ] Environment variables configured
- [ ] Database connection string updated
- [ ] JWT secret changed from default
- [ ] .env file not committed to git
- [ ] All dependencies listed in package.json
- [ ] Build scripts configured (if needed)

### Post-deployment Steps

1. **Initialize database:**
   - Run database initialization script
   - Create admin user
   - Add sample categories and news

2. **Test functionality:**
   - Browse news articles
   - Test search functionality
   - Test admin panel
   - Verify responsive design

3. **Configure domain (optional):**
   - Set up custom domain
   - Configure SSL certificate

### Monitoring and Maintenance

- Monitor application logs
- Set up error tracking (Sentry, etc.)
- Regular database backups
- Update dependencies regularly
- Monitor performance metrics

### Support

For deployment issues:
1. Check application logs
2. Verify environment variables
3. Test database connectivity
4. Check build logs

### Security Considerations

- Use strong JWT secrets
- Enable HTTPS
- Implement rate limiting
- Validate all inputs
- Keep dependencies updated
- Use environment variables for secrets
