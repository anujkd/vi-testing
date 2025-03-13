import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { UserDetails } from './App';
import axios from 'axios';

vi.mock('axios');

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('UserDetails Component', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    phone: '123-456-7890',
    website: 'johndoe.com',
    company: { name: 'ABC Corp' },
    address: {
      street: '123 Main St',
      suite: 'Apt 4B',
      city: 'Anytown',
      zipcode: '12345',
    }
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    axios.get.mockClear();
    mockNavigate.mockClear();
  });

  it('renders loading state initially', () => {
    axios.get.mockImplementationOnce(() => new Promise(() => {}));

    render(
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes>
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading user details...')).toBeInTheDocument();
  });

  it('renders user details after successful fetch', async () => {
    axios.get.mockResolvedValueOnce({ data: mockUser });

    render(
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes>
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
    expect(screen.getByText('johndoe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('ABC Corp')).toBeInTheDocument();
  });

  it('renders error message on fetch failure', async () => {
    axios.get.mockRejectedValueOnce(new Error('Not found'));

    render(
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes>
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error fetching user details/)).toBeInTheDocument();
    });
  });

  it('navigates back to users table when back button is clicked', async () => {
    axios.get.mockResolvedValueOnce({ data: mockUser });

    render(
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes>
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());

    fireEvent.click(screen.getByText('Back to Users'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
