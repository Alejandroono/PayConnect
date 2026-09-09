import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: VITE_API_URL,
});

export const getSuppliers = () => api.get("/puntored/suppliers");
export const buyRecharge = (data: { userId: string; cellPhone: string; value: number; supplierId: string }) =>
  api.post("/puntored/buy", data);
export const getTransactions = (userId: string) => api.get(`/transactions/${userId}`);
