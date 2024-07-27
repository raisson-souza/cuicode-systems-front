import { GetSystemStyle } from "../InitialFetch"

import Footer from "../Footer"
import Header from "../Header"

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
    const hasSection = !IsNil(sectionComponent)

    const boxShadow = () => {
        const [ shadow1 ] = systemStyle.BackgroundShadowColor(1)
        return `inset 5px 5px 10px ${ shadow1 }, inset -5px -5px 10px ${ shadow1 }`
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
                background: systemStyle.BackgroundPrimaryColor,
                boxShadow: boxShadow(),
                ...screenBoxStyle
            }}
        >
            <Header hasShadow={ true } />
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