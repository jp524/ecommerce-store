import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import cloud from '../../utils/cloud';
import filterProductList from '../../utils/filterProductList';
import './ProductDetail.css';

interface Props {
  onAddToCart: (cartItem: { productId: number; size: string }) => void;
}

const ProductDetail = (props: Props) => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    id: 0,
    category: '',
    name: '',
    price: 0,
    sizes: [''],
    image_id: '',
  });
  const [size, setSize] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setProduct(filterProductList(Number(id))!);
  }, []);

  useEffect(() => {
    setSize(product.sizes[0]);
  }, [product]);

  const sizeHandler = (e: { target: { value: string } }) => {
    setSize(e.target.value);
  };

  const addToCart = () => {
    const cartItem = { productId: product.id, size: size };
    props.onAddToCart(cartItem);
    setShowMessage(true);
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  });

  const image = cloud.image(product.image_id);
  const transformedImage = image.resize(fill().width(300).aspectRatio('3:4'));

  return (
    <div className="product-detail">
      <AdvancedImage
        cldImg={transformedImage}
        className="product-detail__image"
      ></AdvancedImage>
      <div className="product-detail__sidebar">
        <div className="product-detail__description">
          <p>{product.name}</p>
          <p>${product.price}</p>
        </div>

        <div className="product-detail__variables">
          <label>Sizes</label>
          <select
            name="size"
            value={size}
            onChange={sizeHandler}
            data-testid="select"
          >
            {product.sizes.map((sizeOption) => (
              <option value={sizeOption} key={sizeOption}>
                {sizeOption}
              </option>
            ))}
          </select>
          <button onClick={addToCart}>Add to Cart</button>
          {showMessage && (
            <p className="product-detail__cart-message">Added to Cart</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
