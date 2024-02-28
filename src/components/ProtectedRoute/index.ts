import { PropsWithChildren, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AuthEndpoints from "../../services/AuthEndpoints"
import LocalStorage from "../../data/classes/LocalStorage"
import IsNil from "../../functions/IsNil"

type ProtectedRouteProps = PropsWithChildren

export default function ProtectedRoute({ children } : ProtectedRouteProps) {
    const navigate = useNavigate()

    useEffect(() => {
        const ToLogin = () => {
            navigate('/login')
            return null
        }

        (async () => {
            const token = LocalStorage.GetToken()

            if (IsNil(token))
                return ToLogin()

            const isLogged = await AuthEndpoints.ValidateJwt(token!)
                .then(async (response) => {
                    return await response.Data as boolean
                })

            if (!isLogged)
                return ToLogin()
        })()
    }, [navigate])

    return children as JSX.Element
}