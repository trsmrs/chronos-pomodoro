import { useEffect, useReducer, useRef } from "react";
import { TaskContext } from "./TaskContext";
import { initialTaskState } from "./InitialTaskState";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/timerWorkerManager";
import { TaskActionTypes } from "./taskActions";
import { loadBeep } from "../../utils/loadBeep";
import type { TaskStateModel } from "../../models/TaskStateModel";

type TaskContextProviderProps = {
    children: React.ReactNode;
}
export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
        const storageState = localStorage.getItem('state')

        if (storageState === null) {
            return initialTaskState;
        }
        const parsedStorageState = JSON.parse(storageState) as TaskStateModel;

        return {
            ...parsedStorageState,
            activedTask: null,
            secondsRemaining: 0,
            formattedSecondsRemaining: '00:00'
        };
    });
    const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);


    // worker para o navegador não pausar o Pomodoro Timer por inatividade da aba
    const worker = TimerWorkerManager.getInstance();

    worker.onmessage(ev => {
        const countDownSeconds = ev.data

        if (countDownSeconds <= 0) {
            if (playBeepRef.current) {
                playBeepRef.current();
                playBeepRef.current = null;
            }
            dispatch({ type: TaskActionTypes.COMPLETE_TASK })
            worker.terminate()
        } else {
            dispatch({ type: TaskActionTypes.COUNT_DOWN, payload: { secondsRemaining: countDownSeconds } })
        }
    })

    useEffect(() => {
        localStorage.setItem('state', JSON.stringify(state))
        if (!state.activedTask) {
            worker.terminate();
        }

        document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`
        worker.postMessage(state)
    }, [worker, state])


    useEffect(() => {
        if (state.activedTask && playBeepRef.current === null) {
            playBeepRef.current = loadBeep();
        } else {
            playBeepRef.current = null;
        }
    }, [state.activedTask])

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    )
}