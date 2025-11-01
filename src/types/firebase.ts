export interface User {
  uid: string
  email: string
  displayName?: string
  photoURL?: string
  bio?: string
  createdAt: Date
  updatedAt: Date
}

export interface Gallery {
  id: string
  userId: string
  title: string
  description: string
  thumbnail?: string
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

export interface MediaItem {
  id: string
  galleryId: string
  userId: string
  type: "image" | "video"
  url: string
  thumbnail?: string
  title: string
  description?: string
  tags: string[]
  likes: number
  views: number
  createdAt: Date
  updatedAt: Date
}

export interface Comment {
  id: string
  mediaId: string
  userId: string
  text: string
  createdAt: Date
  updatedAt: Date
}
