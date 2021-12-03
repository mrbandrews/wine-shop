import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Header  from './header';

it('renders without crashing', () => {
    render(<Header />, { wrapper: MemoryRouter });
});