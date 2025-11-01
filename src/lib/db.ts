/**
 * Database utilities for Firestore and MongoDB operations
 * This file handles data synchronization between Firebase and MongoDB
 */

import { db } from "@/config/firebase"
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  orderBy,
  limit,
  type QueryConstraint,
} from "firebase/firestore"

// API base URL for MongoDB operations (set in production)
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api"

/**
 * Fetch user profile with aggregated stats
 */
export const getUserProfile = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId))
    if (!userDoc.exists()) return null

    return {
      id: userDoc.id,
      ...userDoc.data(),
    }
  } catch (error) {
    console.error("Error fetching user profile:", error)
    throw error
  }
}

/**
 * Get all media for a user with pagination
 */
export const getUserMediaList = async (userId: string, pageSize = 20, lastDoc?: any) => {
  try {
    const constraints: QueryConstraint[] = [
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(pageSize),
    ]

    // Use pagination if lastDoc provided
    if (lastDoc) {
      constraints.push(lastDoc)
    }

    const q = query(collection(db, "media"), ...constraints)
    const snapshot = await getDocs(q)

    return {
      items: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      lastDoc: snapshot.docs[snapshot.docs.length - 1],
    }
  } catch (error) {
    console.error("Error fetching user media:", error)
    throw error
  }
}

/**
 * Get trending media across all users
 */
export const getTrendingMedia = async (pageSize = 12) => {
  try {
    const q = query(collection(db, "media"), where("likes", ">", 0), orderBy("likes", "desc"), limit(pageSize))

    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error fetching trending media:", error)
    throw error
  }
}

/**
 * Sync user data between Firebase and MongoDB
 * Call this after user creates account or updates profile
 */
export const syncUserToMongoDB = async (userId: string, userData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firebaseUid: userId,
        ...userData,
      }),
    })

    if (!response.ok) throw new Error("Failed to sync user data")
    return await response.json()
  } catch (error) {
    console.error("Error syncing user to MongoDB:", error)
    throw error
  }
}

/**
 * Sync media item to MongoDB for additional indexing
 */
export const syncMediaToMongoDB = async (mediaData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/media/sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mediaData),
    })

    if (!response.ok) throw new Error("Failed to sync media")
    return await response.json()
  } catch (error) {
    console.error("Error syncing media to MongoDB:", error)
    throw error
  }
}
