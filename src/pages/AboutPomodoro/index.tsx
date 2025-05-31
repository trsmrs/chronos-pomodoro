import { useEffect } from "react";
import { Container } from "../../components/Container";
import { GenericHtml } from "../../components/GeneticHtml";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";


export function AboutPomodoro() {
    useEffect(()=>{
         document.title = 'Entenda a técnica Pomodoro'   
    },[])
    
    return (
        <MainTemplate>
            <Container>
                <GenericHtml>
                    <Heading> Técnica de Pomodoro 🍅</Heading>
                    <p>A <strong>Técnica Pomodoro</strong> foi criada no final dos anos 1980 por <strong>Francesco Cirillo</strong>, um estudante universitário italiano. Ele buscava uma forma prática de melhorar a concentração e gerenciar melhor o tempo de estudo, usando um timer de cozinha em formato de tomate (daí o nome “Pomodoro”).</p>

                    <h2>Como funciona a Técnica Pomodoro:</h2>
                    <ol>
                        <li>Escolha uma tarefa que deseja realizar.</li>
                        <li>Ajuste um timer para 25 minutos (1 Pomodoro).</li>
                        <li>Trabalhe exclusivamente nessa tarefa até o timer tocar.</li>
                        <li>Faça uma pausa curta de 5 minutos.</li>
                        <li>Após 4 Pomodoros, faça uma pausa mais longa de 15 a 30 minutos.</li>
                    </ol>

                    <h2>Por que a técnica foi criada:</h2>
                    <ul>
                        <li>Melhorar a concentração.</li>
                        <li>Reduzir distrações.</li>
                        <li>Combater a procrastinação.</li>
                        <li>Aumentar a produtividade sem sobrecarga.</li>
                    </ul>

                    <h2>Para que serve:</h2>
                    <ul>
                        <li>Aumentar o foco e a produtividade.</li>
                        <li>Quebrar grandes tarefas em partes menores.</li>
                        <li>Criar um ritmo de trabalho sustentável.</li>
                        <li>Ajudar na gestão do tempo.</li>
                    </ul>
                </GenericHtml>
            </Container>
        </MainTemplate>
    )
}