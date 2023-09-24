import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

// interface Value{
//     currentUser:any;
//     signup: (email:string, password:string)=>void;
//     login:(email:string, password:string)=>void;
// }
const AuthContext = React.createContext("Default Value");

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children })  {
  const [currentUser, setCurrentUser] = useState();

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email:string, password:string) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  

  //sets user to state when auth state changes (when a user logs in or logs out)
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribed;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
