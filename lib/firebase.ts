import { initializeApp } from "firebase/app";
import {
  User,
  UserInfo,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSEGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const authState = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);

export const EmailRegister = async (
  name: string,
  email: string,
  password: string
) => {
  if (!email || !password) return;
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(result.user, { displayName: name });
  return result;
};

export const emailLogin = async (email: string, password: string) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser = async () => await signOut(auth);

const db = getFirestore();
export const createUserDoc = async (
  userAuth: UserInfo | any,
  additional?: {}
) => {
  const userDocRef = doc(db, "user", userAuth.uid);
  const userSnap = await getDoc(userDocRef);
  if (!userSnap.exists()) {
    const { displayName, email } = userAuth;
    const date = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        date,
        ...additional,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return userDocRef;
};
