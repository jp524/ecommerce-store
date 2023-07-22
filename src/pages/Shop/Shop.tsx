import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductTile from './Components/ProductTile/ProductTile';
import productList from '../../utils/productList';

const Shop = () => {
  const [products, setProducts] = useState(productList);
  return (
    <div className="shop">
      {products.map((product) => (
        <Link key={product.id} to={`/shop/${product.id}`}>
          <ProductTile product={product} />
        </Link>
      ))}
    </div>
  );
};
export default Shop;
