import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import RegisterPage from './RegisterPage';
import { vi } from 'vitest';

// Mock the useAuth hook
vi.mock('../contexts/AuthContext', async () => {
  const actual = await vi.importActual('../contexts/AuthContext');
  return {
    ...actual,
    useAuth: () => ({
      signUp: vi.fn().mockResolvedValue({ user: { id: '123' } }),
    }),
  };
});

// Mock supabase
vi.mock('../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn().mockResolvedValue({ error: null }),
    })),
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      }),
    },
  },
}));

describe('RegisterPage', () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <AuthProvider>
          <RegisterPage />
        </AuthProvider>
      </BrowserRouter>
    );

  it('should display an error message for weak passwords', async () => {
    renderComponent();

    // Fill out the form with a weak password
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: '123' } });
    fireEvent.click(screen.getByLabelText(/I agree to the/i));

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText(/Password is too weak/i)).toBeInTheDocument();
    });
  });
});