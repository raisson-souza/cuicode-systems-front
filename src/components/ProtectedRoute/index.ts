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

        const PerformAuthentication = async () => {
            let token = LocalStorage.GetToken()
            const { email, password } = LocalStorage.GetCredentials()
            let isLogged = false

            if (
                IsNil(token) &&
                IsNil(email) &&
                IsNil(password)
            )
                return ToLogin()

            if (!IsNil(token)) {
                isLogged = await AuthEndpoints.ValidateJwt(token!)
                    .then(async (response) => {
                        return await response.Data as boolean
                    })
            }

            if (
                !isLogged &&
                !IsNil(email) &&
                !IsNil(password)
            ) {
                const loginResponse = await AuthEndpoints.Login(email!, password!)
                    .then(async (response) => {
                        return response
                    })

                if (loginResponse.Success) {
                    token = loginResponse.Data["token"] as string
                    LocalStorage.SetToken(token)

                    isLogged = await AuthEndpoints.ValidateJwt(token)
                        .then(async (response) => {
                            return await response.Data as boolean
                        })
                }
            }

            if (!isLogged)
                return ToLogin()
        }

        PerformAuthentication()
    }, [navigate])

    return children as JSX.Element
}