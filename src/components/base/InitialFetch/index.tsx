import { createContext, useContext, useEffect, useState } from "react"

import DefaultSystemStyle from "../../../data/defaultStyle"
import LocalStorage from "../../../data/classes/LocalStorage"
import SystemEndpoints from "../../../services/SystemEndpoints"
import SystemStyle from "../../../data/classes/SystemStyle"

import GlobalStyle from "../GlobalStyle"
import LoadingScreen from "../../../screens/Loading/LoadingScreen"
import SystemUnderMaintenceScreen from "../../../screens/Error/SystemUnderMaintence"

import IsNil from "../../../functions/IsNil"
import ShouldFetch from "../../../functions/Routes/ShouldFetch"

type GlobalPropsContextType = {
    systemStyle : SystemStyle | null
}

const GlobalPropsContext = createContext<GlobalPropsContextType | undefined>(undefined)

export function GetGlobalPropsContext() {
    return useContext(GlobalPropsContext)
}

type InitialFetchProps = {
    children: JSX.Element
}

export default function InitialFetch({ children } : InitialFetchProps) {
    useEffect(() => { document.title = "CuiCode Systems" }, [])

    const [ systemStyle, setSystemStyle ] = useState<SystemStyle | null>(null)
    const [ systemUnderMaintence, setSystemUnderMaintence ] = useState<boolean>(false)
    const [ loading, setLoading ] = useState<boolean>(true)

    const globalPropsContext : GlobalPropsContextType = {
        systemStyle: systemStyle,
    }

    useEffect(() => {
        const fetchSystemUnderMaintence = async () => {
            const systemUnderMaintenceResponse = await SystemEndpoints.VerifySystemMaintence()
            setSystemUnderMaintence(!systemUnderMaintenceResponse.Success)
            setLoading(false)
        }
        const fetchSystemStyles = async () => {
            const systemStylesResponse = await SystemEndpoints.GetStyle()
            LocalStorage.SetSystemStyle(systemStylesResponse)
            setSystemStyle(systemStylesResponse)
        }

        const defineSystemStyles = () => {
            if (ShouldFetch({
                key: "system_style",
                time: 5
            })) { fetchSystemStyles() }
            else {
                setSystemStyle(LocalStorage.GetSystemStyle())
            }
        }

        defineSystemStyles()
        fetchSystemUnderMaintence()
    }, [])

    if (loading)
        return (<LoadingScreen />)

    if (systemUnderMaintence) {
        return (
            <GlobalPropsContext.Provider value={ globalPropsContext }>
                <GlobalStyle>
                    <SystemUnderMaintenceScreen />
                </GlobalStyle>
            </GlobalPropsContext.Provider>
        )
    }

    return (
        <GlobalPropsContext.Provider value={ globalPropsContext }>
            <GlobalStyle>
                { children }
            </GlobalStyle>
        </GlobalPropsContext.Provider>
    )
}

function GetSystemStyle() {
    const contextSystemStyle = useContext(GlobalPropsContext)?.systemStyle
    if (!IsNil(contextSystemStyle))
        return contextSystemStyle!
    else if (!ShouldFetch({
        key: "system_style",
        time: 5
    })) {
        const localStorageSystemStyle = LocalStorage.GetSystemStyle()
        return !IsNil(localStorageSystemStyle)
            ? localStorageSystemStyle!
            : new SystemStyle(DefaultSystemStyle)
    }
    return new SystemStyle(DefaultSystemStyle)
}

export { GetSystemStyle }