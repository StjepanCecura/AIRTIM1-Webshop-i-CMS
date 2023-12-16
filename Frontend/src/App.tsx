import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Register from "./pages/Register"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Home from "./pages/Home"
import EmailVerification from "./pages/EmailVerification"
import Login from "./pages/Login"
import Navbar from "./layouts/Navbar"
import Profile from "./pages/Profile"
import DefaultPage from "./pages/DefaultPage"
import Product from "./pages/Product"
import ShoppingCart from "./pages/ShoppingCart"
import Order from "./pages/Order"

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Page without category. Eg. Info page. */}
          <Route path="/:slug" element={<DefaultPage />} />
          {/* Page with category. Eg. Black Friday, Sneakers page. */}
          <Route path="/c/:slug" element={<DefaultPage />} />
          <Route path="/p/:productKey/:variantKey" element={<Product />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order" element={<Order />} />

          <Route
            path="/email-verification/:id"
            element={<EmailVerification />}
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </>
  )
}

export default App
