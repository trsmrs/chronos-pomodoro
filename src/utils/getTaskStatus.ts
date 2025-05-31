import type { TaskModel } from "../models/TaskModel";

export function getTaskStatus(task: TaskModel, activeTask: TaskModel | null) {

    switch (true) {
        case !!task.completeDate:
            return 'Completa';
        case !!task.interruptDate:
            return 'Interrompida';
        case task.id === activeTask?.id:
            return 'Em Progresso';
        default:
            return 'Abandonada';
    }

}