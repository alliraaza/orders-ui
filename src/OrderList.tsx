export type Order = { id: number; item: string; total: number };

type Props = { orders: Order[] };

export function OrderList({ orders }: Props) {
  if (orders.length === 0) return <p>No orders yet.</p>;   // empty state
  return (
    <ul>
      {orders.map(o => (
        <li key={o.id}>{o.item}: {o.total}</li>             // stable key
      ))}
    </ul>
  );
}