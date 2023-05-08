import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { beforeAll, vi } from 'vitest';

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

  it('decreases item quantity in Cart if quantity > 1', async () => {
    render(<App />);

    const user = userEvent.setup();
    const minusButton = screen.getByRole('button', { name: '-' });
    await user.click(minusButton);
    expect(screen.getByTestId('quantity')).toHaveTextContent('1');
  });

  it('removes item from cart if quantity == 1', async () => {
    const logSpy = vi.spyOn(console, 'log');
    render(<App />);

    const user = userEvent.setup();
    const minusButton = screen.getByRole('button', { name: '-' });
    await user.click(minusButton);
    await user.click(minusButton);
    expect(screen.getByTestId('quantity')).toHaveTextContent('1');
    expect(logSpy).toHaveBeenCalledWith('call function to delete item');
  });
});
