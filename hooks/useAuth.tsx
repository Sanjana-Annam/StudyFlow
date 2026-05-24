'use client';
// hooks/useAuth.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signInWithPopup, signOut as fbSignOut, onAuthStateChanged,
  updateProfile, sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { upsertUser } from '@/lib/db';

interface Ctx {
  user: User|null; loading: boolean;
  signInEmail(e:string,p:string):Promise<void>;
  signUpEmail(e:string,p:string,n:string):Promise<void>;
  signInGoogle():Promise<void>;
  signOut():Promise<void>;
  resetPassword(e:string):Promise<void>;
}
const AuthContext = createContext<Ctx|null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<User|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, async u => {
      setUser(u); setLoading(false);
      if (u) await upsertUser(u.uid, { uid: u.uid, email: u.email??'', displayName: u.displayName??'Student', photoURL: u.photoURL??undefined });
    });
  }, []);

  return (
    <AuthContext.Provider value={{
      user, loading,
      signInEmail: (e,p) => signInWithEmailAndPassword(auth,e,p).then(()=>{}),
      signUpEmail: async (e,p,n) => { const c = await createUserWithEmailAndPassword(auth,e,p); await updateProfile(c.user,{displayName:n}); },
      signInGoogle: () => signInWithPopup(auth, googleProvider).then(()=>{}),
      signOut: () => fbSignOut(auth),
      resetPassword: (e) => sendPasswordResetEmail(auth,e),
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth outside AuthProvider');
  return ctx;
}
