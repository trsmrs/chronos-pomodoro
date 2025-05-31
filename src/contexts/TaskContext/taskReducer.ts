import type { TaskStateModel } from "../../models/TaskStateModel";
import { formatSecondsMinuts } from "../../utils/formatSecondsMinuts";
import { getNextCycle } from "../../utils/getNextCycle";
import { initialTaskState } from "./InitialTaskState";
import { TaskActionTypes, type TaskActionModel } from "./taskActions";

export function taskReducer(state: TaskStateModel, action: TaskActionModel): TaskStateModel {

    switch (action.type) {
        case TaskActionTypes.START_TASK: {

            const newTask = action.payload;
            const nextCycle = getNextCycle(state.currentCycle);
            const secondsRemaining = newTask.duration * 60;

            return {
                ...state,
                activedTask: newTask,
                currentCycle: nextCycle,
                secondsRemaining,
                formattedSecondsRemaining: formatSecondsMinuts(secondsRemaining),
                tasks: [...state.tasks, newTask],

            };
        }
        case TaskActionTypes.INTERRUPT_TASK: {
            return {
                ...state,
                activedTask: null,
                secondsRemaining: 0,
                formattedSecondsRemaining: '00:00',
                tasks: state.tasks.map(task => {
                    if (state.activedTask && state.activedTask.id === task.id) {
                        return { ...task, interruptDate: Date.now() }
                    }
                    return task;
                })
            };
        }

        case TaskActionTypes.COMPLETE_TASK: {
            return {
                ...state,
                activedTask: null,
                secondsRemaining: 0,
                formattedSecondsRemaining: '00:00',
                tasks: state.tasks.map(task => {
                    if (state.activedTask && state.activedTask.id === task.id) {
                        return { ...task, completeDate: Date.now() }
                    }
                    return task;
                })
            };
        }

        case TaskActionTypes.RESET_STATE: {
            return { ...initialTaskState };
        }
        case TaskActionTypes.COUNT_DOWN: {
            return {
                ...state,
                secondsRemaining: action.payload.secondsRemaining,
                formattedSecondsRemaining: formatSecondsMinuts(action.payload.secondsRemaining)
            };
        }
    }

    // sempre deve retornar o estado
    return state;
}