import { useState, useEffect } from "react";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { UserProfile } from "./types";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import Features from "./components/Features";
import Pricing from "./components/Pricing";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        } else {
          // Create new profile
          const newProfile: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || "",
            displayName: firebaseUser.displayName || "User",
            role: 'user',
            createdAt: new Date().toISOString()
          };
          await setDoc(docRef, newProfile);
          setProfile(newProfile);
        }
        setView('dashboard');
      } else {
        setProfile(null);
        setView('landing');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const scrollToSection = (id: string) => {
    if (view !== 'landing') {
      setView('landing');
      // Wait for re-render
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark selection:bg-brand-primary/30">
      <Navbar 
        user={user}
        onDashboardClick={() => setView('dashboard')} 
        onLandingClick={() => setView('landing')}
        onFeaturesClick={() => scrollToSection('features')}
        onPricingClick={() => scrollToSection('pricing')}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      <main>
        {view === 'landing' ? (
          <>
            <Hero onGetStarted={user ? () => setView('dashboard') : handleLogin} />
            <Features />
            <Pricing />
          </>
        ) : (
          <Dashboard user={user} profile={profile} />
        )}
      </main>
      
      {/* Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/30 text-sm">
            © 2026 poxpatatoAI Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
