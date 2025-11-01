# PostScript Gallery - Space Edition

A fully responsive, PWA-enabled cosmic gallery application built with React, TypeScript, Firebase, and MongoDB. Features a stunning space-themed design with gradient effects and seamless authentication.

## Features

### Core Functionality
- **User Authentication**: Firebase Email/Password authentication with persistent login
- **Gallery Management**: Create, organize, and manage photo galleries with full CRUD operations
- **Media Upload**: Support for images and videos with cloud storage
- **Social Features**: Follow system, likes, comments, and direct messaging
- **User Profiles**: Customizable profiles with galleries and statistics
- **Search & Discovery**: Explore and search through community galleries

### PWA Capabilities
- **Install as App**: Full installable PWA on mobile and desktop
- **Offline Support**: Service worker caches essential assets
- **Fast Loading**: Optimized caching strategies for images
- **App Shortcuts**: Quick access to create and explore features
- **Native Feel**: Standalone display mode like native apps

### Design System
- **Space Theme**: Cosmic dark palette with electric cyan, purple, and magenta accents
- **Responsive Design**: Mobile-first approach with breakpoints for all device sizes
- **Gradient Effects**: Beautiful aurora-inspired gradients throughout
- **Glass Morphism**: Modern glass effect for cards and overlays
- **Glow Effects**: Cyan, purple, and magenta glow effects for visual depth
- **Smooth Animations**: Framer Motion for polished transitions

### Tech Stack
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom space theme
- **Authentication**: Firebase Auth
- **Database**: 
  - Firestore (primary - user data, galleries, media)
  - MongoDB (secondary - image/video storage, advanced indexing)
- **State Management**: Zustand
- **Data Fetching**: React Query (SWR ready)
- **Build Tool**: Vite

## Project Structure

\`\`\`
postscript-gallery/
├── public/
│   ├── manifest.json          # PWA manifest with app metadata
│   └── pwa-*.png              # PWA icons (generate these)
├── src/
│   ├── config/
│   │   ├── firebase.ts        # Firebase initialization
│   │   └── mongodb.ts         # MongoDB connection config
│   ├── pages/
│   │   ├── Index.tsx          # Home page
│   │   ├── Auth.tsx           # Login/signup
│   │   ├── Explore.tsx        # Browse galleries
│   │   ├── Create.tsx         # Create new gallery
│   │   ├── Profile.tsx        # User profile
│   │   ├── Messages.tsx       # Direct messaging
│   │   └── NotFound.tsx       # 404 page
│   ├── components/
│   │   ├── ui/                # shadcn UI components
│   │   ├── layout/            # Layout components
│   │   └── PWAInstallButton.tsx
│   ├── store/
│   │   └── firebaseAuthStore.ts
│   ├── lib/
│   │   ├── db.ts              # Database utilities
│   │   ├── firebaseService.ts # Firestore operations
│   │   └── utils.ts           # Helper functions
│   ├── hooks/
│   │   ├── usePWAInstall.ts   # PWA install hook
│   │   └── use-toast.ts
│   ├── types/
│   │   └── firebase.ts        # TypeScript interfaces
│   ├── index.css              # Space-themed global styles
│   ├── main.tsx               # Entry point with PWA registration
│   └── App.tsx                # Main app component
├── scripts/
│   └── populate.js            # MongoDB data population script
├── vite.config.ts             # Vite config with PWA plugin
├── package.json
├── tsconfig.json
├── SETUP.md                   # Setup guide
└── README.md                  # This file
\`\`\`

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Firebase account (configured)
- MongoDB Atlas account

### Installation

1. **Clone the repository**
\`\`\`bash
git clone <repository-url>
cd postscript-gallery
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Set up environment variables**
\`\`\`bash
cp src/.env.example .env.local
# Edit .env.local with your credentials
\`\`\`

4. **Populate MongoDB with sample data** (optional)
\`\`\`bash
npm run populate
\`\`\`

5. **Start development server**
\`\`\`bash
npm run dev
\`\`\`

The app will be available at `http://localhost:8080`

### Building for Production

\`\`\`bash
npm run build
npm run preview  # Preview production build
\`\`\`

## Firebase Configuration

The app comes pre-configured with Firebase credentials:

\`\`\`typescript
{
  apiKey: "AIzaSyALl9ex48DzOV70kilbOf-Wz7F4uyZ9IRk",
  authDomain: "learnwebco.firebaseapp.com",
  projectId: "learnwebco",
  storageBucket: "learnwebco.firebasestorage.app",
  messagingSenderId: "248176448073",
  appId: "1:248176448073:web:fbfef9b316eaabb376e598"
}
\`\`\`

## MongoDB Schema

### Collections

**users**
\`\`\`javascript
{
  firebaseUid: String,
  email: String,
  displayName: String,
  bio: String,
  followers: Number,
  following: Number,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

**galleries**
\`\`\`javascript
{
  userId: String,
  title: String,
  description: String,
  isPublic: Boolean,
  mediaCount: Number,
  views: Number,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

**media**
\`\`\`javascript
{
  galleryId: String,
  userId: String,
  type: String,        // 'image' | 'video'
  url: String,
  title: String,
  tags: [String],
  likes: Number,
  views: Number,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

**comments**
\`\`\`javascript
{
  mediaId: String,
  userId: String,
  text: String,
  likes: Number,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

## PWA Features

### Installation
- Users can install the app from the browser menu or install prompt
- App appears as standalone application on home screen
- Works offline with cached content

### Caching Strategy
- Static assets: Cache first, validate on background
- Images from storage: Cache with 30-day expiration
- API responses: Stale-while-revalidate pattern

### App Shortcuts
- **Create Gallery**: Quick access to gallery creation
- **Explore**: Jump directly to explore page

## Authentication Flow

1. User visits and sees landing page
2. Clicks "Get Started" → Auth page
3. Can login or create account
4. Firebase creates user and stores in Firestore
5. User data synced to MongoDB via scripts
6. App stores session with persistent local storage
7. Protected routes check authentication state
8. Logout clears session and redirects to auth

## Customization

### Space Theme Colors
Edit `src/index.css` CSS variables:
- `--primary`: Cyan (180 100% 50%)
- `--secondary`: Purple (270 70% 40%)
- `--accent`: Magenta (300 100% 60%)

### Gradient Effects
- `--gradient-aurora`: Primary aurora gradient
- `--gradient-cosmic`: Background cosmic gradient
- `--gradient-nebula`: Subtle nebula background

### Responsive Breakpoints
- Mobile: 320px - 639px
- Tablet: 640px - 1023px
- Desktop: 1024px+

## API Integration (For Backend)

Implement these endpoints for production:

\`\`\`
POST   /api/users/sync           - Sync user to MongoDB
GET    /api/users/:id             - Get user profile
POST   /api/galleries             - Create gallery
GET    /api/galleries/:id         - Get gallery
POST   /api/media                 - Upload media
GET    /api/media/trending        - Get trending media
POST   /api/comments              - Add comment
GET    /api/search                - Search galleries/media
\`\`\`

## Performance Optimizations

1. **Image Optimization**
   - Use WebP format where supported
   - Lazy load gallery images
   - Compress before upload

2. **Caching**
   - Service worker caches assets for 30 days
   - Firestore queries with indexing
   - React Query for client-side caching

3. **Code Splitting**
   - Route-based code splitting
   - Dynamic imports for heavy components

## Troubleshooting

### Authentication Issues
- Verify Firebase credentials in `src/config/firebase.ts`
- Check Firebase Console for auth settings
- Clear browser storage and try again

### PWA Not Installing
- Ensure app served over HTTPS (except localhost)
- Check manifest.json is accessible
- Verify service worker loads in DevTools

### MongoDB Connection
- Test connection string in MongoDB Atlas
- Verify user permissions
- Check network access whitelist

### Performance Issues
- Check browser DevTools Network tab
- Review Firestore indexing
- Optimize image sizes

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Mostly supported (PWA limited)
- Mobile browsers: Full support

## Contributing

1. Create feature branch
2. Make changes with clear commits
3. Test on multiple devices
4. Submit pull request

## License

MIT License - feel free to use for personal or commercial projects

## Support

For issues or questions:
- Check SETUP.md for setup guide
- Review Firebase documentation
- Consult MongoDB guides
- Check browser console for errors

## Credits

Built with:
- React & TypeScript
- Firebase & Firestore
- MongoDB Atlas
- Tailwind CSS
- shadcn/ui components
- Vite build tool

---

**PostScript Gallery** - Share your cosmic creations across the universe
