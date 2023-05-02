import { useState, useEffect } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import cloud from '../../../../utils/cloud';
import CartItemProps from './CartItemProps';
import filterProductList from '../../../../utils/filterProductList';
import './CartItem.css';

const CartItem = (props: CartItemProps): JSX.Element => {
  const [product, setProduct] = useState({
    id: 0,
    category: '',
    name: '',
    price: 110,
    sizes: [''],
    image_id: '',
  });

  useEffect(() => {
    setProduct(filterProductList(props.productId)!);
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
        <p>{props.size}</p>
        <div className="cart-item__quantity-toggle">
          <button>-</button>
          <p>{props.quantity}</p>
          <button>+</button>
        </div>
      </div>

      <div className="cart-item__description__right">
        <button>Remove</button>
        <p>${props.quantity * props.unitPrice}</p>
      </div>
    </div>
  );
};

export default CartItem;
