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

    render(<ProductDetail />);
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
    expect(screen.getByRole('option', { name: 'S' }).selected).toBe(false);
    expect(screen.getByRole('option', { name: 'M' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'L' }).selected).toBe(false);
  });
});
