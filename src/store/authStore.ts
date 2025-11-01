import { create } from "zustand"
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth"
import { auth, db } from "@/config/firebase"
import { doc, getDoc } from "firebase/firestore"

interface User {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  bio: string
  createdAt: Date
  updatedAt: Date
}

interface AuthStore {
  user: User | null
  firebaseUser: FirebaseUser | null
  loading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  initialize: () => (() => void) | void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  firebaseUser: null,
  loading: true,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),

  initialize: () => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
          const userData = userDoc.data() as User
          set({ firebaseUser, user: userData || null, loading: false })
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
}))
