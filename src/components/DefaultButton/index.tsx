import styles from './style.module.css';

type DefaultButtonProps = {
    icon: React.ReactNode;
    color?: 'orangeRed' | 'red'
} & React.ComponentProps<'button'>


export function DefaultButton({ icon, color = 'orangeRed', ...props }: DefaultButtonProps) {

    return (
        <>
            <button className={`${styles.button} ${styles[color]}`}  {...props}>
                {icon}
            </button>
        </>
    )
}