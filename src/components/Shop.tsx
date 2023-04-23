import React, { useState } from 'react';
import ProductTile from './ProductTile';
import productList from '../utils/productList';

const Shop = () => {
  const [products, setProducts] = useState(productList);
  return (
    <div className="shop">
      <h1>This is the Shop component.</h1>
      {products.map((product) => (
        <ProductTile product={product} />
      ))}
    </div>
  );
};
export default Shop;
