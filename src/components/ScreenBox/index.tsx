import { useLocation, useNavigate } from "react-router-dom"

import { GetSystemStyle } from "../InitialFetch"
import { GetUserAuth } from "../ProtectedRoute"

import Footer from "../Footer"
import Header from "../Header"

import DefineLinearGradient from "../../functions/style/DefineLinearGradient"
import DefineShadow from "../../functions/style/DefineShadowColor"
import IsNil from "../../functions/IsNil"

import "./styles.css"

type ScreenBoxScreenProps = {
    children : JSX.Element | JSX.Element[]
    hasFooter? : boolean
    footerComponent? : JSX.Element | JSX.Element[]
    sectionComponent? : JSX.Element | JSX.Element[]
    sectionWidth? : number
    sectionBorderRadius? : number
}

export default function ScreenBox({
    children,
    hasFooter = false,
    footerComponent = <></>,
    sectionComponent,
    sectionWidth = 10,
    sectionBorderRadius = 0,
} : ScreenBoxScreenProps) {
    const systemStyle = GetSystemStyle()
    const location = useLocation().pathname
    const navigate = useNavigate()
    const user = GetUserAuth()?.UserAuth
    const hasSection = !IsNil(sectionComponent)

    const boxShadow = () => {
        const [ shadow1 ] = DefineShadow(systemStyle.BackgroundPrimaryColor[1])
        return `inset 5px 5px 10px ${ shadow1 }, inset -5px -5px 10px ${ shadow1 }`
    }

    const headerClick = () => {
        if (location === '/' || location === '/home') return
        navigate(IsNil(user) ? '/' : '/home')
    }

    const screenBoxStyle = {
        "justifyContent": hasFooter
            ? "space-between"
            : "auto"
    }

    const footer = hasFooter
        ? (
            <Footer hasShadow={ true }>
                { footerComponent }
            </Footer>
        )
        : <></>

    const section = hasSection
        ? (
            <section
                style={{
                    backgroundColor: systemStyle.TerciaryColor,
                    width: `${ sectionWidth }%`,
                    borderRadius: sectionBorderRadius,
                }}
            >
                { sectionComponent }
            </section>
        )
        : <></>

    return (
        <div
            className="screen-box"
            style={{
                background: DefineLinearGradient(systemStyle),
                boxShadow: boxShadow(),
                ...screenBoxStyle
            }}
        >
            <Header hasShadow={ true }>
                <h1
                    onClick={ headerClick }
                    style={{ cursor: 'pointer' }}
                >
                    CuiCode Systems
                </h1>
            </Header>
            <main>
                { section }
                <div className="main-content">
                    { children }
                </div>
            </main>
            { footer }
        </div>
    )
}