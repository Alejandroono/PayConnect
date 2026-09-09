import { useState } from "react";
import { buyRecharge } from "../services/api";

export function BuyForm() {
  const [form, setForm] = useState({ userId: "u001", cellPhone: "", value: 0, supplierId: "" });
  const [ticket, setTicket] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await buyRecharge(form);
      setTicket(res.data);
    } catch (err) {
      console.error("Error en la compra:", err);
    }
  };

  return (
    <div>
      <h2>💳 Realizar recarga</h2>
      <form onSubmit={handleSubmit}>
        <input name="cellPhone" placeholder="Número celular" onChange={handleChange} />
        <input name="value" type="number" placeholder="Valor" onChange={handleChange} />
        <input name="supplierId" placeholder="Proveedor ID" onChange={handleChange} />
        <button type="submit">Comprar</button>
      </form>

      {ticket && (
        <div>
          <h3>🎟 Ticket de compra</h3>
          <pre>{JSON.stringify(ticket, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
