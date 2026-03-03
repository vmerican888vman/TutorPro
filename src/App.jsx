import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import { useAuthStore } from './stores/authStore'
import ScrollToTop from './components/layout/ScrollToTop'
import AppShell from './components/layout/AppShell'
import AuthGuard from './components/layout/AuthGuard'
import AdminGuard from './components/layout/AdminGuard'
import ProGuard from './components/layout/ProGuard'
import NotFound from './pages/NotFound'

/* Lazy-loaded page chunks */
const Landing = lazy(() => import('./pages/Landing'))
const Diagnostic = lazy(() => import('./pages/Diagnostic'))
const DiagnosticResults = lazy(() => import('./pages/DiagnosticResults'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const AuthCallback = lazy(() => import('./pages/AuthCallback'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Practice = lazy(() => import('./pages/Practice'))
const Tutor = lazy(() => import('./pages/Tutor'))
const Progress = lazy(() => import('./pages/Progress'))
const Settings = lazy(() => import('./pages/Settings'))
const FullTest = lazy(() => import('./pages/FullTest'))
const QuestionExplainer = lazy(() => import('./pages/QuestionExplainer'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const Contact = lazy(() => import('./pages/Contact'))
const Admin = lazy(() => import('./pages/Admin'))

function PageLoader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '60vh', color: 'var(--muted)',
      fontFamily: 'var(--font-body)', fontSize: '0.9rem',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 32, height: 32, border: '3px solid var(--border)',
          borderTopColor: 'var(--gold)', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite', margin: '0 auto 12px',
        }} />
        Loading...
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  )
}

export default function App() {
  const initialize = useAuthStore((s) => s.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/diagnostic" element={<Diagnostic />} />
          <Route path="/diagnostic/results" element={<DiagnosticResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected dashboard routes */}
          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <AppShell />
              </AuthGuard>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="practice" element={<ProGuard><Practice /></ProGuard>} />
            <Route path="tutor" element={<ProGuard><Tutor /></ProGuard>} />
            <Route path="progress" element={<ProGuard><Progress /></ProGuard>} />
            <Route path="full-test" element={<ProGuard><FullTest /></ProGuard>} />
            <Route path="explain" element={<ProGuard><QuestionExplainer /></ProGuard>} />
            <Route path="settings" element={<Settings />} />
            <Route path="admin" element={<AdminGuard><Admin /></AdminGuard>} />
          </Route>

          {/* 404 catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
