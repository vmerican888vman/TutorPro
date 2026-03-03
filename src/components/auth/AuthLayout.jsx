import { Link } from 'react-router-dom'

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 24px',
    background: 'var(--bg)',
  },
  card: {
    width: '100%',
    maxWidth: 440,
  },
  logo: {
    textAlign: 'center',
    marginBottom: 40,
  },
  logoLink: {
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
  },
  logoGold: {
    fontFamily: "var(--font-heading)",
    fontWeight: 800,
    fontSize: '1.5rem',
    color: 'var(--gold)',
  },
  logoWhite: {
    fontFamily: "var(--font-heading)",
    fontWeight: 800,
    fontSize: '1.5rem',
    color: 'var(--white)',
  },
  heading: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: '1.8rem',
    color: 'var(--white)',
    textAlign: 'center',
    marginBottom: 8,
  },
  sub: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    color: 'var(--muted)',
    textAlign: 'center',
    marginBottom: 32,
  },
  formCard: {
    background: 'var(--card-bg)',
    border: '1.5px solid var(--border)',
    borderRadius: 14,
    padding: 32,
  },
}

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <Link to="/" style={styles.logoLink}>
            <span style={styles.logoGold}>Tutor</span>
            <span style={styles.logoWhite}>Pro.ai</span>
          </Link>
        </div>
        <h1 style={styles.heading}>{title}</h1>
        {subtitle && <p style={styles.sub}>{subtitle}</p>}
        <div style={styles.formCard}>
          {children}
        </div>
      </div>
    </div>
  )
}
