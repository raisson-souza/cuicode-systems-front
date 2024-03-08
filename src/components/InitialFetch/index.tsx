import { createContext, useContext, useEffect, useState } from "react"
import SystemStyle from "../../data/classes/SystemStyle"
import SystemEndpoints from "../../services/SystemEndpoints"
import IsNil from "../../functions/IsNil"
import DefaultSystemStyle from "../../data/defaultStyle"
import SystemUnderMaintenceScreen from "../../screens/Error/SystemUnderMaintence"
import LoadingScreen from "../../screens/Loading/LoadingScreen"
import GenerateGlobalStyle from "./GlobalStyles"

type GlobalPropsType = {
    systemStyle : SystemStyle,
    systemUnderMaintence : boolean,
}

const GlobalProps = createContext<GlobalPropsType | null>(null)

type InitialFetchProps = {
    children: JSX.Element
}

export default function InitialFetch({ children } : InitialFetchProps) {
    const [ globalProps, setGlobalProps ] = useState<GlobalPropsType | null>(null)
    let globalStyle = GenerateGlobalStyle(globalProps?.systemStyle)

    useEffect(() => {
        const fetchAll = async () => {
            const systemUnderMaintence = await SystemEndpoints.VerifySystemMaintence()
            const systemStyles = await SystemEndpoints.GetStyle()

            setGlobalProps({
                systemStyle: systemStyles,
                systemUnderMaintence: systemUnderMaintence
            })
        }

        if (IsNil(globalProps))
            fetchAll()
    }, [globalProps])

    if (!IsNil(globalProps)) {
        if (globalProps?.systemUnderMaintence) {
            return (
                <GlobalProps.Provider value={ globalProps }>
                    { globalStyle }
                    <SystemUnderMaintenceScreen />
                </GlobalProps.Provider>
            )
        }
    }

    if (IsNil(globalProps))
        return (<LoadingScreen />)

    return (
        <GlobalProps.Provider value={ globalProps }>
            { globalStyle }
            { children }
        </GlobalProps.Provider>
    )
}

function GetGlobalProps() { return useContext(GlobalProps) }

function GetSystemStyle() {
    const systemStyles = useContext(GlobalProps)?.systemStyle

    return IsNil(systemStyles)
        ? new SystemStyle(DefaultSystemStyle)
        : systemStyles!
}

export { GetGlobalProps, GetSystemStyle }