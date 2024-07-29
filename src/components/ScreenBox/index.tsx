import { GetSystemStyle } from "../InitialFetch"

import Header from "../Header"
import ModulesSection from "../ModulesSection"

import IsNil from "../../functions/IsNil"

import "./styles.css"
import LocalStorage from "../../data/classes/LocalStorage"

type ScreenBoxScreenProps = {
    children : JSX.Element | JSX.Element[]
    hasHeaderUserInterationBox? : boolean
}

export default function ScreenBox({
    children,
    hasHeaderUserInterationBox = true,
} : ScreenBoxScreenProps) {
    const systemStyle = GetSystemStyle()
    const modules = LocalStorage.GetAuthorizedModules()

    const section = !IsNil(modules)
        ? (
            <section
                style={{
                    backgroundColor: systemStyle.ModulesColumnColor,
                }}
            >
                <ModulesSection modules={ modules! } />
            </section>
        )
        : null

    return (
        <div
            className="screen-box"
            style={{
                background: systemStyle.BackgroundPrimaryColor,
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
        </div>
    )
}