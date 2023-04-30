import CartItem from './Components/CartItem/CartItem';
import './Cart.css';

interface Props {
  cartContent: { productId: number; size: string; quantity: number }[];
}

const Cart = (props: Props) => {
  return (
    <div className="cart">
      <div className="cart__main">
        <h3>Your cart</h3>
        {props.cartContent.map((cartItem, index) => {
          return (
            <CartItem
              key={index}
              productId={cartItem.productId}
              size={cartItem.size}
              quantity={cartItem.quantity}
            />
          );
        })}
      </div>
      <div className="cart__sidebar">
        <p>Order Summary</p>
        <p>Subtotal: cartSubtotal</p>
        <p>Taxes & Shipping calculated at checkout</p>
        <button>Continue to checkout</button>
      </div>
    </div>
  );
};
export default Cart;
