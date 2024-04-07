import { Link } from "react-router-dom"

import ScreenBox from "../../../components/ScreenBox"

type NotFoundScreeenProps = {
    msg? : string
}

export default function NotFoundScreen({
    msg = "Página não encontrada!"
} : NotFoundScreeenProps) {
    return (
        <ScreenBox>
            <h1>{ msg }</h1>
            <h4>Volte ao <Link to={'/'}>começo</Link>.</h4>
        </ScreenBox>
    )
}