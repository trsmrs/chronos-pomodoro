import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useState } from "react";



export function MainForm() {
    const [task, setTask] = useState('')

    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
    }



    return (
        <form className="form" action="" onSubmit={handleCreateNewTask}>
            <div className="formRow">
                <DefaultInput 
                    id="input"
                    type="text"
                    labelText="Tarefas"
                    placeholder="Digite uma tarefa"
                    value={task}
                    onChange={e => setTask(e.target.value)}

                />
            </div>

            <div className="formRow">
                <p>Próximo intervalo é de 25 min.</p>
            </div>

            <div className="formRow">
                <Cycles />
            </div>

            <div className="formRow">
                <DefaultButton icon={<PlayCircleIcon />} color={"orangeRed"} />
                {/* <DefaultButton icon={<StopCircleIcon />} color={"red"}/> */}
            </div>
        </form>
    )
}