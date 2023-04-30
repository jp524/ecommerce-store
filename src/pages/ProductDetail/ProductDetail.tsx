import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productList from '../../utils/productList';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import cloud from '../../utils/cloud';
import './ProductDetail.css';

const ProductDetail = () => {
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

  const filterProductList = (id: number) => {
    const result = productList.filter((product) => product.id == id).shift();
    setProduct(result!);
  };

  useEffect(() => {
    filterProductList(Number(id));
  }, []);

  useEffect(() => {
    setSize(product.sizes[0]);
  }, [product]);

  const sizeHandler = (e: { target: { value: string } }) => {
    setSize(e.target.value);
  };

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
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
