import React, { createContext, useContext, useState, ReactNode } from "react";
import { IUserGet } from "../Interfaces/IUser";

interface UserContextType {
  user: IUserGet | null;
  setUser: (userData: IUserGet) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUserGet | null>(null);

  const login = (userData: IUserGet) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, setUser: login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("userContext must be used within a UserProvider!");
  }
  return context;
};
