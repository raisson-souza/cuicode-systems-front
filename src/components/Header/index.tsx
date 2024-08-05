import { useLocation, useNavigate } from "react-router-dom"

import AuthUserBox from "../AuthUserBox"
import LoginRegistryBox from "../LoginRegistryBox"

import { GetSystemStyle } from "../base/InitialFetch"
import { GetUserAuth } from "../base/ProtectedRoute"
import IsNil from "../../functions/IsNil"

import "./style.css"

type HeaderProps = {
    hasHeaderUserInterationBox : boolean
}

export default function Header(props : HeaderProps) {
    const userAuth = GetUserAuth()
    const location = useLocation().pathname
    const systemStyle = GetSystemStyle()
    const navigate = useNavigate()

    const { hasHeaderUserInterationBox } = props

    const renderHeaderBox = () => {
        if (
            location === "/login" ||
            location === "/user_registry" ||
            !hasHeaderUserInterationBox
        )
            return null

        return IsNil(userAuth)
            ? <LoginRegistryBox />
            : <AuthUserBox userAuth={ userAuth! } />
    }

    const headerClick = () => {
        if (location === "home") return
        navigate("/home")
    }

    return (
        <header
            style={{
                backgroundColor: systemStyle.HeaderColor,
                boxShadow: systemStyle.DefineBasicShadow()
            }}
        >
            <div
                id="logo-header"
                onClick={ headerClick }
                style={{ cursor: 'pointer' }}
            >
                <img
                    src={ systemStyle.GetLogoPath() }
                    alt="Logo CuiCode Systems"
                />
                <p style={{ fontSize: 24 }}>
                    <b>CuiCode<br />Systems</b>
                </p>
            </div>
            { renderHeaderBox() }
        </header>
    )
}