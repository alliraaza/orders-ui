import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "./api";
import { useAuth } from "./AuthContext";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const { refresh } = useAuth();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr("");
    try {
      // URLSearchParams makes Axios send application/x-www-form-urlencoded
      await api.post("/auth/login", new URLSearchParams({ username, password }));
      await refresh();                       // load user from /me
      navigate("/", { replace: true });
    } catch {
      setErr("Invalid username or password");   // generic message, never reveal which field
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <input value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
      <button disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>
      {err && <p role="alert">{err}</p>}
    </form>
  );
}