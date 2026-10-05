import {
  createContext, useContext, useState, useEffect, useMemo, useCallback,
  type ReactNode,
} from "react";
import { api } from "./api";

export type User = { name: string; roles: string[] };

type AuthState = {
  user: User | null;
  ready: boolean;
  isAuthenticated: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(async () => {
    try { setUser((await api.get<User>("/me")).data); }
    catch { setUser(null); }
    finally { setReady(true); }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const logout = useCallback(async () => {
    await api.post("/auth/logout");
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, ready, isAuthenticated: !!user, refresh, logout }),
    [user, ready, refresh, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}