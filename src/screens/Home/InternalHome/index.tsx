import { useEffect, useState } from "react"

import { GetUserAuth } from "../../../components/ProtectedRoute"
import ModulesSection from "../../../components/ModulesSection"
import ScreenBox from "../../../components/ScreenBox"
import UserDailyInfo from "../../../components/UserDailyInfo"

import LocalStorage from "../../../data/classes/LocalStorage"

import AuthEndpoints, { GetUserAuthorizedModulesResponse } from "../../../services/AuthEndpoints"

import ShouldFetch from "../../../functions/Routes/ShouldFetch"

import "./styles.css"

export default function InternalHomeScreen() {
    // TODO: armazenar no context global e tratar com ShouldFetch
    const [ modules, setModules ] = useState<GetUserAuthorizedModulesResponse[]>([])
    const userAuth = GetUserAuth()

    useEffect(() => {
        const fetchModules = async () => {
            const userModulesResponse = await AuthEndpoints.GetUserAuthorizedModules()
            setModules(userModulesResponse.Data)
            LocalStorage.SetAuthorizedModules(JSON.stringify(userModulesResponse.Data))
        }

        if (ShouldFetch({
            key: 'authorized_modules',
            time: 5,
        })) {
            fetchModules()
            return
        }

        setModules(LocalStorage.GetAuthorizedModules())
    }, [])

    return (
        <ScreenBox
            sectionComponent={ ModulesSection({ modules: modules }) }
            sectionBorderRadius={ 30 }
        >
            <main id="internal-home">
                <header>
                    <h2>Bem { userAuth?.UserAuth.Sex === "male" ? "vindo" : "vinda" } de volta, { userAuth?.UserAuth.Name }!</h2>
                </header>
                <UserDailyInfo />
            </main>
        </ScreenBox>
    )
}