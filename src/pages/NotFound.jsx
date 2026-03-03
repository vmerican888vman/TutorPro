import { Link } from 'react-router-dom'

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 24px',
    textAlign: 'center',
  },
  code: {
    fontFamily: 'var(--font-mono)',
    fontSize: '5rem',
    fontWeight: 700,
    color: 'var(--gold)',
    marginBottom: 8,
  },
  heading: {
    fontSize: '1.5rem',
    marginBottom: 12,
  },
  text: {
    color: 'var(--muted)',
    marginBottom: 32,
    maxWidth: 400,
  },
  link: {
    display: 'inline-block',
    background: 'var(--gold)',
    color: 'var(--bg)',
    fontWeight: 600,
    fontSize: '0.95rem',
    padding: '12px 32px',
    borderRadius: 'var(--radius-pill)',
    textDecoration: 'none',
    transition: 'var(--transition)',
  },
}

export default function NotFound() {
  return (
    <div style={styles.container}>
      <div style={styles.code}>404</div>
      <h1 style={styles.heading}>Page Not Found</h1>
      <p style={styles.text}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" style={styles.link}>
        Back to Home
      </Link>
    </div>
  )
}
