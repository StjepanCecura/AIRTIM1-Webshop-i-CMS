import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import axios from "axios"
import { removeLoginStatus } from "./services/lsLoginStatus.tsx"
import { CartProvider } from "./services/CartContext.tsx"

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.withCredentials = true
    return config
  },
  function (error) {
    // Do something with request error
    console.log("axios interceptor error", error)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (v) => {
    return v
  },
  function (error) {
    // Do something with request error
    if (error.response.status === 403) {
      removeLoginStatus()
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="min-h-screen flex flex-col">
    <CartProvider>
      <App />
    </CartProvider>
  </div>
)
