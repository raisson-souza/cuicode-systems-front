import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import LocalStorage from "../../data/classes/LocalStorage"
import User from "../../data/classes/User"

import IsNil from "../../functions/IsNil"

import AuthEndpoints, { LoginResponse, ValidateJwtResponse } from "../../services/AuthEndpoints"

type ProtectedRouteContextType = {
    UserAuth : User,
    Token : string,
}

const ProtectedRouteContext = createContext<ProtectedRouteContextType | null>(null)

type ProtectedRouteProps = {
    children : JSX.Element
}

export default function ProtectedRoute({ children } : ProtectedRouteProps) {
    const navigate = useNavigate()
    const [ protectedRouteContext, setProtectedRouteContext ] = useState<ProtectedRouteContextType | null>(null)

    useEffect(() => {
        const ToLogin = () => {
            navigate('/login', { replace: true })
            return null
        }

        const PerformAuthentication = async () => {
            let token = LocalStorage.GetToken()
            const { email, password } = LocalStorage.GetCredentials()
            let isLogged = false
            let invalidToken = false

            if (
                IsNil(token) &&
                IsNil(email) &&
                IsNil(password)
            )
                return ToLogin()

            if (!IsNil(token)) {
                const validateJwtResponse = await AuthEndpoints.ValidateJwt(token!)

                if (!validateJwtResponse.Success)
                    invalidToken = true

                if (validateJwtResponse.Success) {
                    const validateJwt = {
                        ok: validateJwtResponse.Data["ok"],
                        user: new User(validateJwtResponse.Data["user"]),
                    } as ValidateJwtResponse

                    isLogged = validateJwt.ok
                    setProtectedRouteContext({
                        Token: token!,
                        UserAuth: validateJwt.user
                    })
                }
            }

            if (
                invalidToken ||
                (
                    !isLogged &&
                    !IsNil(email) &&
                    !IsNil(password)
                )
            ) {
                const loginResponse = await AuthEndpoints.Login(email!, password!)

                if (loginResponse.Success) {
                    const login = {
                        token: loginResponse.Data["token"],
                        user: new User(loginResponse.Data["user"])
                    } as LoginResponse

                    token = login.token
                    LocalStorage.SetToken(token)
                    isLogged = true

                    setProtectedRouteContext({
                        Token: token!,
                        UserAuth: login.user
                    })
                }
            }

            if (!isLogged)
                return ToLogin()
        }

        PerformAuthentication()
    }, [navigate])

    return (
        <ProtectedRouteContext.Provider value={ protectedRouteContext }>
            { children }
        </ProtectedRouteContext.Provider>
    )
}

function GetUserAuth() { return useContext(ProtectedRouteContext) }

export { GetUserAuth }