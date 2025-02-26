"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Text } from "react-native";
import * as SecureStore from "expo-secure-store";

interface User {
  id: number;
  user_id: number;
  name: string;
  email: string;
  tz: string;
}

// SecureStore Helper Functions
const getSecureStorage = async (key: string) => {
  const data = await SecureStore.getItemAsync(key);
  return data ? JSON.parse(data) : null;
};

const setSecureStorage = async (key: string, value: any) => {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
};

const removeSecureStorage = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};

// Create Context
const UserContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from SecureStore on mount
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getSecureStorage("user-details");
      if (storedUser) {
        setUser(storedUser);
      }
    };
    loadUser();
  }, []);

  // Persist user changes to SecureStore
  useEffect(() => {
    if (user) {
      setSecureStorage("user-details", user);
    } else {
      removeSecureStorage("user-details");
    }
  }, [user]);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
