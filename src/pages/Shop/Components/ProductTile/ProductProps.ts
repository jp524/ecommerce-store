interface ProductProps {
  product: {
    id: number;
    category: string;
    name: string;
    price: number;
    sizes: string[];
    image_id: string;
  };
}

export default ProductProps;
