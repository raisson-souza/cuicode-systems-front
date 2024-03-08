import { Link } from "react-router-dom"
import ScreenBox from "../../../components/ScreenBox"

export default function DefaultErrorScreen() {
    return (
        <ScreenBox>
            <h1>Ocorreu um erro inesperado no sistema!</h1>
            <h4>Atualize a página ou volte para o <Link to={'/'}>começo</Link>.</h4>
        </ScreenBox>
    )
}