import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { GenericTable } from './App';

vi.mock('axios');

describe('GenericTable Component', () => {
  const mockData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' }
  ];

  const mockOnRowClick = vi.fn();
  const columns = ['id', 'name', 'email'];

  beforeEach(() => {
    vi.restoreAllMocks();
    axios.get.mockClear();
    mockOnRowClick.mockClear();
  });

  it('renders loading state initially', () => {
    axios.get.mockImplementationOnce(() => new Promise(() => {}));

    render(<GenericTable columns={columns} apiUrl="/api/data" onRowClick={mockOnRowClick} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders data after successful fetch', async () => {
    axios.get.mockResolvedValueOnce({ data: mockData });

    render(<GenericTable columns={columns} apiUrl="/api/data" onRowClick={mockOnRowClick} />);

    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('renders error message on fetch failure', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch data'));

    render(<GenericTable columns={columns} apiUrl="/api/data" onRowClick={mockOnRowClick} />);

    await waitFor(() => {
      expect(screen.getByText(/Error fetching data/)).toBeInTheDocument();
    });
  });

  it('calls onRowClick when a row is clicked', async () => {
    axios.get.mockResolvedValueOnce({ data: mockData });

    render(<GenericTable columns={columns} apiUrl="/api/data" onRowClick={mockOnRowClick} />);

    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());

    fireEvent.click(screen.getByText('John Doe'));

    expect(mockOnRowClick).toHaveBeenCalledWith(1);
  });
});
