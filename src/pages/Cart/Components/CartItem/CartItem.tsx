import { useState, useEffect } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import cloud from '../../../../utils/cloud';
import CartItemProps from './CartItemProps';
import filterProductList from '../../../../utils/filterProductList';
import './CartItem.css';

const CartItem = (props: {
  cartItem: CartItemProps;
  increaseQuantityHandler: (propertyId: number) => void;
  decreaseQuantityHandler: (propertyId: number) => void;
}): JSX.Element => {
  const [product, setProduct] = useState({
    id: 0,
    category: '',
    name: '',
    price: 110,
    sizes: [''],
    image_id: '',
  });

  useEffect(() => {
    setProduct(filterProductList(props.cartItem.productId)!);
  }, []);

  const image = cloud.image(product.image_id);
  const transformedImage = image.resize(fill().width(100).aspectRatio('3:4'));

  return (
    <div className="cart-item">
      <AdvancedImage
        cldImg={transformedImage}
        className="cart-item__image"
      ></AdvancedImage>

      <div className="cart-item__description__left">
        <p>{product.name}</p>
        <p>{props.cartItem.size}</p>
        <div className="cart-item__quantity-toggle">
          <button
            onClick={() =>
              props.decreaseQuantityHandler(props.cartItem.productId)
            }
          >
            -
          </button>
          <p data-testid="quantity">{props.cartItem.quantity}</p>
          <button
            onClick={() =>
              props.increaseQuantityHandler(props.cartItem.productId)
            }
          >
            +
          </button>
        </div>
      </div>

      <div className="cart-item__description__right">
        <button>Remove</button>
        <p>${props.cartItem.quantity * props.cartItem.unitPrice}</p>
      </div>
    </div>
  );
};

export default CartItem;
