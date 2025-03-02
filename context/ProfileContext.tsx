import React, { createContext, useState, useContext, PropsWithChildren } from 'react';

interface Profile {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    role: string;
    notificationsEnabled: boolean;
    mfaEnabled: boolean;
}

interface ProfileContextType {
  profile: Profile | null;
  setProfile: (value: Profile) => void;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export const ProfileProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null); 

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useItemContext must be used within an ItemProvider');
  }
  return context;
};
