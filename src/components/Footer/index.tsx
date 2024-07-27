import SystemStyle from "../../data/classes/SystemStyle"
import { GetSystemStyle } from "../InitialFetch"

import "./styles.css"

type FooterProps = {
    children : JSX.Element | JSX.Element[]
    hasShadow : boolean
}

type DefineBoxShadowProps = {
    hasShadow : boolean
    systemStyle : SystemStyle
}

const defineBoxShadow = (props : DefineBoxShadowProps) => {
    const { systemStyle, hasShadow } = props
    return hasShadow
        ? `5px 5px 20px ${ systemStyle.BackgroundShadowColor(1) }, -5px -5px 20px ${ systemStyle.BackgroundShadowColor(1) }`
        : 'none'
}

export default function Footer(props : FooterProps) {
    const { children, hasShadow } = props
    const systemStyle = GetSystemStyle()

    return (
        <div
            className="footer"
            style={{
                backgroundColor: systemStyle.HeaderColor,
                boxShadow: defineBoxShadow({
                    hasShadow: hasShadow,
                    systemStyle: systemStyle
                }),
            }}
        >
            { children }
        </div>
    )
}