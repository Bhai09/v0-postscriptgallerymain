import { create } from "zustand"
import type { User as FirebaseUser } from "firebase/auth"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth"
import { auth, db } from "@/config/firebase"
import { doc, setDoc, getDoc } from "firebase/firestore"
import type { User } from "@/types/firebase"

interface AuthStore {
  user: User | null
  firebaseUser: FirebaseUser | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, displayName: string) => Promise<void>
  logout: () => Promise<void>
  initialize: () => void
}

export const useFirebaseAuthStore = create<AuthStore>((set) => {
  // Set persistence to LOCAL so users stay logged in
  setPersistence(auth, browserLocalPersistence).catch((err) => console.error("Failed to set persistence:", err))

  return {
    user: null,
    firebaseUser: null,
    loading: true,
    error: null,

    login: async (email: string, password: string) => {
      try {
        set({ error: null })
        const result = await signInWithEmailAndPassword(auth, email, password)
        const userDoc = await getDoc(doc(db, "users", result.user.uid))
        const userData = userDoc.data() as User
        set({ firebaseUser: result.user, user: userData })
      } catch (error: any) {
        set({ error: error.message })
        throw error
      }
    },

    signup: async (email: string, password: string, displayName: string) => {
      try {
        set({ error: null })
        const result = await createUserWithEmailAndPassword(auth, email, password)

        // Update profile
        await updateProfile(result.user, { displayName })

        // Create user document in Firestore
        const userData: User = {
          uid: result.user.uid,
          email: result.user.email || "",
          displayName,
          photoURL: result.user.photoURL || undefined,
          bio: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        await setDoc(doc(db, "users", result.user.uid), userData)
        set({ firebaseUser: result.user, user: userData })
      } catch (error: any) {
        set({ error: error.message })
        throw error
      }
    },

    logout: async () => {
      try {
        await signOut(auth)
        set({ user: null, firebaseUser: null, error: null })
      } catch (error: any) {
        set({ error: error.message })
        throw error
      }
    },

    initialize: () => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          try {
            const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
            const userData = userDoc.data() as User
            set({ firebaseUser, user: userData, loading: false })
          } catch (error) {
            console.error("Error fetching user data:", error)
            set({ firebaseUser, user: null, loading: false })
          }
        } else {
          set({ firebaseUser: null, user: null, loading: false })
        }
      })

      return unsubscribe
    },
  }
})
