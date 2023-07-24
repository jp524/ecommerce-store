import { render, screen } from '@testing-library/react';
import ProductDetail from './ProductDetail';
import { vi } from 'vitest';
import { Params } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('ProductDetail', () => {
  beforeEach(() => {
    vi.mock('react-router-dom', () => ({
      useParams: (): Readonly<Params<string>> => ({ id: '0' }),
    }));

    const addToCartMock = vi.fn();
    render(<ProductDetail onAddToCart={addToCartMock} />);
  });

  it('renders product name when given valid url params', () => {
    expect(screen.getByRole('img')).toBeVisible();
    expect(screen.getByText('Green Summer Dress')).toBeVisible();
    expect(screen.getByText(/110/)).toBeVisible();
    expect(screen.getByText('Sizes')).toBeVisible();
  });

  it('changes the size when selecting from options', async () => {
    const dropdown = screen.getByRole('combobox') as HTMLSelectElement;
    expect(dropdown.value).toBe('S');

    const user = userEvent.setup();
    await user.selectOptions(dropdown, ['M']);
    // @ts-ignore
    expect(screen.getByRole('option', { name: 'S' }).selected).toBe(false);
    // @ts-ignore
    expect(screen.getByRole('option', { name: 'M' }).selected).toBe(true);
    // @ts-ignore
    expect(screen.getByRole('option', { name: 'L' }).selected).toBe(false);
  });
});

describe('ProductDetailMock', () => {
  it('calls onAddToCart with the correct arguments', async () => {
    vi.mock('react-router-dom', () => ({
      useParams: (): Readonly<Params<string>> => ({ id: '0' }),
    }));
    const addToCartMock = vi.fn();
    render(<ProductDetail onAddToCart={addToCartMock} />);

    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'Add to Cart' });
    await user.click(button);

    expect(addToCartMock).toHaveBeenCalledWith({ productId: 0, size: 'S' });
  });
});
