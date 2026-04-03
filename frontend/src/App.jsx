import { Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import TopBar from './components/TopBar.jsx';
import { useAuth } from './context/AuthContext.jsx';
import AuthForm from './components/AuthForm.jsx';

const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'));
const EditorPage = lazy(() => import('./pages/EditorPage.jsx'));

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/auth" replace />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 dark:bg-slate-950 dark:text-slate-100">
      <TopBar />
      <Suspense fallback={<div className="p-8">Loading...</div>}>
        <Routes>
          <Route path="/auth" element={<AuthForm />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor/:id"
            element={
              <ProtectedRoute>
                <EditorPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}
