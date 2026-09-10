import { useState, useEffect } from "react";
import { buyRecharge, getSuppliers } from "../services/api";

interface Supplier {
  id: string;
  name: string;
}

interface BuyFormProps {
  onSuccess: () => void;
}

export function BuyForm({ onSuccess }: BuyFormProps) {
  const [form, setForm] = useState({
    cellPhone: "",
    value: 0,
    supplierId: "",
  });
  const [ticket, setTicket] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    getSuppliers()
      .then(res => setSuppliers(res.data))
      .catch(err => console.error("Error cargando proveedores:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSupplierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, supplierId: e.target.value });
  };

  const validateForm = () => {
    if (!/^[3]\d{9}$/.test(form.cellPhone))
      return "El número debe iniciar en 3 y tener 10 dígitos.";
    if (form.value < 1000 || form.value > 100000)
      return "El valor debe estar entre 1,000 y 100,000.";
    if (!form.supplierId) return "Debes seleccionar un proveedor.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    try {
      const { cellPhone, value, supplierId } = form;
      const res = await buyRecharge({ cellPhone, value, supplierId });

      console.log("Respuesta backend completa:", res.data);
      console.log("Transacción guardada:", res.data.savedTransaction);

      setTicket(res.data.savedTransaction); 
      onSuccess(); 
    } catch (err) {
      console.error("Error en la compra:", err);
      setError("No se pudo completar la recarga.");
    }
  };

  return (
    <div className="buy-box" id="buy">
      <h2>💳 Realizar recarga</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="cellPhone"
          placeholder="Número celular"
          value={form.cellPhone}
          onChange={handleChange}
          className="input"
        />
        <input
          name="value"
          type="number"
          placeholder="Valor"
          value={form.value}
          onChange={handleChange}
          className="input"
        />
        <select
          onChange={handleSupplierChange}
          className="input"
          value={form.supplierId}
        >
          <option value="">Selecciona proveedor</option>
          {suppliers.map(s => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <button type="submit" className="btn">Comprar</button>
      </form>

      {error && <p style={{ color: "#c62828", marginTop: "10px" }}>{error}</p>}

      {ticket && (
        <div className="card ticket" style={{ background: "#f9f9f9", marginTop: "20px", padding: "15px", border: "1px dashed #999", fontFamily: "monospace" }}>
          <h3 style={{ color: "#2e7d32" }}>🎟 Ticket de compra</h3>
          <p><strong>Proveedor:</strong> {ticket.supplierName}</p>
          <p><strong>Teléfono:</strong> {ticket.cellPhone}</p>
          <p><strong>Valor:</strong> ${ticket.value}</p>
          <p><strong>Estado:</strong> {ticket.status}</p>
          <p><strong>Fecha:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
          {ticket.transactionId && (
            <p><strong>ID Transacción:</strong> {ticket.transactionId}</p>
          )}
        </div>
      )}
    </div>
  );
}
