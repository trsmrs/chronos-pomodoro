import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './style.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

type OptionThemes = 'dark' | 'light'

export function Menu() {
    const [theme, setTheme] = useState<OptionThemes>(() => {
        const storageTheme = localStorage.getItem("theme") as OptionThemes || 'dark'
        return storageTheme;
    });


    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem("theme", theme)
    }, [theme]);


    function handleThemeChange(ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        ev.preventDefault()
        setTheme(prevTheme => {
            const nextTheme = prevTheme === 'dark' ? 'light' : 'dark'
            return nextTheme;
        });
    }

    return (

        <nav className={styles.menu}>
            <Link className={styles.menuLink} to="/" aria-label='Ir para a Home' title='Ir para a Home'>
                <HouseIcon />
            </Link>
            <Link className={styles.menuLink} to="history" aria-label='Ver histórico' title='Ver histórico'>
                <HistoryIcon />
            </Link>
            <Link className={styles.menuLink} to="settings" aria-label='Ir para configuraçãoes' title='Ir para Configurações'>
                <SettingsIcon />
            </Link>
            <Link className={styles.menuLink} to="#"
                aria-label='Mudar Tema'
                title='Mudar Tema'
                onClick={handleThemeChange}
            >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}

            </Link>
        </nav>
    )
}