import { useEffect, useState } from "react";
import { getSuppliers } from "../services/api";

interface Supplier {
  id: string;
  name: string;
}

export function SuppliersList() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    getSuppliers()
      .then(res => setSuppliers(res.data))
      .catch(err => console.error("Error cargando proveedores:", err));
  }, []);

  const logos: Record<string, string> = {
    Claro: "/Claro_logo.svg",
    Movistar: "/movistar.png",
    Tigo: "/tigo.jpg",
    WOM: "",
  };

  return (
  <div className="card">
    <h2 className="text-xl font-semibold text-pink-700 mb-4">📡 Proveedores disponibles</h2>
    <div className="suppliers-container">
      {suppliers.length === 0 ? (
        <p className="text-gray-500">No hay proveedores disponibles</p>
      ) : (
        suppliers.map(s => (
          <img
            key={s.id}
            src={logos[s.name]}
            alt={s.name}
            className="h-16 cursor-pointer"
          />
        ))
      )}
    </div>
  </div>
);

}
