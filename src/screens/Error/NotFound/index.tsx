import { Link } from "react-router-dom"
import { GetSystemStyle } from "../../../components/InitialFetch"
import ScreenBox from "../../../components/ScreenBox"

export default function NotFoundScreen() {
    const systemStyle = GetSystemStyle()

    return (
        <ScreenBox systemStyle={ systemStyle }>
            <h1>Página não encontrada!</h1>
            <h4>Volte ao <Link to={'/'}>começo</Link>.</h4>
        </ScreenBox>
    )
}