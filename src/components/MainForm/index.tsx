import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useRef, useState } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { formatSecondsMinuts } from "../../utils/formatSecondsMinuts";



export function MainForm() {
    const { state, setState } = useTaskContext()

    const taskNameInput = useRef<HTMLInputElement>(null)

    // Ciclos
    const nextCycle = getNextCycle(state.currentCycle)
    const nextCycleType = getNextCycleType(nextCycle)

    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!taskNameInput.current) return

        const taskName = taskNameInput.current.value.trim();

        if (!taskName) {
            alert('kd' + taskName)
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

        const secondsRemaining = newTask.duration * 60;

        setState(prevState => {
            return {
                ...prevState,
                config: { ...prevState.config },
                activedTask: newTask,
                currentCycle: nextCycle,
                secondsRemaining: secondsRemaining,
                formattedSecondsRemaining: formatSecondsMinuts(secondsRemaining),
                tasks: [...prevState.tasks, newTask],
            }
        });
    }

    function handleTaskInterruption() {
        setState(prevState => {
            return {
                ...prevState,
                activedTask: null,
                secondsRemaining: 0,
                formattedSecondsRemaining: '00:00',
                tasks: prevState.tasks.map(task => {
                    if ( prevState.activedTask && prevState.activedTask.id === task.id) {
                        return {...task, interruptDate: Date.now()};
                    }
                    return task;
                })
            }
        });
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
                />
            </div>

            <div className="formRow">
                <p>Próximo intervalo é de 25 min.</p>
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

                {/* <DefaultButton icon={<StopCircleIcon />} color={"red"}/> */}
            </div>
        </form>
    )
}