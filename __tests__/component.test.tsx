import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for custom matchers
import CoreFunctionalityComponent from './CoreFunctionalityComponent';

jest.mock('./some-external-dependency', () => ({
  someExternalDependencyFunction: jest.fn(),
}));

describe('Core Functionality Component', () => {
  test('renders without crashing', () => {
    render(<CoreFunctionalityComponent />);
    expect(screen.getByText(/core functionality/i)).toBeInTheDocument();
  });

  test('handles user input and updates state correctly', async () => {
    const { getByPlaceholderText, getByRole } = render(<CoreFunctionalityComponent />);

    fireEvent.change(getByPlaceholderText(/enter value here/i), {
      target: { value: 'testValue' },
    });
    fireEvent.click(getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(screen.getByText(/submitted successfully/i)).toBeInTheDocument());
  });

  test('displays error message when input is invalid', async () => {
    const { getByPlaceholderText, getByRole } = render(<CoreFunctionalityComponent />);

    fireEvent.change(getByPlaceholderText(/enter value here/i), {
      target: { value: '' },
    });
    fireEvent.click(getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(screen.getByText(/please enter a valid input/i)).toBeInTheDocument());
  });

  test('displays loading state while fetching data', async () => {
    const { getByPlaceholderText, getByRole } = render(<CoreFunctionalityComponent />);

    fireEvent.click(getByRole('button', { name: /fetch data/i }));

    await waitFor(() => expect(screen.getByLabelText(/loading.../i)).toBeInTheDocument());
  });

  test('handles errors during data fetching and displays error message', async () => {
    jest.mock('./some-external-dependency', () => ({
      someExternalDependencyFunction: jest.fn().mockRejectedValue(new Error('Fetching failed')),
    }));

    const { getByRole } = render(<CoreFunctionalityComponent />);

    fireEvent.click(getByRole('button', { name: /fetch data/i }));

    await waitFor(() =>
      expect(screen.getByText(/an error occurred while fetching data/i)).toBeInTheDocument()
    );
  });

  test('component is accessible and meets accessibility standards', () => {
    const { container } = render(<CoreFunctionalityComponent />);
    expect(container).toHaveNoAxeViolations();
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for custom matchers
import CoreFunctionalityComponent from './CoreFunctionalityComponent';

jest.mock('./some-external-dependency', () => ({
  someExternalDependencyFunction: jest.fn(),
}));

describe('Core Functionality Component', () => {
  test('renders without crashing', () => {
    render(<CoreFunctionalityComponent />);
    expect(screen.getByText(/core functionality/i)).toBeInTheDocument();
  });

  test('handles user input and updates state correctly', async () => {
    const { getByPlaceholderText, getByRole } = render(<CoreFunctionalityComponent />);

    fireEvent.change(getByPlaceholderText(/enter value here/i), {
      target: { value: 'testValue' },
    });
    fireEvent.click(getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(screen.getByText(/submitted successfully/i)).toBeInTheDocument());
  });

  test('displays error message when input is invalid', async () => {
    const { getByPlaceholderText, getByRole } = render(<CoreFunctionalityComponent />);

    fireEvent.change(getByPlaceholderText(/enter value here/i), {
      target: { value: '' },
    });
    fireEvent.click(getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(screen.getByText(/please enter a valid input/i)).toBeInTheDocument());
  });

  test('displays loading state while fetching data', async () => {
    const { getByPlaceholderText, getByRole } = render(<CoreFunctionalityComponent />);

    fireEvent.click(getByRole('button', { name: /fetch data/i }));

    await waitFor(() => expect(screen.getByLabelText(/loading.../i)).toBeInTheDocument());
  });

  test('handles errors during data fetching and displays error message', async () => {
    jest.mock('./some-external-dependency', () => ({
      someExternalDependencyFunction: jest.fn().mockRejectedValue(new Error('Fetching failed')),
    }));

    const { getByRole } = render(<CoreFunctionalityComponent />);

    fireEvent.click(getByRole('button', { name: /fetch data/i }));

    await waitFor(() =>
      expect(screen.getByText(/an error occurred while fetching data/i)).toBeInTheDocument()
    );
  });

  test('component is accessible and meets accessibility standards', () => {
    const { container } = render(<CoreFunctionalityComponent />);
    expect(container).toHaveNoAxeViolations();
  });
});