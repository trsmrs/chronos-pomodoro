import { Clock } from '../Clock';
import styles from './style.module.css';

export function Logo() {
    return <div className={styles.logo}>
        <a className={styles.logoLink} href="#">
             <Clock />
             <span>Chronos</span>
        </a>
    </div>
}