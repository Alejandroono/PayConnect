import { SuppliersList } from "./components/supplierList";
import { BuyForm } from "./components/buyForm";
import { TransactionsHistory } from "./components/transactionHistory";
import "./App.css";

function App() {
  return (
    <div style={{ padding: "20px", color: "#333" }}>
      <h1>🚀 Puntored Frontend</h1>
      <SuppliersList />
      <BuyForm />
      <TransactionsHistory />
    </div>
  );
}

export default App;
