import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { CircularProgress } from "@mui/material"
import { GetSystemStyle } from "../../../components/InitialFetch"
import { GetUserAuth } from "../../../components/ProtectedRoute"
import ModalMessage from "../../../components/ModalMessage"
import ScreenBox from "../../../components/ScreenBox"
import UserDailyInfo from "../../../components/UserDailyInfo"
import UserPhoto from "../../../components/UserPhoto"

import LocalStorage from "../../../data/classes/LocalStorage"
import User from "../../../data/classes/User"

import AuthEndpoints from "../../../services/AuthEndpoints"
import SystemEndpoints from "../../../services/SystemEndpoints"

import IsNil from "../../../functions/IsNil"
import PermissionLevelFormatter from "../../../functions/Formatting/PermissionLevelFormatter"
import ShouldFetch from "../../../functions/Routes/ShouldFetch"

import { GetUserAuthorizedModulesResponse } from "../../../services/types/AuthEndpointsProps"

import "./styles.css"

export default function InternalHomeScreen() {
    useEffect(() => { document.title = "CuiCode Systems - Home" }, [])
    // TODO: armazenar no context global e tratar com ShouldFetch
    // eslint-disable-next-line
    const [ _, setModules ] = useState<GetUserAuthorizedModulesResponse[]>([])
    const [ lastRegisteredUser, setLastRegisteredUser ] = useState<User | null>(null)

    /** STATES DOS MODAIS */
    const [ openBugModal, setOpenBugModal ] = useState(false)
    const [ openSugestionModal, setopenSugestionModal ] = useState(false)
    const [ openContactModal, setopenContactModal ] = useState(false)

    const userAuth = GetUserAuth()
    const userLevelFormatted = PermissionLevelFormatter(userAuth?.UserAuth.PermissionLevel)
    const systemStyle = GetSystemStyle()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchModules = async () => { // TODO: Refatorar conforme issue 20
            const userModulesResponse = await AuthEndpoints.GetUserAuthorizedModules()
            setModules(userModulesResponse.Data)
            LocalStorage.SetAuthorizedModules(JSON.stringify(userModulesResponse.Data))
        }
        const fetchLastRegisteredUser = async () => { // TODO: Refatorar conforme issue 20
            const lastRegisteredUserResponse = await SystemEndpoints.GetLastRegisteredUser()
            setLastRegisteredUser(new User(lastRegisteredUserResponse.Data))
            LocalStorage.SetLastRegisteredUser(new User(lastRegisteredUserResponse.Data))
        }

        if (ShouldFetch({ // TODO: Refatorar conforme issue 20
            key: 'authorized_modules',
            time: 5,
        })) {
            fetchModules()
            return
        }
        if (ShouldFetch({ // TODO: Refatorar conforme issue 20
            key: 'last_registered_user',
            time: 1,
            timeType: "hour"
        })) {
            fetchLastRegisteredUser()
            return
        }

        const localStorageModules = LocalStorage.GetAuthorizedModules()
        const localLastRegisteredUser = LocalStorage.GetLastRegisteredUser()

        if (!IsNil(localStorageModules)) setModules(localStorageModules!)
        if (!IsNil(localLastRegisteredUser)) setLastRegisteredUser(localLastRegisteredUser!)
    }, [])

    const modalButtonsStyle = {
        "fontSize": 18,
        "backgroundColor": systemStyle.SecondaryColor,
        "border": 0,
        "borderRadius": 15,
        "padding": 5
    }

    const userLevelStyle = {
        "color": systemStyle.TerciaryColor,
        "textShadow": `0 0 5px ${ systemStyle.TextColor }`,
        "fontSize": 24,
        "fontWeight": "bold",
        "cursor": userAuth!.UserAuth.PermissionLevelId! >= 3
            ? "pointer"
            : "auto"
    }

    return (
        <ScreenBox>
            <main id="internal-home">
                <header id="greetings">
                    <h2>Bem { userAuth?.UserAuth.Sex === "male" ? "vindo" : "vinda" } de volta, { userAuth?.UserAuth.Name }!</h2>
                </header>
                <UserDailyInfo />
                <div
                    id="user-level"
                    style={{ backgroundColor: systemStyle.PrimaryColor }}
                >
                    <p style={{ fontSize: 20 }}><b>{ "Seu nível é " }</b></p>
                    <p
                        style={ userLevelStyle }
                        onClick={ () => {
                            if (userAuth!.UserAuth.PermissionLevelId! >= 3)
                                navigate("/operational")
                        }}
                    >
                        { userLevelFormatted.toUpperCase() }
                    </p>
                </div>
                <div
                    id="last-registered-user"
                    style={{ backgroundColor: systemStyle.PrimaryColor }}
                >
                    <p>último usuário cadastrado no sistema</p>
                    <div id="last-registered-user-content">
                        { 
                            IsNil(lastRegisteredUser)
                                ? <CircularProgress />
                                : (
                                    <>
                                        <UserPhoto
                                            userName={ lastRegisteredUser?.Name }
                                            userPhoto={ lastRegisteredUser?.Photo }
                                        />
                                        <p><b>{ lastRegisteredUser?.Username }</b></p>
                                    </>
                                )
                        }
                    </div>
                </div>
                <div
                    id="contacts"
                    style={{ backgroundColor: systemStyle.PrimaryColor }}
                >
                    <BugFoundModal state={ openBugModal } setState={ setOpenBugModal } />
                    <SugestionModal state={ openSugestionModal } setState={ setopenSugestionModal } />
                    <ContactModal state={ openContactModal } setState={ setopenContactModal } />
                    <button style={ modalButtonsStyle } onClick={ () => setOpenBugModal(true) }>
                        <b>ACHEI UM BUG</b>
                    </button>
                    <button style={ modalButtonsStyle } onClick={ () => setopenSugestionModal(true) }>
                        <b>TENHO UMA SUGESTÃO</b>
                    </button>
                    <button style={ modalButtonsStyle } onClick={ () => setopenContactModal(true) }>
                        <b>FALAR COM O DESENVOLVEDOR</b>
                    </button>
                </div>
            </main>
        </ScreenBox>
    )
}

type ModalProps = {
    state : boolean
    setState : React.Dispatch<React.SetStateAction<boolean>>
}

const BugFoundModal = ({ state, setState } : ModalProps) => {
    return (
        <ModalMessage
            open={ state }
            setOpen={ setState }
        >
            <div>
                Modal "bugs encontrados" não desenvolvido.
            </div>
        </ModalMessage>
    )
}

const SugestionModal = ({ state, setState } : ModalProps) => {
    return (
        <ModalMessage
            open={ state }
            setOpen={ setState }
        >
            <div>
                Modal "sugestões" não desenvolvido.
            </div>
        </ModalMessage>
    )
}

const ContactModal = ({ state, setState } : ModalProps) => {
    return (
        <ModalMessage
            open={ state }
            setOpen={ setState }
        >
            <div>
                Modal "contato" não desenvolvido.
            </div>
        </ModalMessage>
    )
}