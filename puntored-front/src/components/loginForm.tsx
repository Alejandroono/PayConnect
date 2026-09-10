import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { login, register } from "../services/api";
import "./../login.css";

export function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Debes llenar usuario y contraseña");
      return;
    }
    try {
      console.log("Login con:", form);
      const res = await login(form);
      localStorage.setItem("token", res.data.access_token);
      setError(null);
      onLogin();
      navigate("/"); 
    } catch (err: any) {
      console.error("Error login:", err);
      setError("Credenciales inválidas");
    }
  };

  const handleRegister = async () => {
    if (!form.username || !form.password) {
      setError("Debes llenar usuario y contraseña");
      return;
    }
    try {
      console.log("Registro con:", form);
      await register(form);
      alert("Usuario registrado, ahora inicia sesión");
      setError(null);
    } catch (err: any) {
      console.error("Error registro:", err);
      if (err.response?.data?.message?.includes("duplicate key")) {
        setError("Ese usuario ya existe, prueba otro nombre");
      } else {
        setError("No se pudo registrar");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>🔐 Login</h2>
        <form onSubmit={handleLogin}>
          <input
            name="username"
            placeholder="Usuario"
            value={form.username}
            onChange={handleChange}
            className="login-input"
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="login-input"
          />
          <button type="submit" className="login-btn">Ingresar</button>
        </form>
        <button onClick={handleRegister} className="register-btn">Registrar</button>
        {error && <p className="error-msg">{error}</p>}
      </div>
    </div>
  );
}
