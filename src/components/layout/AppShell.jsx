import { NavLink, Outlet, Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuthStore } from '../../stores/authStore'

/* ── SVG Icons (inline, no dependency) ── */
const icons = {
  home: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  practice: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  tutor: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  progress: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  fullTest: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  explain: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  settings: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  logout: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  menu: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  close: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
}

const adminIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

const navItems = [
  { to: '/dashboard', label: 'Home', icon: icons.home },
  { to: '/dashboard/practice', label: 'Practice', icon: icons.practice },
  { to: '/dashboard/full-test', label: 'Full Tests', icon: icons.fullTest },
  { to: '/dashboard/explain', label: 'Q&A Explainer', icon: icons.explain },
  { to: '/dashboard/tutor', label: 'AI Tutor', icon: icons.tutor },
  { to: '/dashboard/progress', label: 'Progress', icon: icons.progress },
  { to: '/dashboard/settings', label: 'Settings', icon: icons.settings },
]

export default function AppShell() {
  const { user, profile, signOut, isPro, isTrialActive, trialDaysRemaining } = useAuthStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Derive display values with auth metadata fallback
  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.user_metadata?.name || 'User'
  const displayEmail = profile?.email || user?.email
  const subStatus = profile?.subscription_status || 'free'
  const trialActive = isTrialActive()
  const daysLeft = trialDaysRemaining()

  const sidebarContent = (
    <>
      <div style={{
        padding: '0 24px 20px', borderBottom: '1.5px solid var(--border)', marginBottom: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--gold)' }}>Tutor</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--white)' }}>Pro.ai</span>
        </Link>
        {/* Mobile close */}
        <button
          className="mobile-only"
          onClick={() => setMobileOpen(false)}
          style={{
            background: 'none', border: 'none', color: 'var(--muted)',
            cursor: 'pointer', padding: 4, display: 'none',
          }}
        >
          {icons.close}
        </button>
      </div>

      {/* Subscription badge */}
      {(profile || user) && (
        <div style={{ padding: '0 16px', marginBottom: 12 }}>
          <div style={{
            background: subStatus === 'pro' ? 'var(--gold-dim)' : trialActive ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
            border: `1px solid ${subStatus === 'pro' ? 'var(--gold-border)' : trialActive ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
            borderRadius: 8, padding: '8px 12px',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: subStatus === 'pro' ? 'var(--gold)' : trialActive ? '#10B981' : '#EF4444',
            }} />
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600,
              color: subStatus === 'pro' ? 'var(--gold)' : trialActive ? '#10B981' : '#EF4444',
            }}>
              {subStatus === 'pro' ? 'Pro Plan' : trialActive ? `Trial — ${daysLeft}d left` : 'Trial Expired'}
            </span>
          </div>
        </div>
      )}

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '0 12px', flex: 1 }}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/dashboard'}
            onClick={() => setMobileOpen(false)}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 12px', borderRadius: 8, textDecoration: 'none',
              fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 500,
              transition: 'var(--transition)',
              color: isActive ? 'var(--gold)' : 'var(--muted)',
              background: isActive ? 'var(--gold-dim)' : 'transparent',
            })}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
        {profile?.role === 'admin' && (
          <NavLink
            to="/dashboard/admin"
            onClick={() => setMobileOpen(false)}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 12px', borderRadius: 8, textDecoration: 'none',
              fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 500,
              transition: 'var(--transition)',
              color: isActive ? 'var(--gold)' : 'var(--muted)',
              background: isActive ? 'var(--gold-dim)' : 'transparent',
              marginTop: 8, borderTop: '1px solid var(--border)', paddingTop: 18,
            })}
          >
            {adminIcon}
            Admin
          </NavLink>
        )}
      </nav>

      {/* User footer */}
      {(profile || user) && (
        <div style={{ padding: '16px 16px', borderTop: '1.5px solid var(--border)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--gold-dim)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-body)', fontWeight: 700,
              fontSize: '0.8rem', color: 'var(--gold)',
            }}>
              {(displayName || displayEmail || '?')[0].toUpperCase()}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                color: 'var(--white)', fontWeight: 600,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {displayName}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--muted)',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {displayEmail}
              </div>
            </div>
          </div>
          <button
            onClick={signOut}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, width: '100%',
              padding: '8px 12px', borderRadius: 8,
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontSize: '0.85rem',
              color: 'var(--muted)', transition: 'var(--transition)',
            }}
          >
            {icons.logout}
            Sign Out
          </button>
        </div>
      )}
    </>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Mobile top bar */}
      <div className="mobile-topbar" style={{
        display: 'none', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: 56, background: 'var(--bg-light)', borderBottom: '1.5px solid var(--border)',
        padding: '0 16px', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button
          onClick={() => setMobileOpen(true)}
          style={{ background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer', padding: 4 }}
        >
          {icons.menu}
        </button>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--gold)' }}>Tutor</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--white)' }}>Pro.ai</span>
        </Link>
        <div style={{ width: 30 }} />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileOpen(false)}
          style={{
            display: 'none', position: 'fixed', inset: 0, zIndex: 299,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
          }}
        />
      )}

      {/* Sidebar — desktop fixed, mobile slide-over */}
      <aside
        className="sidebar"
        style={{
          width: 240, background: 'var(--bg-light)',
          borderRight: '1.5px solid var(--border)',
          padding: '24px 0', display: 'flex', flexDirection: 'column',
          position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 300,
          transition: 'transform 0.3s ease',
        }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile sidebar (rendered via CSS) */}
      <aside
        className="sidebar-mobile"
        style={{
          display: 'none', width: 280, background: 'var(--bg-light)',
          borderRight: '1.5px solid var(--border)',
          padding: '24px 0', flexDirection: 'column',
          position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 300,
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        {sidebarContent}
      </aside>

      {/* Main content */}
      <main className="main-with-sidebar" style={{
        flex: 1, marginLeft: 240, padding: 32, minHeight: '100vh',
      }}>
        <Outlet />
      </main>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .sidebar { display: none !important; }
          .sidebar-mobile { display: flex !important; }
          .sidebar-mobile .mobile-only { display: block !important; }
          .mobile-topbar { display: flex !important; }
          .mobile-overlay { display: block !important; }
          .main-with-sidebar {
            margin-left: 0 !important;
            padding: 16px !important;
            padding-top: 72px !important;
          }
        }
      `}</style>
    </div>
  )
}
