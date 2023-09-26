import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  UserCredential,
} from 'firebase/auth';
import { User } from 'firebase/auth';

interface AuthProviderProps {
  children: React.ReactNode;
}
interface AuthContextValue {
  currentUser: User | null | undefined;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  changePassword: (password: string) => Promise<void>;
  reAuthenticate: (password: string) => Promise<UserCredential>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>();

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function changePassword(password: string) {
    return updatePassword(currentUser, password);
  }
  async function reAuthenticate(password: string) {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password
    );
    // console.log(credential);
    const result = await reauthenticateWithCredential(currentUser, credential);
    return result;
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  //sets user to state when auth state changes (when a user logs in or logs out)
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user: User | null) => {
      setCurrentUser(user);
    });
    return unsubscribed;
  }, []);

  const value: AuthContextValue = {
    currentUser,
    signup,
    login,
    logOut,
    changePassword,
    reAuthenticate,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
