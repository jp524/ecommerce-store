import { Link } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';

interface Props {
  cartQuantity: number;
}

const Nav = (props: Props) => {
  return (
    <nav className="nav">
      <Link to="/shop">
        <p>Shop</p>
      </Link>
      <Link to="/">
        <p>Home</p>
      </Link>
      <div>
        <Link to="/cart" className="nav__cart">
          <FaCartShopping size={22} />
          <p className="nav__cart__quantity">{props.cartQuantity}</p>
        </Link>
      </div>
    </nav>
  );
};
export default Nav;
