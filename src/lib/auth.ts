import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth"
import { auth, db } from "@/config/firebase"
import { doc, setDoc } from "firebase/firestore"

export interface AuthState {
  user: any | null
  session: any | null
  loading: boolean
}

export const signUp = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, { displayName })

    // Store user data in Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      uid: userCredential.user.uid,
      email,
      displayName,
      photoURL: null,
      bio: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return { data: userCredential, error: null }
  } catch (error: any) {
    return { data: null, error }
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { data: userCredential, error: null }
  } catch (error: any) {
    return { data: null, error }
  }
}

export const signOut = async () => {
  try {
    await firebaseSignOut(auth)
    return { error: null }
  } catch (error: any) {
    return { error }
  }
}

export const getCurrentUser = async () => {
  return { user: auth.currentUser, error: null }
}

export const getSession = async () => {
  return { session: auth.currentUser ? { user: auth.currentUser } : null, error: null }
}
