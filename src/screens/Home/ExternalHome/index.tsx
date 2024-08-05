import { useEffect } from "react"

import ScreenBox from "../../../components/base/ScreenBox"

import "./styles.css"

export default function ExternalHomeScreen() {
    useEffect(() => { document.title = "CuiCode Systems - Início" }, [])

    return (
        <ScreenBox>
            <main id="external-home">
                <p>Teste</p>
            </main>
        </ScreenBox>
    )
}