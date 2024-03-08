import DefineShadow from "../../functions/style/DefineShadow"
import { GetSystemStyle } from "../InitialFetch"
import "./styles.css"

type FooterProps = {
    children : JSX.Element
    hasShadow : boolean
}

const defineBoxShadow = (hasShadow : boolean, screenBackgroundFirstHexStr : string) => {
    const [ shadow1, shadow2 ] = DefineShadow(screenBackgroundFirstHexStr)
    return hasShadow
        ? `5px 5px 20px ${ shadow1 }, -5px -5px 20px ${ shadow2 }`
        : 'none'
}

export default function Footer({
    children,
    hasShadow,
} : FooterProps) {
    const systemStyle = GetSystemStyle()

    return (
        <div
            className="footer"
            style={{
                backgroundColor: systemStyle.HeaderColor,
                boxShadow: defineBoxShadow(hasShadow, systemStyle.BackgroundPrimaryColor[1]),
            }}
        >
            { children }
        </div>
    )
}