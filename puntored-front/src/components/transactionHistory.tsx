import { useEffect, useState } from "react";
import { getTransactions } from "../services/api";

interface Transaction {
  supplierId: string;
  supplierName: string;
  cellPhone: string;
  value: number;
  status: string;
  createdAt: string;
  transactionId?: string;
}

export function TransactionsHistory({ refreshKey }: { refreshKey: number }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    getTransactions()
      .then(res => {
        console.log("Transacciones recibidas:", res.data);
        setTransactions(res.data);
      })
      .catch(err => console.error("Error cargando histórico:", err));
  }, [refreshKey]);

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-pink-700 mb-4">📊 Histórico de transacciones</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Proveedor</th>
              <th>Teléfono</th>
              <th>Valor</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>ID Transacción</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i}>
                <td>{t.supplierName} <span style={{ color: "#777" }}>(ID: {t.supplierId})</span></td>
                <td>{t.cellPhone}</td>
                <td style={{ color: "#e91e63", fontWeight: "bold" }}>${t.value}</td>
                <td>
                  <span className={t.status === "success" ? "badge-success" : "badge-error"}>
                    {t.status}
                  </span>
                </td>
                <td>{new Date(t.createdAt).toLocaleString()}</td>
                <td>{t.transactionId ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
