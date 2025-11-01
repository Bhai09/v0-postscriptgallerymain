# PostScript Gallery - Space Edition

## Setup Instructions

### Prerequisites
- Node.js 18+
- Firebase Account
- MongoDB Account
- Modern web browser with PWA support

### Firebase Setup

The Firebase credentials are already configured in the project:
- **Project ID**: learnwebco
- **Auth Domain**: learnwebco.firebaseapp.com
- **Storage Bucket**: learnwebco.firebasestorage.app

### MongoDB Setup

The MongoDB connection is configured for data population and advanced queries:
- **Connection String**: `mongodb+srv://cyberdev2810_db_user:O2ZvmzF8oHhQ8jg9@cluster0.jwaumpy.mongodb.net/?appName=Cluster0`
- **Database Name**: postscript_gallery

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create environment file:
\`\`\`bash
cp src/.env.example .env.local
\`\`\`

3. Populate MongoDB with sample data:
\`\`\`bash
npm run populate
\`\`\`

4. Start development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open browser to `http://localhost:8080`

### Building for Production

\`\`\`bash
npm run build
\`\`\`

### Deploying as PWA

The app is configured as a Progressive Web App (PWA). Users can:
1. Click "Install App" button on supported browsers
2. Add to home screen on mobile devices
3. Use offline (with cached assets)

### Project Structure

\`\`\`
src/
├── config/              # Firebase & MongoDB configuration
├── pages/              # Route pages (responsive)
├── components/         # UI components
├── store/              # Zustand state management
├── lib/                # Utilities & database helpers
├── hooks/              # Custom React hooks
├── types/              # TypeScript interfaces
└── index.css           # Space-themed global styles

scripts/
└── populate.js         # MongoDB data population script

public/
└── manifest.json       # PWA manifest
\`\`\`

### Features

#### Authentication
- Firebase Email/Password auth
- Persistent login with local storage
- Protected routes

#### Gallery Management
- Create and manage galleries
- Upload media (images/videos stored in MongoDB)
- Organize by tags
- Public/private galleries

#### Social Features
- Follow system
- Likes and comments
- Direct messaging
- User profiles

#### Design System
- Space-themed cosmic UI
- Responsive mobile-first design
- Smooth animations
- Glass morphism effects
- Gradient text and buttons

#### PWA Features
- Install as app
- Offline support with service worker
- Fast loading with caching
- Native app-like experience

### API Endpoints (Backend required)

For production deployment, implement these endpoints:

**Users**
- `POST /api/users/sync` - Sync user from Firebase to MongoDB
- `GET /api/users/:id` - Get user profile

**Media**
- `POST /api/media/sync` - Sync media from Firebase to MongoDB
- `GET /api/media/trending` - Get trending media
- `GET /api/media/search` - Search media

**Comments**
- `POST /api/comments` - Add comment
- `GET /api/comments/:mediaId` - Get media comments

### Customization

#### Colors & Theme
Edit `src/index.css` to customize:
- Primary colors (cyan, purple, magenta)
- Gradient effects
- Glow effects

#### Space Background
The cosmic gradient background is defined in `index.css`. Modify the `--gradient-cosmic` variable for different space vibes.

#### Typography
Update font families in `src/components/layout/MainLayout.tsx` and Tailwind config.

### Troubleshooting

**Firebase Auth Issues**
- Verify credentials in `src/config/firebase.ts`
- Check Firebase Console for authentication settings
- Ensure CORS is configured for your domain

**MongoDB Connection**
- Test connection string in MongoDB Atlas
- Verify user permissions
- Check network access in MongoDB security settings

**PWA Not Installing**
- Ensure served over HTTPS (except localhost)
- Check manifest.json is accessible
- Verify service worker loads correctly

### Performance Tips

1. **Images**
   - Use WebP format where possible
   - Optimize image sizes before upload
   - Consider lazy loading for galleries

2. **Caching**
   - Service worker caches images for 30 days
   - Update cache version in vite.config.ts

3. **Database**
   - Add indexes to frequently queried fields
   - Consider pagination for large datasets

### Support

For issues or questions:
1. Check existing GitHub issues
2. Review Firebase documentation
3. Consult MongoDB connection guide

---

Built with React, TypeScript, Firebase, MongoDB, and Tailwind CSS ✨
