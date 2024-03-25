import { Link } from "react-router-dom"

import ScreenBox from "../../../components/ScreenBox"

export default function NotFoundScreen() {
    return (
        <ScreenBox>
            <h1>Página não encontrada!</h1>
            <h4>Volte ao <Link to={'/'}>começo</Link>.</h4>
        </ScreenBox>
    )
}