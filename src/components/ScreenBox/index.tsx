import { useLocation, useNavigate } from "react-router-dom"
import DefineShadow from "../../functions/style/DefineShadow"
import Footer from "../Footer"
import Header from "../Header"
import { GetSystemStyle } from "../InitialFetch"
import "./styles.css"
import { GetUserAuth } from "../ProtectedRoute"
import IsNil from "../../functions/IsNil"

type ScreenBoxScreenProps = {
    children : JSX.Element | JSX.Element[],
    hasFooter? : boolean,
}

export default function ScreenBox({
    children,
    hasFooter = false
} : ScreenBoxScreenProps) {
    const systemStyle = GetSystemStyle()
    const location = useLocation().pathname
    const navigate = useNavigate()
    const user = GetUserAuth()?.UserAuth

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

    const content = (
        <>
            <Header hasShadow={ true }>
                <h1
                    onClick={ headerClick }
                    style={{ cursor: 'pointer' }}
                >
                    CuiCode Systems
                </h1>
            </Header>
            <main>
                { children }
            </main>
            {
                hasFooter
                    ? (
                        <Footer hasShadow={ true }>
                            <h2>Contatos...</h2>
                        </Footer>
                    )
                    : null
            }
        </>
    )

    return (
        <div
            className="screen-box"
            style={{
                background: `linear-gradient(220deg, ${ systemStyle.BackgroundPrimaryColor }, ${ systemStyle.BackgroundSecondaryColor }, ${ systemStyle.BackgroundTerciaryColor })`,
                boxShadow: boxShadow(),
                ...screenBoxStyle
            }}
        >
            { content }
        </div>
    )
}