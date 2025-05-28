import { useEffect, useReducer } from "react";
import { TaskContext } from "./TaskContext";
import { initialTaskState } from "./InitialTaskState";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/timerWorkerManager";
import { TaskActionTypes } from "./taskActions";

type TaskContextProviderProps = {
    children: React.ReactNode;
}
export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [state, dispatch] = useReducer(taskReducer, initialTaskState)

    // worker para o navegador não pausar o Pomodoro Timer por inatividade da aba
    const worker = TimerWorkerManager.getInstance();

    worker.onmessage(ev => {
        const countDownSeconds = ev.data
        console.log(countDownSeconds)



        if (countDownSeconds <= 0) {
            // tocar um som
            dispatch({ type: TaskActionTypes.COMPLETE_TASK })
            worker.terminate()
        } else {
            dispatch({ type: TaskActionTypes.COUNT_DOWN, payload: { secondsRemaining: countDownSeconds } })
        }
    })

    useEffect(() => {
        if (!state.activedTask) {
            console.log('WORKER FIM')
            worker.terminate();
        }
        worker.postMessage(state)
    }, [worker, state])


    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    )
}