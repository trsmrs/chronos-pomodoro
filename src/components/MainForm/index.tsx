import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { Tips } from "../Tips";
import { toastAdapter } from "../../adapters/toastAdapter";


export function MainForm() {
    const { state, dispatch } = useTaskContext()
    const taskNameInput = useRef<HTMLInputElement>(null)
    const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

    // Ciclos  
    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        toastAdapter.dismiss();

        if (!taskNameInput.current) return

        const taskName = taskNameInput.current.value.trim();

        if (!taskName) {
            toastAdapter.error('Insira uma tarefa válida')
            return
        }

        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration: state.config[nextCycleType],
            type: nextCycleType,
        };

        dispatch({ type: TaskActionTypes.START_TASK, payload: newTask })

        toastAdapter.success('Tarefa criada com sucesso!')
    }

    function handleTaskInterruption() {
        toastAdapter.dismiss();
        toastAdapter.warn('Tarefa interrompida')
        dispatch({ type: TaskActionTypes.INTERRUPT_TASK })
    }

    return (
        <form className="form" action="" onSubmit={handleCreateNewTask}>
            <div className="formRow">
                <DefaultInput
                    id="input"
                    type="text"
                    labelText="Tarefas"
                    placeholder="Digite uma tarefa"
                    ref={taskNameInput}
                    disabled={!!state.activedTask}
                    defaultValue={lastTaskName}
                />
            </div>

            <div className="formRow">
                <Tips nextCycleType={nextCycleType} />
            </div>

            {state.currentCycle > 0 && (
                <div className="formRow">
                    <Cycles />
                </div>
            )}

            <div className="formRow">
                {!state.activedTask && (
                    <DefaultButton
                        aria-label="Iniciar nova tarefa"
                        title="Iniciar nova tarefa"
                        type="submit"
                        icon={<PlayCircleIcon />}
                        color={"orangeRed"}
                        key='submit-button'
                    />

                )}

                {!!state.activedTask && (
                    <DefaultButton
                        aria-label="Interromper tarefa atual"
                        title="Interromper tarefa atual"
                        type="button"
                        icon={<StopCircleIcon />}
                        color={"red"}
                        onClick={handleTaskInterruption}
                        key='button-stop'
                    />
                )
                }
            </div>
        </form>
    )
}