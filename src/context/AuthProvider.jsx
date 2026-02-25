import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext();
const googleProvider = GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const createUser = async (email, password, name) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
    }
    return result;
  };

  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    return await signOut(auth);
  };

  const googleLogin = async()=>{
    return await signInWithPopup(auth, googleProvider)
  }

  useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
      if(currentUser){
        try {
          setUser(currentUser);
        } catch (error) {
          setUser(null)
          console.error("Error setting user:", error);
        }
      }
    })
    return ()=> unSubscribe()
  },[])

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    logOut,
    googleLogin
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
