import { useState } from 'react';
import api from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function AuthForm() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const route = mode === 'login' ? '/auth/login' : '/auth/signup';
      const { data } = await api.post(route, form);
      login(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-24 max-w-md space-y-4 rounded-2xl border border-slate-700 bg-slate-900 p-8">
      <h2 className="text-2xl font-bold">{mode === 'login' ? 'Welcome back' : 'Create account'}</h2>
      {mode === 'signup' && (
        <input
          required
          placeholder="Name"
          className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-2"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
      )}
      <input
        required
        placeholder="Email"
        type="email"
        className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-2"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
      />
      <input
        required
        placeholder="Password"
        type="password"
        className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-2"
        value={form.password}
        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
      />
      {error && <p className="text-sm text-rose-400">{error}</p>}
      <button className="w-full rounded-xl bg-accent-600 px-4 py-2 font-semibold">Continue</button>
      <button
        type="button"
        onClick={() => setMode((m) => (m === 'login' ? 'signup' : 'login'))}
        className="w-full text-sm text-slate-400"
      >
        {mode === 'login' ? 'No account? Sign up' : 'Already have an account? Log in'}
      </button>
      <button type="button" className="w-full rounded-xl border border-slate-600 px-4 py-2 text-sm text-slate-200">
        Continue with Google (hook)
      </button>
    </form>
  );
}
