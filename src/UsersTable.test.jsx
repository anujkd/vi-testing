import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UsersTable } from './App';

// Mock fetch API
global.fetch = vi.fn();

// Mock navigate function
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('UsersTable Component', () => {
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' }
  ];

  beforeEach(() => {
    vi.restoreAllMocks();  // Reset all mocks
    fetch.mockClear();
    mockNavigate.mockClear();
  });

  it('renders loading state initially', () => {
    fetch.mockImplementationOnce(() => new Promise(() => {}));

    render(
      <BrowserRouter>
        <UsersTable />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading users...')).toBeInTheDocument();
  });

  it('renders user data after successful fetch', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(
      <BrowserRouter>
        <UsersTable />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
  });

  it('renders error message on fetch failure', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => { throw new Error('Not found'); }
    });

    render(
      <BrowserRouter>
        <UsersTable />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error fetching users/)).toBeInTheDocument();
    });
  });

  it('navigates to detail page when row is clicked', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(
      <BrowserRouter>
        <UsersTable />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());

    fireEvent.click(screen.getByText('John Doe'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/user/1');
    });
  });
});
