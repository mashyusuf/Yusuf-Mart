import React, { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";


export const authContext = createContext(null);


const auth = getAuth(app);
export default function AuthProviders({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const googleprovider = new GoogleAuthProvider();

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
    //Google Provider ----
    const googleSignIn = ()=>{
      setLoading(true);
      return signInWithPopup(auth , googleprovider);
    }



    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser);
            if(currentUser){
              const userInfo = {email:currentUser.email};
              axiosPublic.post('/jwt', userInfo)
              .then(res =>{
                if(res.data.token){
                  localStorage.setItem('access-token', res.data.token);
                }
              })
            }
            else{
              localStorage.removeItem('access-token');
            }
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
    logOut,
    googleSignIn
  };
  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
}
