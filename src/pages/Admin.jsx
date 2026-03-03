import { useState, useEffect } from 'react'
import { getAdminData, createDiscountCode } from '../lib/database'

const gold = '#F5C842'
const green = '#34D399'

function StatCard({ label, value, color = 'var(--white)' }) {
  return (
    <div style={{
      background: 'var(--card-bg)', border: '1.5px solid var(--border)',
      borderRadius: 12, padding: '24px 20px', textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'var(--font-heading)', fontWeight: 800,
        fontSize: '2rem', color, marginBottom: 4,
      }}>
        {value ?? '—'}
      </div>
      <div style={{
        fontFamily: 'var(--font-body)', fontSize: '0.85rem',
        color: 'var(--muted)',
      }}>
        {label}
      </div>
    </div>
  )
}

export default function Admin() {
  const [tab, setTab] = useState('overview')
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [codes, setCodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Create code form
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({
    code: '', affiliateName: '', affiliateEmail: '',
    discountPercent: 20, commissionPercent: 0, maxUses: '', expiresAt: '',
  })
  const [creating, setCreating] = useState(false)
  const [createMsg, setCreateMsg] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [statsData, usersData, codesData] = await Promise.all([
        getAdminData('stats'),
        getAdminData('users'),
        getAdminData('discount-codes'),
      ])
      setStats(statsData)
      setUsers(usersData || [])
      setCodes(codesData || [])
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  const handleToggleCode = async (codeId, currentlyActive) => {
    try {
      await getAdminData('toggle-code', { codeId, isActive: !currentlyActive })
      setCodes(codes.map(c => c.id === codeId ? { ...c, is_active: !currentlyActive } : c))
    } catch (err) {
      alert('Failed to toggle: ' + err.message)
    }
  }

  const handleCreateCode = async (e) => {
    e.preventDefault()
    setCreating(true)
    setCreateMsg(null)
    try {
      await createDiscountCode({
        code: formData.code,
        affiliateName: formData.affiliateName,
        affiliateEmail: formData.affiliateEmail || undefined,
        discountPercent: Number(formData.discountPercent),
        commissionPercent: Number(formData.commissionPercent) || 0,
        maxUses: formData.maxUses ? Number(formData.maxUses) : undefined,
        expiresAt: formData.expiresAt || undefined,
      })
      setCreateMsg({ type: 'success', text: `Code "${formData.code.toUpperCase()}" created!` })
      setFormData({ code: '', affiliateName: '', affiliateEmail: '', discountPercent: 20, commissionPercent: 0, maxUses: '', expiresAt: '' })
      setShowCreateForm(false)
      loadData()
    } catch (err) {
      setCreateMsg({ type: 'error', text: err.message })
    }
    setCreating(false)
  }

  const tabStyle = (t) => ({
    padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
    fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600,
    background: tab === t ? gold : 'rgba(255,255,255,0.05)',
    color: tab === t ? '#07070F' : 'var(--muted)',
    transition: 'var(--transition)',
  })

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: 8,
    border: '1.5px solid var(--border)', background: 'rgba(255,255,255,0.05)',
    fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--white)',
    outline: 'none', boxSizing: 'border-box',
  }

  const labelStyle = {
    fontFamily: 'var(--font-body)', fontSize: '0.8rem',
    color: 'var(--muted)', marginBottom: 4, display: 'block',
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 60 }}>
        <div style={{
          width: 40, height: 40, border: '3px solid var(--border)',
          borderTopColor: gold, borderRadius: '50%',
          animation: 'spin 0.8s linear infinite', margin: '0 auto 16px',
        }} />
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--muted)' }}>Loading admin data...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: 60 }}>
        <p style={{ fontFamily: 'var(--font-body)', color: '#ef4444', marginBottom: 16 }}>Error: {error}</p>
        <button onClick={loadData} style={{
          padding: '10px 24px', borderRadius: 8, border: 'none',
          background: gold, color: '#07070F', fontWeight: 700, cursor: 'pointer',
        }}>Retry</button>
      </div>
    )
  }

  return (
    <div>
      <h1 style={{
        fontFamily: 'var(--font-heading)', fontWeight: 800,
        fontSize: '1.8rem', color: 'var(--white)', marginBottom: 24,
      }}>
        Admin Dashboard
      </h1>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
        <button onClick={() => setTab('overview')} style={tabStyle('overview')}>Overview</button>
        <button onClick={() => setTab('users')} style={tabStyle('users')}>Users</button>
        <button onClick={() => setTab('codes')} style={tabStyle('codes')}>Discount Codes</button>
      </div>

      {/* ── Overview Tab ── */}
      {tab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          <StatCard label="Total Users" value={stats?.totalUsers || 0} color={gold} />
          <StatCard label="Pro Subscribers" value={stats?.proUsers || 0} color={green} />
          <StatCard label="Active Codes" value={stats?.activeCodes || 0} />
          <StatCard label="Total Code Uses" value={stats?.totalCodeUses || 0} />
        </div>
      )}

      {/* ── Users Tab ── */}
      {tab === 'users' && (
        <div style={{
          background: 'var(--card-bg)', border: '1.5px solid var(--border)',
          borderRadius: 12, overflow: 'hidden',
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%', borderCollapse: 'collapse',
              fontFamily: 'var(--font-body)', fontSize: '0.85rem',
            }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid var(--border)' }}>
                  {['Email', 'Name', 'Status', 'Role', 'Joined'].map(h => (
                    <th key={h} style={{
                      padding: '12px 16px', textAlign: 'left',
                      color: 'var(--muted)', fontWeight: 600, whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 16px', color: 'var(--white)' }}>{u.email}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--muted)' }}>{u.full_name || '—'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: 100, fontSize: '0.75rem', fontWeight: 600,
                        background: u.subscription_status === 'pro' ? 'rgba(245,200,66,0.15)' : 'rgba(255,255,255,0.05)',
                        color: u.subscription_status === 'pro' ? gold : 'var(--muted)',
                      }}>
                        {u.subscription_status || 'free'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: 100, fontSize: '0.75rem', fontWeight: 600,
                        background: u.role === 'admin' ? 'rgba(245,200,66,0.15)' : 'transparent',
                        color: u.role === 'admin' ? gold : 'var(--muted)',
                      }}>
                        {u.role || 'user'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                      {u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ padding: 32, textAlign: 'center', color: 'var(--muted)' }}>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Discount Codes Tab ── */}
      {tab === 'codes' && (
        <div>
          {/* Create button & message */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              style={{
                padding: '10px 24px', borderRadius: 8, border: 'none',
                background: gold, color: '#07070F', fontWeight: 700,
                fontFamily: 'var(--font-body)', fontSize: '0.9rem', cursor: 'pointer',
              }}
            >
              {showCreateForm ? 'Cancel' : '+ New Code'}
            </button>
            {createMsg && (
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                color: createMsg.type === 'success' ? green : '#ef4444',
              }}>
                {createMsg.text}
              </span>
            )}
          </div>

          {/* Create form */}
          {showCreateForm && (
            <form onSubmit={handleCreateCode} style={{
              background: 'var(--card-bg)', border: '1.5px solid var(--border)',
              borderRadius: 12, padding: 24, marginBottom: 24,
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Code *</label>
                  <input
                    required value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="e.g. JORDAN20"
                    style={{ ...inputStyle, textTransform: 'uppercase' }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Affiliate Name *</label>
                  <input
                    required value={formData.affiliateName}
                    onChange={(e) => setFormData({ ...formData, affiliateName: e.target.value })}
                    placeholder="e.g. Jordan Smith"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Affiliate Email</label>
                  <input
                    type="email" value={formData.affiliateEmail}
                    onChange={(e) => setFormData({ ...formData, affiliateEmail: e.target.value })}
                    placeholder="Optional"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Discount % *</label>
                  <input
                    required type="number" min="1" max="100" value={formData.discountPercent}
                    onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Commission %</label>
                  <input
                    type="number" min="0" max="100" value={formData.commissionPercent}
                    onChange={(e) => setFormData({ ...formData, commissionPercent: e.target.value })}
                    placeholder="0"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Max Uses</label>
                  <input
                    type="number" min="1" value={formData.maxUses}
                    onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
                    placeholder="Unlimited"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Expires At</label>
                  <input
                    type="date" value={formData.expiresAt}
                    onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>
              <button
                type="submit" disabled={creating}
                style={{
                  marginTop: 20, padding: '12px 32px', borderRadius: 8, border: 'none',
                  background: green, color: '#07070F', fontWeight: 700,
                  fontFamily: 'var(--font-body)', fontSize: '0.9rem', cursor: 'pointer',
                  opacity: creating ? 0.6 : 1,
                }}
              >
                {creating ? 'Creating...' : 'Create Discount Code'}
              </button>
            </form>
          )}

          {/* Codes list */}
          <div style={{
            background: 'var(--card-bg)', border: '1.5px solid var(--border)',
            borderRadius: 12, overflow: 'hidden',
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%', borderCollapse: 'collapse',
                fontFamily: 'var(--font-body)', fontSize: '0.85rem',
              }}>
                <thead>
                  <tr style={{ borderBottom: '1.5px solid var(--border)' }}>
                    {['Code', 'Affiliate', 'Discount', 'Uses', 'Status', 'Created', ''].map(h => (
                      <th key={h} style={{
                        padding: '12px 16px', textAlign: 'left',
                        color: 'var(--muted)', fontWeight: 600, whiteSpace: 'nowrap',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {codes.map((c) => (
                    <tr key={c.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '12px 16px', color: gold, fontWeight: 700 }}>{c.code}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--white)' }}>
                        {c.affiliate_name}
                        {c.affiliate_email && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{c.affiliate_email}</div>
                        )}
                      </td>
                      <td style={{ padding: '12px 16px', color: green, fontWeight: 600 }}>{c.discount_percent}%</td>
                      <td style={{ padding: '12px 16px', color: 'var(--muted)' }}>
                        {c.times_used}{c.max_uses ? ` / ${c.max_uses}` : ''}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          padding: '3px 10px', borderRadius: 100, fontSize: '0.75rem', fontWeight: 600,
                          background: c.is_active ? 'rgba(52,211,153,0.15)' : 'rgba(239,68,68,0.15)',
                          color: c.is_active ? green : '#ef4444',
                        }}>
                          {c.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                        {new Date(c.created_at).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <button
                          onClick={() => handleToggleCode(c.id, c.is_active)}
                          style={{
                            padding: '5px 12px', borderRadius: 6, border: '1px solid var(--border)',
                            background: 'transparent', color: 'var(--muted)', fontSize: '0.8rem',
                            fontFamily: 'var(--font-body)', cursor: 'pointer',
                          }}
                        >
                          {c.is_active ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {codes.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ padding: 32, textAlign: 'center', color: 'var(--muted)' }}>
                        No discount codes yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
