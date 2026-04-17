import { createContext, useContext } from "react";
import type { UserAuthContext } from "../../../core/models/Auth";

interface AuthContextType {
  user: UserAuthContext | null;
  login: (sub: string, email: string, name: string, access_token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
