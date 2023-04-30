import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';

const App = () => {
  const [cart, setCart] = useState<
    { productId: number; size: string; quantity: number }[]
  >([]);

  const addToCartHandler = (cartItem: { productId: number; size: string }) => {
    setCart((prevState) => [
      ...prevState,
      {
        productId: cartItem.productId,
        size: cartItem.size,
        quantity: 1,
      },
    ]);
  };

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route
          path="/shop/:id"
          element={<ProductDetail onAddToCart={addToCartHandler} />}
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
