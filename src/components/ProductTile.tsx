import React from 'react';
import ProductProps from '../interfaces/ProductProps';

const ProductTile = (props: ProductProps): JSX.Element => {
  return <div className="product-tile">{props.product.name}</div>;
};

export default ProductTile;
