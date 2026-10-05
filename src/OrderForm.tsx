import { useState } from "react";

type Props = { onCreate: (item: string, total: number) => Promise<void> };

export function OrderForm({ onCreate }: Props) {
  const [item, setItem] = useState("");
  const [total, setTotal] = useState("");
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();                                     // stop page reload
    const amount = Number(total);
    if (!item.trim()) return setErr("Item is required");
    if (!(amount > 0)) return setErr("Total must be positive");
    setErr("");
    setSaving(true);
    try {
      await onCreate(item.trim(), amount);
      setItem(""); setTotal("");
    } catch {
      setErr("Could not save order");
    } finally {
      setSaving(false);                                     // always re-enable
    }
  };

  return (
    <form onSubmit={submit}>
      <input value={item} onChange={e => setItem(e.target.value)} placeholder="Item" />
      <input value={total} onChange={e => setTotal(e.target.value)} placeholder="Total" />
      <button type="submit" disabled={saving}>{saving ? "Saving..." : "Add"}</button>
      {err && <p role="alert">{err}</p>}
    </form>
  );
}