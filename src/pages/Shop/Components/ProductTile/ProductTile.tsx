import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import cloud from '../../../../utils/cloud';
import ProductProps from './ProductProps';
import './ProductTile.css';

const ProductTile = (props: ProductProps): JSX.Element => {
  const image = cloud.image(props.product.image_id);
  const transformedImage = image.resize(fill().width(300).aspectRatio('3:4'));

  return (
    <div className="product-tile">
      <AdvancedImage
        cldImg={transformedImage}
        className="product-tile__image"
      ></AdvancedImage>
      <div className="product-tile__description">
        <p>{props.product.name}</p>
        <p>${props.product.price}</p>
      </div>
    </div>
  );
};

export default ProductTile;
