import ScreenBox from "../../../components/ScreenBox"

export default function SystemUnderMaintenceScreen() {
    return (
        <ScreenBox
            hasHeaderUserInterationBox={ false }
        >
            <h1>Sistema em Manutenção ou Fora de Área!</h1>
            <h3>Tente atualizar a página, se não voltar ao normal retorne em alguns minutos.</h3>
        </ScreenBox>
    )
}