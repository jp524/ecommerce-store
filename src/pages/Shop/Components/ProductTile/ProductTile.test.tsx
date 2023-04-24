import { render, screen } from '@testing-library/react';
import ProductTile from './ProductTile';

describe('ProductTile', () => {
  it('renders product name', () => {
    const product = {
      id: 0,
      category: 'dresses',
      name: 'Green Summer Dress',
      price: 110,
      sizes: ['S', 'M', 'L'],
      image_id: 'ecommerce-store/zq4lzfasfde5g8cjh0m6.jpg',
    };

    render(<ProductTile product={product} />);

    expect(screen.getByRole('img')).toBeVisible();
    expect(screen.getByText('Green Summer Dress')).toBeVisible();
    expect(screen.getByText(/110/)).toBeVisible();
  });
});
