import React, { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";


export const authContext = createContext(null);


const auth = getAuth(app);
export default function AuthProviders({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

    //for create User-------
    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    //for SignIn ----------
    const signIn = (email , password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    //for LogOut-------
    const logOut = ()=>{
        setLoading(true)
        return signOut(auth);
    }



    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser);
            console.log('current user',currentUser)
            setLoading(false);
        });
        return ()=>{
            return unsubscribe();
        }
    },[])

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut
  };
  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
}
