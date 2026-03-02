export default function Home() {
    return (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Build an ATS-Friendly Resume</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Create a professional resume that gets past recruiters' filters. Free, fast, and secure.
            </p>
            <a
                href="/build"
                style={{
                    background: 'var(--primary-color)',
                    color: 'var(--bg-color)',
                    padding: '1rem 2rem',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                }}
            >
                Start Building Now
            </a>
        </div>
    );
}
