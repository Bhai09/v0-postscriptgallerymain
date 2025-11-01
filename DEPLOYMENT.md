# Deployment Guide

## Deploying to Production

### Prerequisites
- Production Firebase project
- Production MongoDB Atlas cluster
- Web hosting service (Vercel, Netlify, AWS, etc.)
- Custom domain (optional)

### Firebase Setup for Production

1. **Create production Firebase project**
   - Go to Firebase Console
   - Create new project
   - Enable Authentication (Email/Password)
   - Create Firestore database (production mode)
   - Set security rules

2. **Firestore Security Rules**
\`\`\`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /galleries/{galleryId} {
      allow read: if true;
      allow write: if request.auth.uid == resource.data.userId;
    }
    match /media/{mediaId} {
      allow read: if true;
      allow write: if request.auth.uid == resource.data.userId;
    }
    match /comments/{commentId} {
      allow read: if true;
      allow write: if request.auth.uid == resource.data.userId;
    }
  }
}
\`\`\`

3. **Update environment variables**
\`\`\`
VITE_FIREBASE_API_KEY=<prod-key>
VITE_FIREBASE_AUTH_DOMAIN=<prod-domain>
VITE_FIREBASE_PROJECT_ID=<prod-id>
VITE_FIREBASE_STORAGE_BUCKET=<prod-bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<prod-id>
VITE_FIREBASE_APP_ID=<prod-app-id>
\`\`\`

### MongoDB Setup for Production

1. **Create production cluster**
   - Go to MongoDB Atlas
   - Create new cluster
   - Select M2+ tier for production
   - Configure backups

2. **Update connection string**
\`\`\`
MONGODB_URI=mongodb+srv://<prod-user>:<prod-pass>@<prod-cluster>.mongodb.net/?appName=Cluster0
\`\`\`

### Deployment to Vercel (Recommended)

1. **Connect GitHub repository**
   - Go to vercel.com
   - Click "New Project"
   - Select your repository
   - Import

2. **Configure environment variables**
   - Add all Firebase and MongoDB variables
   - Set `VITE_ENVIRONMENT=production`

3. **Deploy**
   - Vercel automatically deploys on push to main branch
   - View deployment URL in dashboard

### Deployment to Netlify

1. **Connect repository**
   - Go to netlify.com
   - Click "New site from Git"
   - Select your repository

2. **Build settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Environment variables**
   - Add all variables in Site settings
   - Deploy

### Deployment to AWS S3 + CloudFront

1. **Build the app**
\`\`\`bash
npm run build
\`\`\`

2. **Create S3 bucket**
   - Create new bucket
   - Enable static website hosting
   - Set bucket policy for public access

3. **Upload files**
\`\`\`bash
aws s3 sync dist/ s3://your-bucket-name --delete
\`\`\`

4. **Create CloudFront distribution**
   - Point to S3 bucket
   - Enable caching
   - Add custom domain

### Custom Domain Setup

1. **Purchase domain** (GoDaddy, Namecheap, etc.)

2. **Update DNS records**
   - Point to your hosting provider's nameservers
   - Or create CNAME record

3. **Enable HTTPS**
   - Vercel/Netlify handle this automatically
   - AWS: Use ACM certificate

### Post-Deployment Checklist

- [ ] Test authentication flow
- [ ] Verify Firestore data sync
- [ ] Test gallery creation/upload
- [ ] Test PWA install
- [ ] Check responsive design on mobile
- [ ] Verify offline functionality
- [ ] Monitor performance with Lighthouse
- [ ] Set up error tracking (Sentry)
- [ ] Configure analytics
- [ ] Test email notifications (if implemented)

### Performance Optimization

1. **Lighthouse Score Target: 90+**
   - Optimize images
   - Enable gzip compression
   - Minimize bundle size
   - Improve Core Web Vitals

2. **Content Delivery**
   - Enable CDN caching
   - Compress assets
   - Lazy load images

3. **Database Optimization**
   - Add Firestore indexes
   - Create MongoDB indexes
   - Monitor query performance

### Monitoring & Maintenance

1. **Set up monitoring**
   - Firebase Analytics
   - Error tracking (Sentry)
   - Performance monitoring

2. **Regular backups**
   - Enable MongoDB backups
   - Export Firestore data periodically

3. **Security updates**
   - Keep dependencies updated
   - Monitor Firebase security advisories
   - Review access logs

### Scaling for Growth

- Implement API rate limiting
- Add caching layer (Redis)
- Consider database sharding
- Implement CDN for media storage
- Add load balancing for backend

---

For production support, consult Vercel, Firebase, and MongoDB documentation.
