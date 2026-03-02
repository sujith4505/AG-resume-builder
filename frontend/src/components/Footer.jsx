import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p>AG Resume Builder &copy; {new Date().getFullYear()}</p>
                <p className={styles.attribution}>
                    Developed by <strong>Sujith S</strong> | <a href="mailto:sundarsujith2005@gmail.com">sundarsujith2005@gmail.com</a> | <a href="tel:9600101945">9600101945</a>
                </p>
            </div>
        </footer>
    );
}
