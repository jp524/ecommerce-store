import { Link } from 'react-router-dom';
import '../styles/nav.css';

const Nav = () => {
  return (
    <nav>
      <Link to="/shop">
        <p>Shop</p>
      </Link>
      <Link to="/">
        <p>Home</p>
      </Link>
      <Link to="/cart">
        <p>Cart</p>
      </Link>
    </nav>
  );
};
export default Nav;
