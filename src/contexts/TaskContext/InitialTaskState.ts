import type { TaskStateModel } from "../../models/TaskStateModel";

export const initialTaskState: TaskStateModel = {
    tasks: [],
    secondsRemaining: 0,
    formattedSecondsRemaining: '00:00',
    activedTask: null,
    currentCycle: 0,
    config: {
        workTime: 1,
        shortBreakTime: 1,
        longBreakTime: 15,
    }
}