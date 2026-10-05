import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAxiosError } from "axios";
import { api } from "./api";
import { OrderList, type Order } from "./OrderList";

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    api.get<Order[]>("/orders", { signal: controller.signal })
      .then(r => setOrders(r.data))
      .catch(e => {
        if (controller.signal.aborted) return;                 // intentional cancel
        if (isAxiosError(e) && e.response?.status === 403) setError("You are not allowed to view orders.");
        else setError("Could not load orders.");
      });
    return () => controller.abort();                           // cleanup
  }, []);

  return (
    <main>
      <Link to="/">Home</Link>
      <h1>My orders</h1>
      {error && <p role="alert">{error}</p>}
      {!orders && !error && <p>Loading...</p>}
      {orders && <OrderList orders={orders} />}
    </main>
  );
}