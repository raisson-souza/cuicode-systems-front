import { useLocation, useNavigate } from "react-router-dom"
import IsNil from "../../functions/IsNil"
import DefineShadow from "../../functions/style/DefineShadow"
import { GetUserAuth } from "../ProtectedRoute"
import LoginRegistryBox from "../LoginRegistryBox"
import AuthUserBox from "../AuthUserBox"
import "./style.css"
import { GetSystemStyle } from "../InitialFetch"

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
        <div
            className="header"
            style={{
                backgroundColor: systemStyle.HeaderColor,
                boxShadow: defineBoxShadow(hasShadow, systemStyle.BackgroundPrimaryColor[1]),
            }}
        >
            { children }
            { renderHeaderBox() }
        </div>
    )
}