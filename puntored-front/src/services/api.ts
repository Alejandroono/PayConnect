import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getSuppliers = () => api.get("/puntored/suppliers");
export const buyRecharge = (data: { cellPhone: string; value: number; supplierId: string; supplierName?: string }) =>
  api.post("/transactions/buy", data);
export const getTransactions = () => api.get("/transactions");

export const register = (data: { username: string; password: string }) =>
  api.post("/auth/register", data);

export const login = (data: { username: string; password: string }) =>
  api.post("/auth/login", data);
