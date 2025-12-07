import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers like toBeInTheDocument
import DesignArchitectureComponent from './DesignArchitectureComponent';

jest.mock('./externalDependency', () => ({
  useExternalData: jest.fn(),
}));

describe('Design Architecture Component Tests', () => {
  const mockUseExternalData = require('./externalDependency').useExternalData as jest.Mock;

  beforeEach(() => {
    mockUseExternalData.mockReset();
  });

  test('renders without crashing', () => {
    render(<DesignArchitectureComponent />);
    expect(screen.getByText(/design architecture/i)).toBeInTheDocument();
  });

  test('handles loading state correctly', async () => {
    mockUseExternalData.mockReturnValue({ data: null, isLoading: true });
    render(<DesignArchitectureComponent />);

    await waitFor(() => screen.getByTestId('loading-spinner'));
    expect(screen.queryByTestId('data-container')).not.toBeInTheDocument();
  });

  test('displays error message when an error occurs', async () => {
    mockUseExternalData.mockReturnValue({ data: null, isLoading: false, error: new Error('Failed to load data') });
    render(<DesignArchitectureComponent />);

    await waitFor(() => screen.getByText(/failed to load data/i));
  });

  test('renders data when available', async () => {
    const mockData = { key1: 'value1' };
    mockUseExternalData.mockReturnValue({ data: mockData, isLoading: false });
    render(<DesignArchitectureComponent />);

    await waitFor(() => screen.getByText(/value1/i));
  });

  test('handles user interaction correctly', () => {
    const mockData = { key1: 'value1' };
    mockUseExternalData.mockReturnValue({ data: mockData, isLoading: false });
    render(<DesignArchitectureComponent />);

    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(mockUseExternalData).toHaveBeenCalled();
  });

  test('ensures accessibility features are present', () => {
    const mockData = { key1: 'value1' };
    mockUseExternalData.mockReturnValue({ data: mockData, isLoading: false });
    render(<DesignArchitectureComponent />);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveAttribute('aria-label');
    expect(button).toBeVisible();
  });

  test('handles edge cases such as empty or null data', async () => {
    mockUseExternalData.mockReturnValue({ data: {}, isLoading: false });
    render(<DesignArchitectureComponent />);

    await waitFor(() => screen.getByText(/no data available/i));
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers like toBeInTheDocument
import DesignArchitectureComponent from './DesignArchitectureComponent';

jest.mock('./externalDependency', () => ({
  useExternalData: jest.fn(),
}));

describe('Design Architecture Component Tests', () => {
  const mockUseExternalData = require('./externalDependency').useExternalData as jest.Mock;

  beforeEach(() => {
    mockUseExternalData.mockReset();
  });

  test('renders without crashing', () => {
    render(<DesignArchitectureComponent />);
    expect(screen.getByText(/design architecture/i)).toBeInTheDocument();
  });

  test('handles loading state correctly', async () => {
    mockUseExternalData.mockReturnValue({ data: null, isLoading: true });
    render(<DesignArchitectureComponent />);

    await waitFor(() => screen.getByTestId('loading-spinner'));
    expect(screen.queryByTestId('data-container')).not.toBeInTheDocument();
  });

  test('displays error message when an error occurs', async () => {
    mockUseExternalData.mockReturnValue({ data: null, isLoading: false, error: new Error('Failed to load data') });
    render(<DesignArchitectureComponent />);

    await waitFor(() => screen.getByText(/failed to load data/i));
  });

  test('renders data when available', async () => {
    const mockData = { key1: 'value1' };
    mockUseExternalData.mockReturnValue({ data: mockData, isLoading: false });
    render(<DesignArchitectureComponent />);

    await waitFor(() => screen.getByText(/value1/i));
  });

  test('handles user interaction correctly', () => {
    const mockData = { key1: 'value1' };
    mockUseExternalData.mockReturnValue({ data: mockData, isLoading: false });
    render(<DesignArchitectureComponent />);

    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(mockUseExternalData).toHaveBeenCalled();
  });

  test('ensures accessibility features are present', () => {
    const mockData = { key1: 'value1' };
    mockUseExternalData.mockReturnValue({ data: mockData, isLoading: false });
    render(<DesignArchitectureComponent />);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveAttribute('aria-label');
    expect(button).toBeVisible();
  });

  test('handles edge cases such as empty or null data', async () => {
    mockUseExternalData.mockReturnValue({ data: {}, isLoading: false });
    render(<DesignArchitectureComponent />);

    await waitFor(() => screen.getByText(/no data available/i));
  });
});