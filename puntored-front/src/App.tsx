import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginForm } from "./components/loginForm";
import { SuppliersList } from "./components/supplierList";
import { BuyForm } from "./components/buyForm";
import { TransactionsHistory } from "./components/transactionHistory";
import { Navbar } from "./components/navbar";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [refreshKey, setRefreshKey] = useState(0);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName"); 
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      {loggedIn && <Navbar onLogout={handleLogout} />}
      {!loggedIn ? (
        <Routes>
          <Route
            path="/"
            element={<LoginForm onLogin={() => setLoggedIn(true)} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <div className="main-container">
          <SuppliersList />
          <BuyForm onSuccess={() => setRefreshKey(prev => prev + 1)} />
          <TransactionsHistory refreshKey={refreshKey} />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
