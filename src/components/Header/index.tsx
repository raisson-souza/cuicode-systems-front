import { useLocation, useNavigate } from "react-router-dom"

import IsNil from "../../functions/IsNil"

import { GetUserAuth } from "../ProtectedRoute"
import AuthUserBox from "../AuthUserBox"
import LoginRegistryBox from "../LoginRegistryBox"

import { GetSystemStyle } from "../InitialFetch"

import "./style.css"
import SystemStyle from "../../data/classes/SystemStyle"

type HeaderProps = {
    hasShadow : boolean
}

type DefineShadowBoxProps = {
    hasShadow : boolean
    systemStyle : SystemStyle
}

export default function Header(props : HeaderProps) {
    const user = GetUserAuth()?.UserAuth
    const location = useLocation().pathname
    const systemStyle = GetSystemStyle()
    const navigate = useNavigate()

    const { hasShadow } = props

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

    const headerClick = () => {
        if (location === '/' || location === '/home') return
        navigate(IsNil(user) ? '/' : '/home')
    }

    const defineBoxShadow = (props : DefineShadowBoxProps) => {
        const { hasShadow, systemStyle } = props
        const [ shadow1, shadow2 ] = systemStyle.BackgroundShadowColor(1)
        return hasShadow
            ? `5px 5px 20px ${ shadow1 }, -5px -5px 20px ${ shadow2 }`
            : 'none'
    }

    return (
        <header
            style={{
                backgroundColor: systemStyle.HeaderColor,
                boxShadow: defineBoxShadow({
                    hasShadow: hasShadow,
                    systemStyle: systemStyle
                }),
            }}
        >
            <img
                src={ systemStyle.GetLogoPath() }
                style={{
                    width: '9%'
                }}
                alt="Logo CuiCode Systems"
            />
            <h1
                onClick={ headerClick }
                style={{ cursor: 'pointer' }}
            >
                CuiCode Systems
            </h1>
            { renderHeaderBox() }
        </header>
    )
}