import { useLocation } from "react-router-dom"

import DefineShadow from "../../functions/style/DefineShadowColor"
import IsNil from "../../functions/IsNil"

import { GetUserAuth } from "../ProtectedRoute"
import AuthUserBox from "../AuthUserBox"
import LoginRegistryBox from "../LoginRegistryBox"

import { GetSystemStyle } from "../InitialFetch"

import "./style.css"

type HeaderProps = {
    hasShadow : boolean
    children : JSX.Element
}

const defineBoxShadow = (hasShadow : boolean, screenBackgroundFirstHexStr : string) => {
    const [ shadow1, shadow2 ] = DefineShadow(screenBackgroundFirstHexStr)
    return hasShadow
        ? `5px 5px 20px ${ shadow1 }, -5px -5px 20px ${ shadow2 }`
        : 'none'
}

export default function Header({
    hasShadow,
    children,
} : HeaderProps) {
    const user = GetUserAuth()?.UserAuth
    const location = useLocation().pathname
    const systemStyle = GetSystemStyle()

    const renderHeaderBox = () => {
        if (
            location === "/login" ||
            location === "/user_registry"
        )
            return null

        return IsNil(user)
            ? <LoginRegistryBox />
            : <AuthUserBox userAuth={ user! } />
    }

    return (
        <header
            style={{
                backgroundColor: systemStyle.HeaderColor,
                boxShadow: defineBoxShadow(hasShadow, systemStyle.BackgroundPrimaryColor[1]),
            }}
        >
            { children }
            { renderHeaderBox() }
        </header>
    )
}