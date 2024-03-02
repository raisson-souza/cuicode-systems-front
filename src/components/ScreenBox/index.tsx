import SystemStyle from "../../data/classes/SystemStyle"
import { Header } from "../StyledComponents"
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
                textColor="black"
                hasShadow
            >
                CuiCode Systems SGPISG
            </Header>
            { children }
        </div>
    )
}