import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";

import styles from './style.module.css'
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTasks, SortTasksOptions } from "../../utils/sortTasks";
import { useEffect, useState } from "react";
import { toastAdapter } from "../../adapters/toastAdapter";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";


export function History() {
    const { state, dispatch } = useTaskContext();
    const [confirmClearHistory, setConfirmClearHistory] = useState(false)



    useEffect(() => {
        return () => {
            toastAdapter.dismiss();
        }
    }, [])


    const [sortTaskOpt, setSortTaskOpt] = useState<SortTasksOptions>(() => {
        return {
            tasks: sortTasks({ tasks: state.tasks }),
            field: 'startDate',
            direction: 'desc'
        }
    })

    function handleSortTask({ field }: Pick<SortTasksOptions, 'field'>) {
        const newDirection = sortTaskOpt.direction === 'desc' ? 'asc' : 'desc'
        setSortTaskOpt({
            tasks: sortTasks({
                direction: newDirection,
                tasks: sortTaskOpt.tasks,
                field,
            }),
            direction: newDirection,
            field,
        });
    }


    useEffect(() => {
        if (!confirmClearHistory) return
        setConfirmClearHistory(false)

        dispatch({ type: TaskActionTypes.RESET_STATE })

    }, [confirmClearHistory, dispatch])

    function handleClearHistory() {
        toastAdapter.dismiss()
        toastAdapter.confirm("Tem certeza que deseja apagar o histórico?",
            confirmation => {
                setConfirmClearHistory(confirmation)
            }
        )
    }


    return (
        <MainTemplate>
            <Container>
                <Heading>
                    <span>History</span>
                    {state.tasks && state.tasks.length > 0 ? (
                        <span className={styles.buttonContainer}>
                            <DefaultButton icon={<TrashIcon />} color="red"
                                aria-label="Apagar todo o histórico"
                                title="Apagar histórico"
                                onClick={handleClearHistory}
                            />
                        </span>
                    ) : (
                        null
                    )}
                </Heading>
            </Container>

            <Container>
                <div className={styles.responsiveTable}>
                    {state.tasks && state.tasks.length > 0 ? (
                        <table >
                            <thead>
                                <tr>
                                    <th onClick={() => handleSortTask({ field: 'name' })}>Tarefa <i>↕</i></th>
                                    <th onClick={() => handleSortTask({ field: 'duration' })}>Duração ↕</th>
                                    <th onClick={() => handleSortTask({ field: 'startDate' })}>Data ↕</th>
                                    <th>Status</th>
                                    <th>Tipo</th>
                                </tr>
                            </thead>
                            <tbody>

                                {sortTaskOpt.tasks.map((task) => {
                                    const taskTypeTranslate = {
                                        workTime: 'Foco',
                                        shortBreakTime: 'Descanso curto',
                                        longBreakTime: 'Descanso longo'
                                    }
                                    return (
                                        <tr key={task.id}>
                                            <td>{task.name}</td>
                                            <td>{task.duration}</td>
                                            <td>{formatDate(task.startDate)}</td>
                                            <td>{getTaskStatus(task, state.activedTask)}</td>
                                            <td>{taskTypeTranslate[task.type]}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <Container>
                            <Heading>Histórico vazio</Heading>
                        </Container>
                    )
                    }



                </div>
            </Container>
        </MainTemplate>
    )
}