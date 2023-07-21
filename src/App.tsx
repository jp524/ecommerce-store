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
import './styles/App.scss';

const App = () => {
  // const [cart, setCart] = useState<CartItemProps[]>([
  //   {
  //     cartItemId: uuidv4(),
  //     productId: 0,
  //     size: 'M',
  //     quantity: 2,
  //     unitPrice: 110,
  //   },
  // ]);
  const [cart, setCart] = useState<CartItemProps[]>([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);

  const getUnitPrice = (producId: number) => {
    const product = filterProductList(producId)!;
    return product.price;
  };

  const calculateCartSubtotal = () => {
    let subtotal = 0;
    let quantity = 0;
    cart.map((item) => {
      subtotal += item.quantity * item.unitPrice;
      quantity += item.quantity;
    });
    setCartSubtotal(subtotal);
    setCartQuantity(quantity);
  };

  useEffect(() => {
    calculateCartSubtotal();
  }, [cart]);

  const checkDuplicateCartItem = (productId: number, size: string) => {
    const cartItem = cart
      .filter(
        (cartItem) => cartItem.productId === productId && cartItem.size === size
      )
      .pop();
    if (cartItem !== undefined) {
      increaseQuantity(cartItem.cartItemId);
    } else {
      setCart((prevState) => [
        ...prevState,
        {
          cartItemId: uuidv4(),
          productId: productId,
          size: size,
          quantity: 1,
          unitPrice: getUnitPrice(productId),
        },
      ]);
    }
  };

  const addToCartHandler = (cartItem: { productId: number; size: string }) => {
    checkDuplicateCartItem(cartItem.productId, cartItem.size);
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
    <div className="container">
      <BrowserRouter>
        <Nav cartQuantity={cartQuantity} />
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
    </div>
  );
};

export default App;
