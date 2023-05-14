import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Nav from './components/Nav/Nav';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Cart from './pages/Cart/Cart';
import IdGuard from './components/IdGuard/IdGuard';
import filterProductList from './utils/filterProductList';
import CartItemProps from './pages/Cart/Components/CartItem/CartItemProps';

const App = () => {
  const [cart, setCart] = useState<CartItemProps[]>([
    {
      cartItemId: uuidv4(),
      productId: 0,
      size: 'M',
      quantity: 2,
      unitPrice: 110,
    },
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
        cartItemId: uuidv4(),
        productId: cartItem.productId,
        size: cartItem.size,
        quantity: 1,
        unitPrice: getUnitPrice(cartItem.productId),
      },
    ]);
  };

  const increaseQuantity = (cartItemId: string) => {
    setCart(
      cart.map((cartItem) =>
        cartItem.cartItemId === cartItemId
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem
      )
    );
  };

  const itemQuantityIsOne = (cartItemId: string) => {
    const cartItem = cart
      .filter((cartItem) => cartItem.cartItemId === cartItemId)
      .pop();
    if (cartItem?.quantity === 1) {
      return true;
    } else {
      return false;
    }
  };

  const decreaseQuantity = (cartItemId: string) => {
    if (itemQuantityIsOne(cartItemId) === true) {
      removeItem(cartItemId);
    } else {
      setCart(
        cart.map((cartItem) =>
          cartItem.cartItemId === cartItemId
            ? {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              }
            : cartItem
        )
      );
    }
  };

  const removeItem = (cartItemId: string) => {
    setCart(cart.filter((cartItem) => cartItem.cartItemId !== cartItemId));
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
              onRemoveItem={removeItem}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
