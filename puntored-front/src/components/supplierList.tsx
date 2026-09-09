import { useEffect, useState } from "react";
import { getSuppliers } from "../services/api";

export function SuppliersList() {
  const [suppliers, setSuppliers] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    getSuppliers()
      .then(res => setSuppliers(res.data))
      .catch(err => console.error("Error cargando proveedores:", err));
  }, []);

  return (
    <div>
      <h2>📡 Proveedores disponibles</h2>
      <ul>
        {suppliers.map(s => (
          <li key={s.id}>{s.name} (ID: {s.id})</li>
        ))}
      </ul>
    </div>
  );
}
