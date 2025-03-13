import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import { UsersTable } from './App';

// Mock Axios
const mockAxios = new axiosMockAdapter(axios);

describe('UsersTable Component', () => {
  beforeEach(() => {
    // Mock API response
    mockAxios.onGet('http://localhost:3000/api/items').reply(200, {
      content: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' }
      ],
      totalElements: 2
    });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('renders UsersTable and fetches data', async () => {
    render(<UsersTable />);

    // Check if the loading indicator appears
    // expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for data to be fetched
    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
    screen.debug(undefined, 99999);

    // Ensure table headers are present
    expect(screen.getByText(/ID/i)).toBeInTheDocument();
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
  });
});
