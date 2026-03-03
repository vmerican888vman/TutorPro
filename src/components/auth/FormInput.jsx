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
}

export default function FormInput({ label, id, type = 'text', value, onChange, placeholder, required = true, autoComplete }) {
  return (
    <div style={styles.wrapper}>
      <label htmlFor={id} style={styles.label}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        style={styles.input}
        onFocus={(e) => { e.target.style.borderColor = 'var(--gold-border)' }}
        onBlur={(e) => { e.target.style.borderColor = 'var(--border)' }}
      />
    </div>
  )
}
