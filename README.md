# 📡 Plataforma Puntored - Prueba Técnica

Este proyecto es una aplicación fullstack que integra un **frontend en React + Vite** y un **backend en NestJS** para simular el flujo de recargas con proveedores (Claro, Movistar, Tigo, WOM).

---

## 🚀 Funcionalidades

- **Login con JWT**: autenticación segura con tokens.
- **Listado de proveedores**: muestra los logos de los proveedores disponibles.
- **Formulario de compra (BuyForm)**: permite realizar recargas indicando número, valor y proveedor.
- **Historial de transacciones**: muestra las compras realizadas en tiempo real.
- **Navbar con logout**: cierre de sesión con botón estilizado.

---

## 🛠️ Tecnologías usadas

- **Frontend**: React, Vite, TypeScript, css.
- **Backend**: NestJS, Passport-JWT, Axios.
- **Base de datos / API externa**: MongoDB, integración con Puntored API.
- **Autenticación**: JWT con estrategia personalizada.

---

## ⚙️ Configuración de entorno

### Backend (`.env` en carpeta `server`)

Debes crear un archivo `.env` con las variables que se muestran en el .env.template



### Frontend (`.env` en carpeta `client`)

Debes crear un archivo `.env` con lo que se especifica en el .env.template


> ⚠️ Importante: en producción, nunca hardcodear claves. Usa `.env` o gestores de secretos.

---

## ▶️ Cómo correr el proyecto

1. **Clonar el repositorio**

   git clone <url-del-repo>

   Instalar dependencias

    Backend:

    cd server
    npm install
    npm run start:dev

    Frontend:

    cd client
    npm install
    npm run dev

    Abrir en navegador

    Frontend: http://localhost:5173

    Backend: http://localhost:3000

    # 📊 Flujo de la aplicación

    El usuario inicia sesión → se genera un JWT.

    Se redirige al inicio → se muestran Proveedores, BuyForm y Historial en la misma vista.

    Al realizar una compra → se refresca automáticamente el historial.

    El usuario puede cerrar sesión con el botón estilizado en el Navbar.
