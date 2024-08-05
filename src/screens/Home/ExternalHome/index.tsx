import { useEffect } from "react"

import ScreenBox from "../../../components/base/ScreenBox"

import "./styles.css"

export default function ExternalHomeScreen() {
    useEffect(() => { document.title = "CuiCode Systems - Início" }, [])

    return (
        <ScreenBox>
            <main id="external-home">
                <div id="presentation">
                    <h1>Sistema de Gestão de Processos Integrados, Socialização e Gamificação (SGPISG)</h1>
                    <h2>CuiCode Systems é uma solução completa para gestão de processos, análises pessoais e profissionais, assim como promove uma integração entre pessoas como uma rede social juntamente com a gamificação.</h2>
                    <div>
                        <h3>Gestão de Processos Integrados:</h3>
                        <li>Obtenha uma maior oganização, controle de rotina e processos, sejam eles pessoais ou profissionais;</li>
                        <li>Acompanhe o progresso de seus projetos e objetivos em tempo real e tome decisões estratégicas;</li>
                        <li>Estabeleça metas para seu desenvolvimento pessoal;</li>
                        <li>Catalogue suas necessidades, objetivos e futuras compras;</li>
                        <li>Cadastre seus sonhos e obtenha interpretação e análise com integração com IA;</li>
                    </div>
                    <div>
                        <h3>Socialização e Gamificação:</h3>
                        <li>Engaje em uma nova comunidade em um novo ambiente;</li>
                        <li>Participe de atividades em grupo;</li>
                        <li>Estabeleça vínculos e crie eventos;</li>
                        <li>Acompanhe e controle combinados ou negociações com pessoas;</li>
                    </div>
                </div>
                <img
                    src={ require("../../../assets/logos/logo_white_left.png") }
                    alt="Logo CuiCode Systems"
                />
            </main>
        </ScreenBox>
    )
}