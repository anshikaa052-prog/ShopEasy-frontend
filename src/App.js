import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import AddProduct from './pages/AddProduct';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

export const CartContext = createContext();
export const UserContext = createContext();

function App() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || []
  );

  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo')) || null
  );

  const [shippingAddress, setShippingAddress] = useState(
    JSON.parse(localStorage.getItem('shippingAddress')) || {}
  );
  
  const [paymentMethod, setPaymentMethod] = useState(
    localStorage.getItem('paymentMethod') || ''
  );

  return (
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      <CartContext.Provider value={{ 
        cartItems, setCartItems,
        shippingAddress, setShippingAddress,
        paymentMethod, setPaymentMethod
      }}>
        <BrowserRouter>
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/products" element={<Products />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path='/order/:id' element={<OrderScreen />} />
            </Routes>
          </>
        </BrowserRouter>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;