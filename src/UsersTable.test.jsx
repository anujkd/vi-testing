import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UsersTable, GenericTable } from './App';
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

describe('GenericTable Component', () => {
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' }
  ];

  beforeEach(() => {
    vi.restoreAllMocks();
    axios.get.mockClear();
    mockNavigate.mockClear();
  });

  it('renders loading state initially', () => {
    axios.get.mockImplementationOnce(() => new Promise(() => {}));

    render(<GenericTable columns={["id", "name", "email"]} apiUrl="/api/users" onRowClick={() => {}} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders data after successful fetch', async () => {
    axios.get.mockResolvedValueOnce({ data: mockUsers });

    render(<GenericTable columns={["id", "name", "email"]} apiUrl="/api/users" onRowClick={() => {}} />);

    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('renders error message on fetch failure', async () => {
    axios.get.mockRejectedValueOnce(new Error('Not found'));

    render(<GenericTable columns={["id", "name", "email"]} apiUrl="/api/users" onRowClick={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText(/Error fetching data/)).toBeInTheDocument();
    });
  });
});

describe('UsersTable Component', () => {
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' }
  ];

  beforeEach(() => {
    vi.restoreAllMocks();
    axios.get.mockClear();
    mockNavigate.mockClear();
  });

  it('renders user data after successful fetch', async () => {
    axios.get.mockResolvedValueOnce({ data: mockUsers });

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
    axios.get.mockRejectedValueOnce(new Error('Not found'));

    render(
      <BrowserRouter>
        <UsersTable />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error fetching data/)).toBeInTheDocument();
    });
  });

  it('navigates to detail page when row is clicked', async () => {
    axios.get.mockResolvedValueOnce({ data: mockUsers });

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
