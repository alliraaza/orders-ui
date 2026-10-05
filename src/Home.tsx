import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function Home() {
  const { user, logout } = useAuth();
  return (
    <main>
      <h1>Welcome, {user?.name}</h1>
      <nav>
        <Link to="/orders">View my orders</Link>
      </nav>
      <button onClick={logout}>Sign out</button>
    </main>
  );
}