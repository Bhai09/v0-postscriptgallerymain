import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyALl9ex48DzOV70kilbOf-Wz7F4uyZ9IRk",
  authDomain: "learnwebco.firebaseapp.com",
  projectId: "learnwebco",
  storageBucket: "learnwebco.firebasestorage.app",
  messagingSenderId: "248176448073",
  appId: "1:248176448073:web:fbfef9b316eaabb376e598",
  measurementId: "G-Y82NZN3Y3V",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
