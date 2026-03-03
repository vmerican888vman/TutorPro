export default function Divider() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16, margin: '24px 0',
    }}>
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1.5 }}>
        or
      </span>
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
    </div>
  )
}
