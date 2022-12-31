import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/FIrebase.config";
const auth = getAuth(app);
export const authContext = createContext();

const Contexts = ({ children }) => {
    const [user, setUser]  = useState('')
    const [loading, setLoading] = useState(true)


  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) =>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = () =>{
    setLoading(true)
    return signOut(auth)
  }

  useEffect(()=>{
    const unsubscrive = onAuthStateChanged(auth, currentUser =>{
        setUser(currentUser)
        setLoading(false)
    })
    return () => unsubscrive()
  }, [])

  return (
    <authContext.Provider value={{ createUser, loading, logOut, signInUser, user }}>
      {children}
    </authContext.Provider>
  );
};

export default Contexts;
