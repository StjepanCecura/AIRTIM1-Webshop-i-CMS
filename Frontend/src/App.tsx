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

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<DefaultPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
