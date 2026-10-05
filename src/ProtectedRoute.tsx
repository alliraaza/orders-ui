import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

type Props = {
  roles?: string[];
  children: ReactElement;
};

export function ProtectedRoute({ roles, children }: Props) {
  const { user, ready, isAuthenticated } = useAuth();

  if (!ready) return <p>Loading...</p>;                       // wait for /api/me before deciding
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && !roles.some(r => user!.roles.includes(r))) {
    return <Navigate to="/forbidden" replace />;
  }
  return children;
}