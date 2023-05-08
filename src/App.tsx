import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Cart from './pages/Cart/Cart';
import IdGuard from './components/IdGuard/IdGuard';
import filterProductList from './utils/filterProductList';
import CartItemProps from './pages/Cart/Components/CartItem/CartItemProps';

const App = () => {
  const [cart, setCart] = useState<CartItemProps[]>([
    { productId: 0, size: 'M', quantity: 2, unitPrice: 110 },
  ]);
  const [cartSubtotal, setCartSubtotal] = useState(0);

  const getUnitPrice = (producId: number) => {
    const product = filterProductList(producId)!;
    return product.price;
  };

  const calculateCartSubtotal = () => {
    let subtotal = 0;
    cart.map((item) => {
      subtotal += item.quantity * item.unitPrice;
    });
    setCartSubtotal(subtotal);
  };

  useEffect(() => {
    calculateCartSubtotal();
  }, [cart]);

  const addToCartHandler = (cartItem: { productId: number; size: string }) => {
    setCart((prevState) => [
      ...prevState,
      {
        productId: cartItem.productId,
        size: cartItem.size,
        quantity: 1,
        unitPrice: getUnitPrice(cartItem.productId),
      },
    ]);
  };

  const increaseQuantity = (productId: number) => {
    setCart(
      cart.map((cartItem) =>
        cartItem.productId === productId
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem
      )
    );
  };

  const itemQuantityIsOne = (productId: number) => {
    const cartItem = cart
      .filter((cartItem) => cartItem.productId === productId)
      .pop();
    if (cartItem?.quantity === 1) {
      return true;
    } else {
      return false;
    }
  };

  const decreaseQuantity = (productId: number) => {
    if (itemQuantityIsOne(productId) === true) {
      console.log('call function to delete item');
    } else {
      setCart(
        cart.map((cartItem) =>
          cartItem.productId === productId
            ? {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              }
            : cartItem
        )
      );
    }
  };

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route
          path="/shop/:id"
          element={<IdGuard onAddToCart={addToCartHandler} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartContent={cart}
              cartSubtotal={cartSubtotal}
              onIncreaseQuantity={increaseQuantity}
              onDecreaseQuantity={decreaseQuantity}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
