import styles from './style.module.css'

export function Clock() {

   return (
      <button className={styles.button} >
         <img src="/fav.png" alt="clock" width={128} draggable="false" />
      </button>
   )
}