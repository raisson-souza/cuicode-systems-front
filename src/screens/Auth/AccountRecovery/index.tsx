import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { GetUserAuth } from "../../../components/base/ProtectedRoute"
import ScreenBox from "../../../components/ScreenBox"

import IsNil from "../../../functions/IsNil"

export default function AccountRecoveryScreen() {
    useEffect(() => { document.title = "CuiCode Systems - Recuperação de Conta" }, [])

    const location = useLocation().pathname
    const navigate = useNavigate()
    const userAuth = GetUserAuth()

    useEffect(() => {
        // Se o usuário estiver logado e acessar a recuperação de conta.
        if (location === "/account_recovery" && !IsNil(userAuth)) {
            navigate('/home')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ScreenBox
            hasHeaderUserInterationBox={ false }
        >
            <h1>AccountRecovery</h1>
        </ScreenBox>
    )
}