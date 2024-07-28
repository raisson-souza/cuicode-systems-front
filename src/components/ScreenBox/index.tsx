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
    hasHeaderUserInterationBox? : boolean
}

export default function ScreenBox({
    children,
    hasFooter = false,
    footerComponent = <></>,
    sectionComponent,
    sectionWidth = 10,
    hasHeaderUserInterationBox = true
} : ScreenBoxScreenProps) {
    const systemStyle = GetSystemStyle()
    const hasSection = !IsNil(sectionComponent)

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

    const section = hasSection // TODO: remover opcionalidade de componente para a section e deixar fixado o ModulesSection
        ? (
            <section
                style={{
                    backgroundColor: systemStyle.ModulesColumnColor,
                    // width: `${ sectionWidth }%`,
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
                ...screenBoxStyle
            }}
        >
            <Header
                hasHeaderUserInterationBox={ hasHeaderUserInterationBox }
            />
            <main>
                { section }
                <div
                    className="main-content"
                    style={{
                        backgroundColor: systemStyle.BackgroundSecondaryColor
                    }}
                >
                    { children }
                </div>
            </main>
            { footer }
        </div>
    )
}