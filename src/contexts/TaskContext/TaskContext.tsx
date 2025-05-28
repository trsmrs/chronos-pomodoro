import { createContext } from "react";
import type { TaskStateModel } from "../../models/TaskStateModel";
import { initialTaskState } from "./InitialTaskState";
import type { TaskActionModel } from "./taskActions";


type TaskContextProps = {
    state: TaskStateModel,
    dispatch: React.Dispatch<TaskActionModel>
}


export const initialContextValue = {
    state: initialTaskState,
    dispatch: () => { },
}

export const TaskContext = createContext<TaskContextProps>(initialContextValue)