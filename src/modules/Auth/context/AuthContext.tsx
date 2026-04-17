import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./UseAuthContext";
import type { UserAuthContext } from "../../../core/models/Auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserAuthContext | null>(null);

  const login = (
    sub: string,
    email: string,
    name: string,
    access_token: string,
  ) => {
    setUser({
      sub: sub,
      email: email,
      name: name,
      access_token,
    });
    localStorage.setItem("access_token", access_token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
