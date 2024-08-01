import { useLocation, useNavigate } from "react-router-dom"

import IsNil from "../../functions/IsNil"

import { GetUserAuth } from "../ProtectedRoute"
import AuthUserBox from "../AuthUserBox"
import LoginRegistryBox from "../LoginRegistryBox"

import { GetSystemStyle } from "../InitialFetch"

import "./style.css"

type HeaderProps = {
    hasHeaderUserInterationBox : boolean
}

export default function Header(props : HeaderProps) {
    const user = GetUserAuth()?.UserAuth
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

        return IsNil(user)
            ? <LoginRegistryBox />
            : <AuthUserBox userAuth={ user! } />
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