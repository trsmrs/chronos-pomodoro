import { Container } from "../../components/Container";
import { GenericHtml } from "../../components/GeneticHtml";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";


export function NotFound() {
    
    return (
        <MainTemplate>
            <Container>
                <GenericHtml>
                    <Heading> Página não encontrada</Heading>
                    <p>Desculpe, mas a página que você digitou não foi encontrada.</p>
                    <img src="/notfound.png" alt="imagem-not-found" />
                </GenericHtml>
            </Container>
        </MainTemplate>
    )
}