import { useState } from 'react'

const styles = {
  wrapper: {
    marginBottom: 16,
  },
  label: {
    display: 'block',
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--white)',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    color: 'var(--white)',
    background: 'var(--bg-light)',
    border: '1.5px solid var(--border)',
    borderRadius: 'var(--radius-input)',
    transition: 'var(--transition)',
    outline: 'none',
  },
  inputWithToggle: {
    width: '100%',
    padding: '12px 44px 12px 16px',
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    color: 'var(--white)',
    background: 'var(--bg-light)',
    border: '1.5px solid var(--border)',
    borderRadius: 'var(--radius-input)',
    transition: 'var(--transition)',
    outline: 'none',
  },
  inputWrapper: {
    position: 'relative',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
    color: 'var(--muted)',
    fontSize: '1.1rem',
    lineHeight: 1,
  },
}

export default function FormInput({ label, id, type = 'text', value, onChange, placeholder, required = true, autoComplete }) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div style={styles.wrapper}>
      <label htmlFor={id} style={styles.label}>{label}</label>
      <div style={isPassword ? styles.inputWrapper : undefined}>
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          style={isPassword ? styles.inputWithToggle : styles.input}
          onFocus={(e) => { e.target.style.borderColor = 'var(--gold-border)' }}
          onBlur={(e) => { e.target.style.borderColor = 'var(--border)' }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '🙈' : '👁'}
          </button>
        )}
      </div>
    </div>
  )
}
