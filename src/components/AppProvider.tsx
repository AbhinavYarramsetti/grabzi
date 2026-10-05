
'use client';

import { createContext, useContext, useState, ReactNode, useMemo, useEffect, useCallback } from 'react';
import type { UserProfile } from '@/lib/types';
import { useUser, useFirestore } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useDoc } from '@/firebase/firestore/use-doc';

interface AppContextType {
  user: UserProfile | null;
  isUserLoading: boolean;
  location: { latitude: number; longitude: number; name?: string } | null;
  setLocation: (location: { latitude: number; longitude: number; name?: string } | null) => void;
  showLocationModal: boolean;
  setShowLocationModal: (show: boolean) => void;
  updateUserLocation: (location: { latitude: number, longitude: number, name?: string}) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { user: authUser, isUserLoading: isAuthLoading } = useUser();
  const firestore = useFirestore();
  
  const [location, setLocation] = useState<{ latitude: number; longitude: number; name?: string } | null>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const userProfileRef = useMemo(() => {
    if (firestore && authUser) {
      return doc(firestore, 'users', authUser.uid);
    }
    return null;
  }, [firestore, authUser]);
  
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  useEffect(() => {
    // When user profile loads, set their location from Firestore if it exists
    if (userProfile?.location) {
      setLocation(userProfile.location);
    }
  }, [userProfile]);

  const updateUserLocation = useCallback(async (newLocation: { latitude: number, longitude: number, name?: string}) => {
    setLocation(newLocation);
    if (userProfileRef) {
      try {
        await setDoc(userProfileRef, { location: newLocation }, { merge: true });
      } catch (error) {
        console.error("Failed to update user location in Firestore:", error);
      }
    }
  }, [userProfileRef]);

  const value = useMemo(() => ({ 
      user: userProfile, 
      isUserLoading: isAuthLoading || isProfileLoading,
      location,
      setLocation,
      showLocationModal,
      setShowLocationModal,
      updateUserLocation
  }), [userProfile, isAuthLoading, isProfileLoading, location, showLocationModal, updateUserLocation]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
