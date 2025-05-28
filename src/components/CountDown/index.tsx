
import styles from './style.module.css'
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext'

export function CountDown() {
   const { state } = useTaskContext()
  
   return (
      <h1 className={styles.container}>{state.formattedSecondsRemaining}</h1>
   )
}