/**
 * MongoDB Data Population Script
 * This script creates sample data in MongoDB for development
 * Run with: npm run populate
 */

const mongoose = require("mongoose")

const MONGODB_URI = "mongodb+srv://cyberdev2810_db_user:O2ZvmzF8oHhQ8jg9@cluster0.jwaumpy.mongodb.net/?appName=Cluster0"
const DB_NAME = "postscript_gallery"

// Define Schemas
const userSchema = new mongoose.Schema({
  firebaseUid: String,
  email: String,
  displayName: String,
  photoURL: String,
  bio: String,
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
  totalLikes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const gallerySchema = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  thumbnail: String,
  isPublic: { type: Boolean, default: true },
  mediaCount: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const mediaSchema = new mongoose.Schema({
  galleryId: String,
  userId: String,
  type: { type: String, enum: ["image", "video"], default: "image" },
  url: String,
  thumbnail: String,
  title: String,
  description: String,
  tags: [String],
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const commentSchema = new mongoose.Schema({
  mediaId: String,
  userId: String,
  userDisplayName: String,
  userPhotoURL: String,
  text: String,
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const likeSchema = new mongoose.Schema({
  mediaId: String,
  userId: String,
  createdAt: { type: Date, default: Date.now },
})

// Sample data generators
const sampleUsers = [
  {
    firebaseUid: "user_001",
    email: "alex@example.com",
    displayName: "Alex Chen",
    bio: "Photography & Digital Art enthusiast",
    followers: 450,
    following: 230,
    totalLikes: 2300,
  },
  {
    firebaseUid: "user_002",
    email: "sophia@example.com",
    displayName: "Sophia Rivera",
    bio: "Creative Director | Space Lover 🌌",
    followers: 890,
    following: 340,
    totalLikes: 5600,
  },
  {
    firebaseUid: "user_003",
    email: "james@example.com",
    displayName: "James Wilson",
    bio: "Videographer & Content Creator",
    followers: 320,
    following: 180,
    totalLikes: 1800,
  },
]

const sampleGalleries = [
  {
    userId: "user_001",
    title: "Cosmic Landscapes",
    description: "Collection of breathtaking space-inspired photography",
    isPublic: true,
    mediaCount: 12,
    views: 2340,
  },
  {
    userId: "user_002",
    title: "Aurora Dreams",
    description: "Digital art exploring the beauty of the aurora borealis",
    isPublic: true,
    mediaCount: 8,
    views: 5600,
  },
  {
    userId: "user_003",
    title: "Tech Tomorrow",
    description: "Futuristic video compilations and motion graphics",
    isPublic: true,
    mediaCount: 15,
    views: 8900,
  },
]

const sampleMedia = [
  {
    galleryId: "gallery_001",
    userId: "user_001",
    type: "image",
    title: "Nebula Explorer",
    description: "A stunning view of the cosmic nebula",
    tags: ["space", "nebula", "cosmic", "astronomy"],
    likes: 234,
    views: 1240,
    comments: 45,
  },
  {
    galleryId: "gallery_001",
    userId: "user_001",
    type: "image",
    title: "Aurora Magic",
    description: "Captured the moment when lights danced across the sky",
    tags: ["aurora", "nature", "space", "photography"],
    likes: 456,
    views: 2100,
    comments: 78,
  },
  {
    galleryId: "gallery_002",
    userId: "user_002",
    type: "image",
    title: "Digital Cosmos",
    description: "Digital art interpretation of outer space",
    tags: ["digital", "art", "space", "cosmic"],
    likes: 890,
    views: 5200,
    comments: 156,
  },
  {
    galleryId: "gallery_003",
    userId: "user_003",
    type: "video",
    title: "Space Travel Simulation",
    description: "Futuristic video of a journey through space",
    tags: ["video", "space", "futuristic", "tech"],
    likes: 567,
    views: 3400,
    comments: 89,
  },
]

const sampleComments = [
  {
    mediaId: "media_001",
    userId: "user_002",
    userDisplayName: "Sophia Rivera",
    text: "This is absolutely breathtaking! The composition is incredible.",
    likes: 23,
  },
  {
    mediaId: "media_001",
    userId: "user_003",
    userDisplayName: "James Wilson",
    text: "How did you capture this? Amazing work!",
    likes: 15,
  },
  {
    mediaId: "media_002",
    userId: "user_001",
    userDisplayName: "Alex Chen",
    text: "Nature never ceases to amaze me. Great shot!",
    likes: 34,
  },
]

async function populateDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log("✓ Connected to MongoDB")

    // Get models
    const User = mongoose.model("User", userSchema)
    const Gallery = mongoose.model("Gallery", gallerySchema)
    const Media = mongoose.model("Media", mediaSchema)
    const Comment = mongoose.model("Comment", commentSchema)
    const Like = mongoose.model("Like", likeSchema)

    // Clear existing data
    console.log("Clearing existing data...")
    await User.deleteMany({})
    await Gallery.deleteMany({})
    await Media.deleteMany({})
    await Comment.deleteMany({})
    await Like.deleteMany({})

    // Insert sample data
    console.log("Inserting sample users...")
    const users = await User.insertMany(sampleUsers)
    console.log(`✓ Inserted ${users.length} users`)

    console.log("Inserting sample galleries...")
    const galleries = await Gallery.insertMany(
      sampleGalleries.map((g, i) => ({
        ...g,
        userId: sampleUsers[i].firebaseUid,
      })),
    )
    console.log(`✓ Inserted ${galleries.length} galleries`)

    console.log("Inserting sample media...")
    const media = await Media.insertMany(
      sampleMedia.map((m, i) => ({
        ...m,
        galleryId: galleries[Math.floor(i / 2)]._id.toString(),
      })),
    )
    console.log(`✓ Inserted ${media.length} media items`)

    console.log("Inserting sample comments...")
    const comments = await Comment.insertMany(
      sampleComments.map((c, i) => ({
        ...c,
        mediaId: media[i % media.length]._id.toString(),
      })),
    )
    console.log(`✓ Inserted ${comments.length} comments`)

    console.log("\n✓ Database population completed successfully!")
    console.log("\nSummary:")
    console.log(`- Users: ${users.length}`)
    console.log(`- Galleries: ${galleries.length}`)
    console.log(`- Media Items: ${media.length}`)
    console.log(`- Comments: ${comments.length}`)

    await mongoose.connection.close()
  } catch (error) {
    console.error("Error populating database:", error)
    process.exit(1)
  }
}

populateDatabase()
