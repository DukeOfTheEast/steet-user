import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/app/firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch additional user details
        const userDoc = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userDoc);
        const userData = userSnapshot.data();

        setCurrentUser({
          ...user,
          inputValue: userData?.inputValue || "Default UserName", // Ensure this is set correctly
          businessName: userData?.businessName || null,
          role: userData?.role || null,
          fullName: userData?.fullName || null,
          selectedState: userData?.selectedState || null,
          selectedFashion: userData?.selectedFashion || null,
          bookmarks: userData?.bookmarks || [],
        });
        setLoading(false);
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const signup = async (
    email,
    password,
    role,
    fullName,
    businessName = null,
    selectedState = null,
    selectedFashion = null
  ) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      role: role,
      fullName: fullName,
      createdAt: new Date(),
      ...(businessName && { businessName: businessName }),
      ...(selectedState && { selectedState: selectedState }),
      ...(selectedFashion && { selectedFashion: selectedFashion }),
      bookmarks: [],
    });

    setCurrentUser(user);
    return user;
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    setCurrentUser(userCredential.user);
    return userCredential.user;
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
