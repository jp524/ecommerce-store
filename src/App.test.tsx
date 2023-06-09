import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { beforeAll } from 'vitest';

describe('App', () => {
  beforeAll(async () => {
    render(<App />);
    expect(screen.getByText('This is the Home component.')).toBeVisible();

    const user = userEvent.setup();
    const cartLink = screen.getByRole('link', { name: 'Cart' });
    await user.click(cartLink);
    expect(screen.getByText('Your cart')).toBeVisible();
    expect(screen.getByText('Green Summer Dress')).toBeVisible();
    expect(screen.getByTestId('quantity')).toHaveTextContent('2');
  });

  it('increases item quantity in Cart', async () => {
    const user = userEvent.setup();
    const plusButton = screen.getByRole('button', { name: '+' });
    await user.click(plusButton);
    expect(screen.getByTestId('quantity')).toHaveTextContent('3');
  });

  it('increases item quantity in Cart through ProductDetail page', async () => {
    render(<App />);
    const user = userEvent.setup();

    const shopLink = screen.getByRole('link', { name: 'Shop' });
    await user.click(shopLink);

    const productLink = screen.getByRole('link', {
      name: 'Green Summer Dress $110',
    });
    await user.click(productLink);
    const dropdown = screen.getByRole('combobox') as HTMLSelectElement;
    await user.selectOptions(dropdown, ['M']);

    const addToCartButton = screen.getByRole('button', { name: 'Add to Cart' });
    await user.click(addToCartButton);

    const cartLink = screen.getByRole('link', { name: 'Cart' });
    await user.click(cartLink);
    expect(screen.getByTestId('quantity')).toHaveTextContent('3');
  });

  it('decreases item quantity in Cart if quantity > 1', async () => {
    render(<App />);

    const user = userEvent.setup();
    const minusButton = screen.getByRole('button', { name: '-' });
    await user.click(minusButton);
    expect(screen.getByTestId('quantity')).toHaveTextContent('1');
  });

  it('removes item from cart if quantity == 1', async () => {
    render(<App />);

    const user = userEvent.setup();
    const minusButton = screen.getByRole('button', { name: '-' });
    await user.click(minusButton);
    await user.click(minusButton);
    expect(screen.queryByText('Green Summer Dress')).not.toBeInTheDocument();
  });
});
