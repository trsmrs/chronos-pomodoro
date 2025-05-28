import { useTaskContext } from "../../contexts/TaskContext/useTaskContext"
import type { TaskModel } from "../../models/TaskModel"


export function Tips(props: { nextCycleType: TaskModel['type'] }) {
    const { state } = useTaskContext()
    const nextCycleType = props.nextCycleType

    // Tips
    const tipsForWhenActiveTask = {
        workTime: <span>Foque por <strong>{state.config.workTime} min</strong></span>,
        shortBreakTime: <span>Descanse por <strong>{state.config.shortBreakTime} min</strong></span>,
        longBreakTime: <span>Descanso longo <strong>{state.config.longBreakTime} min</strong></span>,
    }

    const tipsForNoActiveTask = {
        workTime: <span>Próximo ciclo é de <strong>{state.config.workTime} min</strong></span>,
        shortBreakTime: <span>Próximo ciclo é de <strong>{state.config.shortBreakTime} min</strong></span>,
        longBreakTime: <span>Próximo descanso será longo</span>,
    }


    return (
        <>
            {!!state.activedTask && tipsForWhenActiveTask[state.activedTask.type]}
            {!state.activedTask && tipsForNoActiveTask[nextCycleType]}
        </>
    )
}