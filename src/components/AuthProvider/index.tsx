// https://www.youtube.com/watch?v=eFPvXGZETiY - Rotas protegidas em React
import { createContext, PropsWithChildren, useContext, useState } from "react"
import User from "../../data/types/User"

const AuthContext = createContext<User | null>(null)

type AuthProviderProps = PropsWithChildren & {
    isLogged: boolean
}

export default function AuthProvider({
    children,
    isLogged
} : AuthProviderProps) {
    const [ user ] = useState<User | null>(
        isLogged
            ? { Id: 1 }
            : null
    )

    return (
        <AuthContext.Provider value={user}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (context === undefined)
        throw new Error('useAuth deve ser usando dentro de AuthProvider')

    return context
}
