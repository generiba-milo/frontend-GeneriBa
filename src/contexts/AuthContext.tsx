// Authentication Context
// Manages user authentication state across the app
// Supports Firebase auth, wallet auth, demo mode, and guest mode (no credentials needed)

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User as FirebaseUser,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider, hasFirebaseConfig } from '@/config/firebase';
import { authService } from '@/services/auth.service';
import { setAuthToken, removeAuthToken } from '@/services/api';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { handleSubmit } from '@/pages/api';

// User type
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  isGuest?: boolean; // Flag for guest mode access
  walletAddress?: string | null; // Linked Solana wallet
}

// Auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  linkWallet: (walletAddress: string) => Promise<void>;
  isAuthenticated: boolean;
  isGuestMode: boolean; // Indicates if running without Firebase credentials
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isGuestMode] = useState<boolean>(!hasFirebaseConfig);

  // Initialize auth state listener
  useEffect(() => {
    // If Firebase is not configured, create a guest user immediately
    if (!hasFirebaseConfig) {
      console.log('🔓 Guest mode enabled - No Firebase configuration found');

      setLoading(false);
      return;
    }

    // Normal Firebase auth flow
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // User is signed in
        try {
          const token = await firebaseUser.getIdToken();

          // Store token
          setAuthToken(token);

          // Send to backend to create/update user
          try {
            await authService.login({ firebaseToken: token });
          } catch (err) {
            console.error('Backend login failed:', err);
          }

          // Set user state
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            emailVerified: firebaseUser.emailVerified,
            isGuest: false
          });


          const main2 = await handleSubmit("sql", {
            "query": "SELECT * FROM users WHERE email = ?",
            "params": [firebaseUser.email]
          });


          if (main2.rows.length == 0) {
            const main = await handleSubmit("sql", {
              "query": "INSERT INTO users (token, email) VALUES (?, ?)",
              "params": [token, firebaseUser.email]
            });
            console.log(main)
            localStorage.setItem("id",main2.rows.insertId)

          }else{
            localStorage.setItem("id",main2.rows[0].id)
          }

        } catch (err) {
          console.error('Auth state error:', err);
          setError('Failed to authenticate');
        }
      } else {
        // User is signed out
        setUser(null);
        removeAuthToken();
      }

      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Sign in with Google
  const signInWithGoogle = async (): Promise<void> => {
    if (!hasFirebaseConfig) {
      setError('Google sign-in is not available in guest mode. Please configure Firebase credentials.');
      throw new Error('Firebase not configured');
    }

    try {
      setError(null);
      setLoading(true);

      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      // Store token
      setAuthToken(token);

      // Send to backend
      // await authService.login({ firebaseToken: token });

      // User state will be updated by onAuthStateChanged listener
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      setError(err.message || 'Failed to sign in with Google');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async (): Promise<void> => {
    if (!hasFirebaseConfig) {
      // In guest mode, just show message
      console.log('Already in guest mode');
      return;
    }

    try {
      setError(null);
      setLoading(true);

      // Sign out from backend
      // await authService.logout();

      // Sign out from Firebase
      await firebaseSignOut(auth);

      // Remove token
      removeAuthToken();

      // User state will be updated by onAuthStateChanged listener
    } catch (err: any) {
      console.error('Sign out error:', err);
      setError(err.message || 'Failed to sign out');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Link Solana wallet to user account (saves to Firestore)
  const linkWallet = async (walletAddress: string): Promise<void> => {
    if (!user) {
      throw new Error('No user logged in');
    }

    if (!hasFirebaseConfig) {
      console.log('Wallet linking skipped in guest mode');
      // Update local user state only
      setUser({ ...user, walletAddress });
      return;
    }

    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid);

      // Get existing user data
      const userDoc = await getDoc(userRef);
      const existingData = userDoc.exists() ? userDoc.data() : {};

      // Update with wallet address
      await setDoc(userRef, {
        ...existingData,
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        walletAddress,
        updatedAt: new Date().toISOString(),
      }, { merge: true });

      // Update local user state
      setUser({ ...user, walletAddress });

      console.log('✅ Wallet linked to Firebase user:', walletAddress);
    } catch (err: any) {
      console.error('Wallet linking error:', err);
      throw new Error('Failed to link wallet: ' + err.message);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    signInWithGoogle,
    signOut,
    linkWallet,
    isAuthenticated: !!user,
    isGuestMode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
