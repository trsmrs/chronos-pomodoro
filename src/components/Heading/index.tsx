import type { ReactNode } from 'react';
import styles from './style.module.css';


type HeadingProps = {
    children: ReactNode;
}


export function Heading({ children }: HeadingProps) {

    return <h1 className={`${styles.heading} ${styles.cyan}`}>{children}</h1>
}