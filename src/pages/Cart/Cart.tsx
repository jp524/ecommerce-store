import CartItem from './Components/CartItem/CartItem';
import CartItemProps from './Components/CartItem/CartItemProps';
import './Cart.css';

const Cart = (props: {
  cartContent: CartItemProps[];
  cartSubtotal: number;
  onIncreaseQuantity: (cartItemId: string) => void;
  onDecreaseQuantity: (cartItemId: string) => void;
  onRemoveItem: (cartItemId: string) => void;
}) => {
  const emptyCartView = <div className="empty-cart">The Cart is empty.</div>;

  const cartView = (
    <div className="cart">
      <div className="cart__main">
        <h3>Your cart</h3>
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
        <p>Order Summary</p>
        <p>Subtotal: ${props.cartSubtotal}</p>
        <p>Taxes & Shipping calculated at checkout</p>
        <button>Continue to checkout</button>
      </div>
    </div>
  );
  return <div>{props.cartContent.length === 0 ? emptyCartView : cartView}</div>;
};
export default Cart;
