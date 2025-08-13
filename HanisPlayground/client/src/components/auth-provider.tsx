import { ReactNode, createContext, useContext } from 'react';

interface AuthContextValue {
  user: null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue>({ user: null, isAuthenticated: false });

export function AuthProvider({ children }: { children: ReactNode }) {
  return <AuthContext.Provider value={{ user: null, isAuthenticated: false }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}