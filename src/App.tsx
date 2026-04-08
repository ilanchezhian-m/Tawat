import { Routes, Route } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/cart"
import Checkout from "./pages/checkout"
import './App.css'

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </CartProvider>
  )
}

export default App
