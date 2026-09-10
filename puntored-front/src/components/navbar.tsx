export function Navbar({ onLogout }: { onLogout: () => void }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  return (
    <nav className="navbar">
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <h1>Puntored</h1>
        <button onClick={handleLogout} className="logout-btn">
  Cerrar sesión
</button>

      </div>
    </nav>
  );
}
