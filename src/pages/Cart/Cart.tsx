import CartItem from './Components/CartItem/CartItem';
import CartItemProps from './Components/CartItem/CartItemProps';
import './Cart.css';

const Cart = (props: {
  cartContent: CartItemProps[];
  cartSubtotal: number;
}) => {
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
              unitPrice={cartItem.unitPrice}
            />
          );
        })}
      </div>
      <div className="cart__sidebar">
        <p>Order Summary</p>
        <p>Subtotal: ${props.cartSubtotal}</p>
        <p>Taxes & Shipping calculated at checkout</p>
        <button>Continue to checkout</button>
      </div>
    </div>
  );
};
export default Cart;
