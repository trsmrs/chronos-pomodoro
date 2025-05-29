import { Link } from 'react-router';
import styles from './style.module.css';

export function Footer() {

    return <footer className={styles.footer}>
        <Link to="/about">Conheça a técnica de estudos <em>Pomodoro 🍅</em></Link>
        <Link to="/">Chronos Pomodoro &copy; {new Date().getFullYear()}</Link>
    </footer>
}