import { useEffect, useState } from "react";
import { getTransactions } from "../services/api";

export function TransactionsHistory() {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    getTransactions("u001")
      .then(res => setTransactions(res.data))
      .catch(err => console.error("Error cargando histórico:", err));
  }, []);

  return (
    <div>
      <h2>📊 Histórico de transacciones</h2>
      <ul>
        {transactions.map((t, i) => (
          <li key={i}>
            {t.supplierName} - {t.cellPhone} - ${t.value} - {t.status} - {new Date(t.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
