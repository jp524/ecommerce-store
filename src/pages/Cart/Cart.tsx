import { useState, useEffect } from 'react';
import CartItem from './Components/CartItem/CartItem';
import CartItemProps from './Components/CartItem/CartItemProps';

const Cart = (props: {
  cartContent: CartItemProps[];
  cartSubtotal: number;
  onIncreaseQuantity: (cartItemId: string) => void;
  onDecreaseQuantity: (cartItemId: string) => void;
  onRemoveItem: (cartItemId: string) => void;
}) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  });

  const emptyCartView = <div className="empty-cart">The Cart is empty.</div>;

  const cartView = (
    <div className="cart">
      <div className="cart__main">
        <h3 className="cart__main__header">Your cart</h3>
        {props.cartContent.map((cartItem) => {
          return (
            <CartItem
              key={cartItem.cartItemId}
              cartItem={cartItem}
              increaseQuantityHandler={props.onIncreaseQuantity}
              decreaseQuantityHandler={props.onDecreaseQuantity}
              removeItemHandler={props.onRemoveItem}
            />
          );
        })}
      </div>
      <div className="cart__sidebar">
        <div className="cart__sidebar__summary">
          <p>Order Summary</p>
          <p>Subtotal: ${props.cartSubtotal}</p>
        </div>
        <br />
        <p>Taxes & Shipping calculated at checkout</p>
        <br />
        <button
          onClick={() => setShowMessage(true)}
          className="btn btn--primary"
        >
          Continue to checkout
        </button>
        {showMessage && (
          <p className="cart__sidebar__message">Browsing and cart demo only!</p>
        )}
      </div>
    </div>
  );
  return <div>{props.cartContent.length === 0 ? emptyCartView : cartView}</div>;
};
export default Cart;
