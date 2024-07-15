import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import env from "../../config/Env"

import LocalStorage from "../../data/classes/LocalStorage"
import User from "../../data/classes/User"

import IsNil from "../../functions/IsNil"

import AuthEndpoints from "../../services/AuthEndpoints"

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
        /** Redireciona para a tela de login. */
        const ToLogin = () => {
            LocalStorage.LogOff()
            navigate('/login', { replace: true })
        }

        /** Realiza a autenticação no sistema. */
        const PerformAuthentication = async () => {
            let token = LocalStorage.GetToken()
            let { email, password } = LocalStorage.GetCredentials()
            let isLogged = false

            // Caso seja ambiente de desenvolvimento e haja credenciais no env, realiza login mockado
            if (
                env.Environment() === 'testing' &&
                !IsNil(env.UserEmail) &&
                !IsNil(env.UserPassword())
            ) {
                email = env.UserEmail()
                password = env.UserPassword()
            }

            // Caso não haja token nem credenciais, retona ao login
            if (
                IsNil(token) &&
                IsNil(email) &&
                IsNil(password)
            ) { return ToLogin() }

            // Caso haja token realiza o refresh
            if (!IsNil(token)) {
                const refreshTokenResponse = await AuthEndpoints.RefreshToken(token!)

                if (refreshTokenResponse.Success) {
                    isLogged = true
                    token = refreshTokenResponse.Data.newToken
                    LocalStorage.SetToken(token)
                    setProtectedRouteContext({
                        Token: token!,
                        UserAuth: new User(refreshTokenResponse.Data.user)
                    })
                    return
                }
            }

            // Caso não esteja logado, mas possua email e senha, refaz o login automaticamente
            if (
                !isLogged &&
                !IsNil(email) &&
                !IsNil(password)
            ) {
                const loginResponse = await AuthEndpoints.Login({
                    email: email!,
                    password: password!
                })

                if (loginResponse.Success) {
                    isLogged = true
                    token = loginResponse.Data.token
                    LocalStorage.SetToken(token)

                    setProtectedRouteContext({
                        Token: token!,
                        UserAuth: new User(loginResponse.Data.user)
                    })
                    return
                }
            }

            if (!isLogged)
                ToLogin()
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