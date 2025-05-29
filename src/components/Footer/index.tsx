import styles from './style.module.css';
import { RouterLink } from '../RouterLink';

export function Footer() {

    return <footer className={styles.footer}>
        <RouterLink href="/about">Conheça a técnica de estudos <em>Pomodoro 🍅</em></RouterLink>
        <RouterLink href="/">Chronos Pomodoro &copy; {new Date().getFullYear()}</RouterLink>
    </footer>
}