import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const PasswordResetPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password reset logic
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setSubmitted(true);
    if (error) {
      alert('Failed to send reset link. Please try again.');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      {submitted ? (
        <p>If an account with that email exists, a password reset link has been sent.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input-field w-full"
            required
          />
          <button type="submit" className="btn-primary w-full">Send Reset Link</button>
        </form>
      )}
    </div>
  );
};

export default PasswordResetPage; 