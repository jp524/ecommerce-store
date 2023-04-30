import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productList from '../../utils/productList';
import ProductDetail from '../../pages/ProductDetail/ProductDetail';
import Error from '../../pages/Error/Error';

interface Props {
  onAddToCart: (cartItem: { productId: number; size: string }) => void;
}

const IdGuard = (props: Props) => {
  const { id } = useParams();
  const [validId, setValidId] = useState(false);

  const checkValidId = () => {
    if (productList.filter((product) => product.id == Number(id)).length > 0) {
      setValidId(true);
    }
  };

  const addToCartHandler = (cartItem: { productId: number; size: string }) => {
    props.onAddToCart(cartItem);
  };

  useEffect(() => {
    checkValidId();
  }, []);

  return (
    <>
      {validId ? <ProductDetail onAddToCart={addToCartHandler} /> : <Error />}
    </>
  );
};

export default IdGuard;
