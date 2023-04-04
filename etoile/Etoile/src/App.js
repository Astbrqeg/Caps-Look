import React from "react";
import Home from './components/pages/Home/Home';
import ProductsPage from './components/pages/ProductsPage/Products';
import Login from './components/pages/Login/Login';
import SignUp from './components/pages/SignUp/Signup';
import Cart from './components/pages/cart/cart';
import Popup from './components/pages/PopUp/Popup';
import Makeup from "./components/pages/ProductsPage/Makeup";
import { Payment } from "./components/pages/Payment/Payment";
import SkinCare from "./components/pages/ProductsPage/SkinCare";
import Fragrance from "./components/pages/ProductsPage/Fragrance";
import BathBody from "./components/pages/ProductsPage/Bath&Body";
import ToolsBrushes from "./components/pages/ProductsPage/Tools&Brushes";
import Hair from "./components/pages/ProductsPage/Hair";
import Profile from "./components/pages/Login/Profile";
import Reviews from "./components/pages/ReviewPage/Reviews";
import ProductDetail from "./components/pages/ProductsPage/ProductDetail";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/Products" element={<ProductsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/Popup" element={<Popup />} />
          <Route path="/Makeup" element={<Makeup />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/SkinCare" element={<SkinCare />} />
          <Route path="/Fragrance" element={<Fragrance />} />
          <Route path="/Bath&Body" element={<BathBody />} />
          <Route path="/Tools&Brushes" element={<ToolsBrushes />} />
          <Route path="/Hair" element={<Hair />} />
          <Route path="/Profile" element={<Profile />}/>
          <Route path="/Reviews" element={<Reviews />}/>
          <Route path="/products/:id" element={<ProductDetail />}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
  
    }
    

export default App;