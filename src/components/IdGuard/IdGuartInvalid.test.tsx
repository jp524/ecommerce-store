import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Params } from 'react-router-dom';
import IdGuard from './IdGuard';

describe('IdGuard', () => {
  it('shows the Error component when an incorrect id is passed', () => {
    vi.mock('react-router-dom', () => ({
      useParams: (): Readonly<Params<string>> => ({ id: 'abc' }),
    }));

    const addToCartMock = vi.fn();
    render(<IdGuard onAddToCart={addToCartMock} />);
    expect(screen.getByText(/This item doesn't exist/)).toBeVisible();
  });
});
