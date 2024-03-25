import FooterContacts from "../../../components/FooterContacts"
import ScreenBox from "../../../components/ScreenBox"
import StuckPresentationalBox from "../../../components/StuckPresentationalBox"

import "./styles.css"

export default function ExternalHomeScreen() {
    return (
        <ScreenBox
            hasFooter
            footerComponent={ <FooterContacts /> }
        >
            <main id="external-home">
                <StuckPresentationalBox
                    title="Sistema de Gestão de Processos Integrados, Socialização e Gamificação"
                >
                    <p>CuiCode Systems é uma solução completa para gestão de processos, análises pessoais e profissionais, assim como promove uma integração entre pessoas como uma rede social juntamente com a gamificação.</p>
                </StuckPresentationalBox>
                <StuckPresentationalBox
                    title="Gestão de Processos Integrados"
                    side="right"
                >
                    <ul>
                        <li>Obtenha uma maior oganização, controle de rotina e processos, sejam eles pessoais ou profissionais;</li>
                        <li>Acompanhe o progresso de seus projetos e objetivos em tempo real e tome decisões estratégicas;</li>
                        <li>Estabeleça metas para seu desenvolvimento pessoal;</li>
                        <li>Catalogue suas necessidades, objetivos e futuras compras;</li>
                        <li>Cadastre seus sonhos e obtenha interpretação e análise com integração com IA;</li>
                    </ul>
                </StuckPresentationalBox>
                <StuckPresentationalBox
                    title="Socialização e Gamificação"
                >
                    <ul>
                        <li>Engaje em uma nova comunidade em um novo ambiente;</li>
                        <li>Participe de atividades em grupo;</li>
                        <li>Estabeleça vínculos e crie eventos;</li>
                        <li>Acompanhe e controle combinados ou negociações com pessoas;</li>
                    </ul>
                </StuckPresentationalBox>
            </main>
        </ScreenBox>
    )
}