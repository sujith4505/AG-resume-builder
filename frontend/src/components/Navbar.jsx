import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import styles from './Navbar.module.css';

export default function Navbar() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Close menu when route changes
    useState(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    return (
        <nav className={styles.navbar}>
            <div className={styles.brand}>
                <Link to="/">AG Resume Builder</Link>
            </div>

            <button
                className={styles.hamburger}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle navigation"
            >
                <div className={`${styles.bar} ${isMenuOpen ? styles.open : ''}`}></div>
                <div className={`${styles.bar} ${isMenuOpen ? styles.open : ''}`}></div>
                <div className={`${styles.bar} ${isMenuOpen ? styles.open : ''}`}></div>
            </button>

            <ul className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''}`}>
                <li><Link to="/build" onClick={() => setIsMenuOpen(false)}>Build</Link></li>
                <li><Link to="/history" onClick={() => setIsMenuOpen(false)}>History</Link></li>
                <li><Link to="/score" onClick={() => setIsMenuOpen(false)}>Resume Score</Link></li>
                <li><Link to="/templates" onClick={() => setIsMenuOpen(false)}>Basic Templates</Link></li>
                <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
                <li className={styles.mobileActions}>
                    <select
                        value={theme}
                        onChange={(e) => toggleTheme(e.target.value)}
                        className={styles.themeSelect}
                    >
                        <option value="white">White Theme</option>
                        <option value="dark">Dark Theme</option>
                        <option value="black">Black Theme</option>
                    </select>
                    <button className={styles.loginBtn}>Login</button>
                </li>
            </ul>

            <div className={styles.desktopActions}>
                <select
                    value={theme}
                    onChange={(e) => toggleTheme(e.target.value)}
                    className={styles.themeSelect}
                >
                    <option value="white">White Theme</option>
                    <option value="dark">Dark Theme</option>
                    <option value="black">Black Theme</option>
                </select>
                <button className={styles.loginBtn}>Login</button>
            </div>
        </nav>
    );
}
