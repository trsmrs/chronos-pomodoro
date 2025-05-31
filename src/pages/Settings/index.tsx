import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { DefaultInput } from "../../components/DefaultInput";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";
import { useEffect, useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { toastAdapter } from "../../adapters/toastAdapter";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";


export function Settings() {

    useEffect(()=>{
             document.title = 'Configurações'   
        },[])


    const { state, dispatch } = useTaskContext();
    const timeInputRefs = {
        work: useRef<HTMLInputElement>(null),
        short: useRef<HTMLInputElement>(null),
        long: useRef<HTMLInputElement>(null)
    }

    function handleSaveSetings(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formErrors: any[] = []

        const workTime = Number(timeInputRefs.work.current?.value);
        const shortBreakTime = Number(timeInputRefs.short.current?.value);
        const longBreakTime = Number(timeInputRefs.long.current?.value);


        if (workTime < 1 || workTime > 99) {
            toastAdapter.dismiss()
            formErrors.push('Foco - Digite um numero válido ente 1 e 99')
        }

        if (shortBreakTime < 1 || shortBreakTime > 30) {
            toastAdapter.dismiss()
            formErrors.push('Descanso curto - Digite um numero válido ente 1 e 30')
        }
        if (longBreakTime < 1 || longBreakTime > 60) {
            toastAdapter.dismiss()
            formErrors.push('Descanso longo - Digite um numero válido ente 1 e 60')
        }


        if (formErrors.length > 0) {
            formErrors.forEach(error => {
                toastAdapter.error(error)
            })
            return;
        }
       dispatch({type: TaskActionTypes.CHANGE_SETTINGS, payload:{
            workTime,
            shortBreakTime,
            longBreakTime,
       }});
            toastAdapter.success('Configurações salvas com sucesso!')
    }



    return (
        <MainTemplate>
            <Container>
                <Heading>Configurações</Heading>
            </Container>
            <Container>
                <p style={{ marginBottom: 30 }}>Modifique as configurações de tempo.</p>
            </Container>

            <Container>
                <form onSubmit={handleSaveSetings} className="form">
                    <div className="formRow">
                        <DefaultInput id="workTime" labelText="Foco"
                            placeholder="tempo para o foco"
                            type="number"
                            ref={timeInputRefs.work}
                            defaultValue={state.config.workTime}
                            required
                        />
                    </div>

                    <div className="formRow">
                        <DefaultInput id="shortBreakTime" labelText="Descanso curto"
                            placeholder="tempo para o descanso curto"
                            type="number"
                            ref={timeInputRefs.short}
                            defaultValue={state.config.shortBreakTime}
                            required
                        />
                    </div>

                    <div className="formRow">
                        <DefaultInput id="longBreakTime" labelText="Descanso longo"
                            placeholder="tempo para o descanso longo"
                            type="number"
                            ref={timeInputRefs.long}
                            defaultValue={state.config.longBreakTime}
                            required
                        />
                    </div>

                    <div className="formRow">
                        <DefaultButton icon={<SaveIcon />}
                            aria-label="Salvar configurações"
                            title="Salvar configurações"
                        />
                    </div>
                </form>
            </Container>
        </MainTemplate>
    )
}
