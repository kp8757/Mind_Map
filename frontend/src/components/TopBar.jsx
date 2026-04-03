import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-slate-700/40 bg-slate-900/60 px-5 py-3 backdrop-blur dark:text-slate-100">
      <h1 className="text-xl font-semibold text-accent-500">MindSpark</h1>
      <div className="flex items-center gap-3">
        <button className="rounded-lg border border-slate-600 p-2" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        {user && (
          <button onClick={logout} className="rounded-lg bg-accent-600 px-3 py-2 text-sm font-semibold">
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
