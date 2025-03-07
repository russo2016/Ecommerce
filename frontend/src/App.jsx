import './App.css'
import ProductList from './components/ProductList/ProductList.jsx'
import Login from './components/Login/Login.jsx'
import Cart from './components/Cart/Cart.jsx'
import ForgotPassword from './components/ForgotPassword/ForgotPassword.jsx'
import NewPassword from './components/NewPassword/NewPassword.jsx'
import Ticket from './components/Ticket/Ticket.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/forgotPassword/:email" element={<NewPassword />} />
        <Route path="/ticket/:cid" element={<Ticket />} />
      </Routes>
    </Router>
  )
}
export default App
