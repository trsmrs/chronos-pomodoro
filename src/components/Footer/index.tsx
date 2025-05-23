import styles from './style.module.css';




export function Footer() {

    return <footer className={styles.footer}>
        <a href="#">Conheça a técnica de estudos <em>Pomodoro 🍅</em></a>
        <a href="#">Chronos Pomodoro &copy; {new Date().getFullYear()}</a>
    </footer>
}