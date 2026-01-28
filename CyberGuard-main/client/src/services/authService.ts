// src/services/authService.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "../firebase"

const signup = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const signin = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Make logout async and return signOut promise
const logout = async () => {
  return await signOut(auth);
};

// Get current user synchronously
const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Wrapper for Firebase auth state listener
const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

const authService = {
  signup,
  signin,
  logout,
  getCurrentUser,
  onAuthChange,
};

export default authService;
