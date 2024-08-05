import { useEffect } from "react"

import ScreenBox from "../../../components/base/ScreenBox"

export default function UserRegistryScreen() {
    useEffect(() => { document.title = "CuiCode Systems - Cadastro" }, [])

    return (
        <ScreenBox
            hasHeaderUserInterationBox={ false }
        >
            <h1>UserRegistry</h1>
        </ScreenBox>
    )
}