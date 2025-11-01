import {
  collection,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"
import { db } from "@/config/firebase"
import type { Gallery, MediaItem, Comment } from "@/types/firebase"

// Gallery Operations
export const createGallery = async (userId: string, galleryData: Omit<Gallery, "id" | "createdAt" | "updatedAt">) => {
  try {
    const docRef = await addDoc(collection(db, "galleries"), {
      ...galleryData,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return { id: docRef.id, ...galleryData }
  } catch (error) {
    console.error("Error creating gallery:", error)
    throw error
  }
}

export const getGalleries = async (userId: string) => {
  try {
    const q = query(collection(db, "galleries"), where("userId", "==", userId), orderBy("createdAt", "desc"))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Gallery)
  } catch (error) {
    console.error("Error fetching galleries:", error)
    throw error
  }
}

export const updateGallery = async (galleryId: string, updates: Partial<Gallery>) => {
  try {
    await updateDoc(doc(db, "galleries", galleryId), {
      ...updates,
      updatedAt: new Date(),
    })
  } catch (error) {
    console.error("Error updating gallery:", error)
    throw error
  }
}

export const deleteGallery = async (galleryId: string) => {
  try {
    await deleteDoc(doc(db, "galleries", galleryId))
  } catch (error) {
    console.error("Error deleting gallery:", error)
    throw error
  }
}

// Media Operations
export const addMediaItem = async (mediaData: Omit<MediaItem, "id" | "createdAt" | "updatedAt">) => {
  try {
    const docRef = await addDoc(collection(db, "media"), {
      ...mediaData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return { id: docRef.id, ...mediaData }
  } catch (error) {
    console.error("Error adding media:", error)
    throw error
  }
}

export const getGalleryMedia = async (galleryId: string) => {
  try {
    const q = query(collection(db, "media"), where("galleryId", "==", galleryId), orderBy("createdAt", "desc"))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as MediaItem)
  } catch (error) {
    console.error("Error fetching media:", error)
    throw error
  }
}

export const getUserMedia = async (userId: string, limit_count = 20) => {
  try {
    const q = query(
      collection(db, "media"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(limit_count),
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as MediaItem)
  } catch (error) {
    console.error("Error fetching user media:", error)
    throw error
  }
}

export const updateMediaItem = async (mediaId: string, updates: Partial<MediaItem>) => {
  try {
    await updateDoc(doc(db, "media", mediaId), {
      ...updates,
      updatedAt: new Date(),
    })
  } catch (error) {
    console.error("Error updating media:", error)
    throw error
  }
}

// Comments Operations
export const addComment = async (commentData: Omit<Comment, "id" | "createdAt" | "updatedAt">) => {
  try {
    const docRef = await addDoc(collection(db, "comments"), {
      ...commentData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return { id: docRef.id, ...commentData }
  } catch (error) {
    console.error("Error adding comment:", error)
    throw error
  }
}

export const getMediaComments = async (mediaId: string) => {
  try {
    const q = query(collection(db, "comments"), where("mediaId", "==", mediaId), orderBy("createdAt", "desc"))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Comment)
  } catch (error) {
    console.error("Error fetching comments:", error)
    throw error
  }
}
