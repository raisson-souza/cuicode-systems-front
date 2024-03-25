import { Link, useLocation, useNavigate } from "react-router-dom"
import ScreenBox from "../../../components/ScreenBox"
import { GetUserAuth } from "../../../components/ProtectedRoute"
import IsNil from "../../../functions/IsNil"
import { useEffect } from "react"

export default function AccountRecoveryScreen() {
    const location = useLocation().pathname
    const navigate = useNavigate()
    const user = GetUserAuth()?.UserAuth

    useEffect(() => {
        // Se o usuário estiver logado e acessar a recuperação de conta.
        if (location === "/account_recovery" && !IsNil(user)) {
            navigate('/home')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ScreenBox>
            <h1>AccountRecovery</h1>
            <Link to={'/home'}>InternalHome</Link>
            <Link to={'/login'}>Login</Link>
        </ScreenBox>
    )
}