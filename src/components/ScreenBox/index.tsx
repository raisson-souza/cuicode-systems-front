import SystemStyle from "../../data/classes/SystemStyle"
import Header from "../Header"
import "./styles.css"

type ScreenBoxScreenProps = {
    children : JSX.Element | JSX.Element[],
    systemStyle : SystemStyle,
}

export default function ScreenBox({
    children,
    systemStyle,
} : ScreenBoxScreenProps) {
    return (
        <div
            className="screen-box"
            style={{
                background: `linear-gradient(220deg, ${ systemStyle.BackgroundPrimaryColor }, ${ systemStyle.BackgroundSecondaryColor }, ${ systemStyle.BackgroundTerciaryColor })`,
                backgroundSize: '600% 600%',
            }}
        >
            <Header
                backgroundColor={ systemStyle.HeaderColor }
                hasShadow={ true }
                screenBackgroundFirstHexStr={ systemStyle.BackgroundPrimaryColor[1]}
            >
                <h2>CuiCode Systems SGPISG</h2>
            </Header>
            { children }
        </div>
    )
}