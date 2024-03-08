import DefineShadow from "../../functions/style/DefineShadow"
import Footer from "../Footer"
import Header from "../Header"
import { GetSystemStyle } from "../InitialFetch"
import "./styles.css"

type ScreenBoxScreenProps = {
    children : JSX.Element | JSX.Element[],
}

export default function ScreenBox({
    children,
} : ScreenBoxScreenProps) {
    const systemStyle = GetSystemStyle()

    const boxShadow = () => {
        const [ shadow1, shadow2 ] = DefineShadow(systemStyle.BackgroundPrimaryColor[1])
        return `inset 5px 5px 10px ${ shadow1 }, inset -5px -5px 10px ${ shadow2 }`
    }

    const content = (
        <>
            <Header hasShadow={ true }>
                <h2>CuiCode Systems</h2>
            </Header>
            <main>
                { children }
            </main>
            <Footer hasShadow={ true }>
                <h2>Contatos...</h2>
            </Footer>
        </>
    )

    return (
        <div
            className="screen-box"
            style={{
                background: `linear-gradient(220deg, ${ systemStyle.BackgroundPrimaryColor }, ${ systemStyle.BackgroundSecondaryColor }, ${ systemStyle.BackgroundTerciaryColor })`,
                boxShadow: boxShadow()
            }}
        >
            { content }
        </div>
    )
}