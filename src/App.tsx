import { Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { Home } from "./Home";
import { OrdersPage } from "./OrdersPage";
import { ProtectedRoute } from "./ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute roles={["ROLE_USER"]}><OrdersPage /></ProtectedRoute>} />
      <Route path="/forbidden" element={<p>Access denied</p>} />
    </Routes>
  );
}