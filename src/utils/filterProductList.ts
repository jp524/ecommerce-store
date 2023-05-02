import productList from './productList';

const filterProductList = (id: number) => {
  const result = productList.filter((product) => product.id == id).shift();
  return result;
};

export default filterProductList;
