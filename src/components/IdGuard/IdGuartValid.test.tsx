import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Params } from 'react-router-dom';
import IdGuard from './IdGuard';

describe('IdGuard', () => {
  it('shows the ProductDetail component when a valid id is passed', () => {
    vi.mock('react-router-dom', () => ({
      useParams: (): Readonly<Params<string>> => ({ id: '0' }),
    }));

    const addToCartMock = vi.fn();
    render(<IdGuard onAddToCart={addToCartMock} />);
    expect(screen.getByRole('img')).toBeVisible();
    expect(screen.getByText('Green Summer Dress')).toBeVisible();
    expect(screen.getByText(/110/)).toBeVisible();
    expect(screen.getByText('Sizes')).toBeVisible();
  });
});
