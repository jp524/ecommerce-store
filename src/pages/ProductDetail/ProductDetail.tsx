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
  const [quantity, setQuantity] = useState(0);

  const filterProductList = (id: number) => {
    const result = productList.filter((product) => product.id == id).shift();
    setProduct(result!);
  };

  useEffect(() => {
    filterProductList(Number(id));
  }, []);

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
          <select name="size">
            {product.sizes.map((sizeOption) => (
              <option value={sizeOption} key={sizeOption}>
                {sizeOption}
              </option>
            ))}
          </select>
          <div className="product-detail__quantity">
            <button>-</button>
            <input type="text" value={quantity} />
            <button>+</button>
          </div>
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
