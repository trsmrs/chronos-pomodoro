import { useEffect, useState } from "react";
import { TaskContext } from "./TaskContext";
import { initialTaskState } from "./InitialTaskState";

type TaskContextProviderProps = {
    children: React.ReactNode;
}
export function TaskContextProvider({children}: TaskContextProviderProps){
    const [state, setState] = useState(initialTaskState)

    useEffect(()=> {
        // 
    },[state])


    return (
        <TaskContext.Provider value={{state, setState}}>
            {children}
        </TaskContext.Provider>
    )
}