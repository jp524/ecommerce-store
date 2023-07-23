import { useState, useEffect } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import cloud from '../../../../utils/cloud';
import CartItemProps from './CartItemProps';
import filterProductList from '../../../../utils/filterProductList';

const CartItem = (props: {
  cartItem: CartItemProps;
  increaseQuantityHandler: (cartItemId: string) => void;
  decreaseQuantityHandler: (cartItemId: string) => void;
  removeItemHandler: (cartItemId: string) => void;
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
        <p>Size: {props.cartItem.size}</p>
        <div className="cart-item__quantity-toggle">
          <button
            onClick={() =>
              props.decreaseQuantityHandler(props.cartItem.cartItemId)
            }
            className="btn btn--light btn--small"
          >
            -
          </button>
          <p data-testid="quantity">{props.cartItem.quantity}</p>
          <button
            onClick={() =>
              props.increaseQuantityHandler(props.cartItem.cartItemId)
            }
            className="btn btn--light btn--small"
          >
            +
          </button>
        </div>
      </div>

      <div className="cart-item__description__right">
        <button
          onClick={() => props.removeItemHandler(props.cartItem.cartItemId)}
          className="btn btn--dark btn--small"
        >
          Remove
        </button>
        <p>${props.cartItem.quantity * props.cartItem.unitPrice}</p>
      </div>
    </div>
  );
};

export default CartItem;
