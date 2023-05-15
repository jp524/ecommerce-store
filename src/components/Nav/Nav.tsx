import { Link } from 'react-router-dom';
import './Nav.css';

interface Props {
  cartQuantity: number;
}

const Nav = (props: Props) => {
  return (
    <nav>
      <Link to="/shop">
        <p>Shop</p>
      </Link>
      <Link to="/">
        <p>Home</p>
      </Link>
      <div className="nav--cart">
        <Link to="/cart">
          <p>Cart</p>
        </Link>
        <p>{props.cartQuantity}</p>
      </div>
    </nav>
  );
};
export default Nav;
