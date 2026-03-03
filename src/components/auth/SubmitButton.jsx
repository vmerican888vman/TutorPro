export default function SubmitButton({ children, loading, disabled }) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      style={{
        width: '100%',
        padding: '14px 24px',
        borderRadius: 100,
        border: 'none',
        background: 'var(--gold)',
        color: 'var(--bg)',
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        fontSize: '1rem',
        cursor: loading || disabled ? 'not-allowed' : 'pointer',
        opacity: loading || disabled ? 0.65 : 1,
        transition: 'var(--transition)',
        marginTop: 8,
      }}
    >
      {loading ? 'Please wait...' : children}
    </button>
  )
}
