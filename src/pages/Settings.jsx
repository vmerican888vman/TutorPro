import { useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import { updateProfile } from '../lib/database'
import { updatePassword } from '../lib/auth'
import { openCustomerPortal } from '../lib/stripe-client'

function Section({ title, children }) {
  return (
    <div style={{
      background: 'var(--card-bg)', border: '1.5px solid var(--border)',
      borderRadius: 14, padding: 28, marginBottom: 20,
    }}>
      <h3 style={{
        fontFamily: 'var(--font-heading)', fontWeight: 700,
        fontSize: '1.1rem', color: 'var(--white)', marginBottom: 20,
      }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

function SettingsInput({ label, value, onChange, type = 'text', disabled = false }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{
        display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.85rem',
        fontWeight: 600, color: 'var(--white)', marginBottom: 6,
      }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={{
          width: '100%', maxWidth: 400, padding: '10px 14px',
          fontFamily: 'var(--font-body)', fontSize: '0.9rem',
          color: disabled ? 'var(--muted)' : 'var(--white)',
          background: disabled ? 'rgba(255,255,255,0.02)' : 'var(--bg-light)',
          border: '1.5px solid var(--border)', borderRadius: 'var(--radius-input)',
          transition: 'var(--transition)', outline: 'none',
          cursor: disabled ? 'not-allowed' : 'text',
        }}
      />
    </div>
  )
}

export default function Settings() {
  const { profile, fetchProfile, user } = useAuthStore()

  const [fullName, setFullName] = useState(profile?.full_name || '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState(null)
  const [passwordSaved, setPasswordSaved] = useState(false)
  const [passwordSaving, setPasswordSaving] = useState(false)

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    await updateProfile(profile.id, { full_name: fullName })
    await fetchProfile(profile.id)
    setSaved(true)
    setSaving(false)
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setPasswordError(null)
    setPasswordSaved(false)

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.')
      return
    }

    setPasswordSaving(true)
    const { error } = await updatePassword(newPassword)
    if (error) {
      setPasswordError(error.message)
    } else {
      setPasswordSaved(true)
      setNewPassword('')
      setConfirmPassword('')
    }
    setPasswordSaving(false)
  }

  const handleManageSubscription = async () => {
    try {
      await openCustomerPortal()
    } catch {
      // Stripe not configured
    }
  }

  const subscriptionLabel = {
    pro: 'Pro',
    cancelled: 'Cancelled',
    free: 'Free',
  }

  const subscriptionColor = {
    pro: 'var(--gold)',
    cancelled: 'var(--red)',
    free: 'var(--muted)',
  }

  const status = profile?.subscription_status || 'free'

  return (
    <div style={{ maxWidth: 640 }}>
      <h1 style={{
        fontFamily: 'var(--font-heading)', fontWeight: 800,
        fontSize: '1.8rem', color: 'var(--white)', marginBottom: 8,
      }}>
        Settings
      </h1>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '0.95rem',
        color: 'var(--muted)', marginBottom: 32,
      }}>
        Manage your account and subscription.
      </p>

      {/* Profile */}
      <Section title="Profile">
        <form onSubmit={handleSaveProfile}>
          <SettingsInput
            label="Full Name"
            value={fullName}
            onChange={(e) => { setFullName(e.target.value); setSaved(false) }}
          />
          <SettingsInput
            label="Email"
            value={user?.email || profile?.email || ''}
            disabled
          />
          <button
            type="submit"
            disabled={saving}
            style={{
              background: 'var(--gold)', color: 'var(--bg)', fontWeight: 700,
              fontSize: '0.9rem', padding: '10px 24px', borderRadius: 100,
              fontFamily: 'var(--font-body)', cursor: saving ? 'not-allowed' : 'pointer',
              border: 'none', transition: 'var(--transition)',
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </button>
        </form>
      </Section>

      {/* Subscription */}
      <Section title="Subscription">
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: subscriptionColor[status],
          }} />
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '0.95rem',
            fontWeight: 600, color: subscriptionColor[status],
          }}>
            {subscriptionLabel[status]} Plan
          </span>
        </div>

        {profile?.subscription_end_date && (
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.85rem',
            color: 'var(--muted)', marginBottom: 16,
          }}>
            {status === 'cancelled' ? 'Access until' : 'Renews on'}{' '}
            {new Date(profile.subscription_end_date).toLocaleDateString()}
          </p>
        )}

        {status === 'pro' && (
          <button
            onClick={handleManageSubscription}
            style={{
              background: 'transparent', color: 'var(--white)',
              fontWeight: 600, fontSize: '0.9rem', padding: '10px 24px',
              borderRadius: 100, fontFamily: 'var(--font-body)',
              cursor: 'pointer', border: '1.5px solid var(--border)',
              transition: 'var(--transition)',
            }}
          >
            Manage Subscription
          </button>
        )}
      </Section>

      {/* Change Password */}
      <Section title="Change Password">
        <form onSubmit={handleChangePassword}>
          {passwordError && (
            <div style={{
              background: 'rgba(248,113,113,0.08)', border: '1.5px solid rgba(248,113,113,0.25)',
              borderRadius: 'var(--radius-input)', padding: '10px 14px', marginBottom: 16,
              fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--red)',
            }}>
              {passwordError}
            </div>
          )}
          {passwordSaved && (
            <div style={{
              background: 'rgba(52,211,153,0.08)', border: '1.5px solid rgba(52,211,153,0.25)',
              borderRadius: 'var(--radius-input)', padding: '10px 14px', marginBottom: 16,
              fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--green)',
            }}>
              Password updated successfully.
            </div>
          )}
          <SettingsInput
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <SettingsInput
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={passwordSaving}
            style={{
              background: 'var(--gold)', color: 'var(--bg)', fontWeight: 700,
              fontSize: '0.9rem', padding: '10px 24px', borderRadius: 100,
              fontFamily: 'var(--font-body)', cursor: passwordSaving ? 'not-allowed' : 'pointer',
              border: 'none', transition: 'var(--transition)',
              opacity: passwordSaving ? 0.6 : 1,
            }}
          >
            {passwordSaving ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </Section>
    </div>
  )
}
