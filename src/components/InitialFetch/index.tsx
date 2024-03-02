import { createContext, useContext, useEffect, useState } from "react"
import SystemStyle from "../../data/classes/SystemStyle"
import SystemEndpoints from "../../services/SystemEndpoints"
import IsNil from "../../functions/IsNil"
import { useNavigate } from "react-router-dom"

type GlobalPropsType = {
    systemStyle : SystemStyle,
    systemUnderMaintence : boolean,
}

const GlobalProps = createContext<GlobalPropsType | null>(null)

type InitialFetchProps = {
    children: JSX.Element
}

export default function InitialFetch({ children } : InitialFetchProps) {
    const navigate = useNavigate()
    const [ globalProps, setGlobalProps ] = useState<GlobalPropsType | null>(null)

    useEffect(() => {
        const fetchAll = async () => {
            const systemStyles = await SystemEndpoints.GetStyle()
            const systemUnderMaintence = await SystemEndpoints.VerifySystemMaintence()

            setGlobalProps({
                systemStyle: systemStyles,
                systemUnderMaintence: systemUnderMaintence
            })
        }

        if (IsNil(globalProps))
            fetchAll()
    }, [globalProps])

    if (globalProps?.systemUnderMaintence)
        navigate('/system_under_maintence', { replace: true })

    return (
        <GlobalProps.Provider value={ globalProps }>
            { children }
        </GlobalProps.Provider>
    )
}

function GetGlobalProps() { return useContext(GlobalProps) }

export { GetGlobalProps }