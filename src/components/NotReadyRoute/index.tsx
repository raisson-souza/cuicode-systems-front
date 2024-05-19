import { useLocation } from "react-router-dom"

import ModulesAssetsSvg from "../../assets/modules/ModulesAssetsSvg"

import ScreenBox from "../ScreenBox"

import { GetSystemStyle } from "../InitialFetch"

import ModulesEnum from "../../data/enums/ModulesEnum"
import NotFoundScreen from "../../screens/Error/NotFound"

export default function NotReadyRoute() {
    const moduleName = useLocation().pathname.replace('/', '')
    const systemStyles = GetSystemStyle()

    const detectModule = () => {
        switch (moduleName) {
            case "users":
            case "groups":
            case "boards":
            case "morfeus":
            case "chats":
            case "solicitations":
            case "operational":
            case "cron":
            case "hestia":
            case "minerva":
            case "donation":
            case "cuiPoints":
            case "anansi":
            case "zeus":
                return true
            default:
                return false
        }
    }

    const parseModuleNameToModuleEnum = () => {
        switch (moduleName) {
            case "users":
                return ModulesEnum.Users
            case "groups":
                return ModulesEnum.Groups
            case "boards":
                return ModulesEnum.Board
            case "morfeus":
                return ModulesEnum.Morfeus
            case "chats":
                return ModulesEnum.Chats
            case "solicitations":
                return ModulesEnum.Solicitations
            case "operational":
                return ModulesEnum.Operational
            case "cron":
                return ModulesEnum.Cron
            case "hestia":
                return ModulesEnum.Hestia
            case "minerva":
                return ModulesEnum.Minerva
            case "donation":
                return ModulesEnum.Donation
            case "cuiPoints":
                return ModulesEnum.CuiPoints
            case "anansi":
                return ModulesEnum.Anansi
            case "zeus":
                return ModulesEnum.Zeus
            default:
                return ModulesEnum.Board
        }
    }

    const parseModuleNamePtBr = () => {
        switch (moduleName) {
            case "users":
                return "Usuários"
            case "groups":
                return "Grupos"
            case "boards":
                return "Board"
            case "morfeus":
                return "Morfeus"
            case "chats":
                return "Chats"
            case "solicitations":
                return "Solicitações"
            case "operational":
                return "Operacional"
            case "cron":
                return "Cronos"
            case "hestia":
                return "Héstia"
            case "minerva":
                return "Minerva"
            case "donation":
                return "Doações"
            case "cuiPoints":
                return "CuiPoints"
            case "anansi":
                return "Anansi"
            case "zeus":
                return "Zeus"
            default:
                return "-"
        }
    }

    const isModuleRoute = detectModule()

    return isModuleRoute
        ? (
            <ScreenBox>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '15px'
                }}>
                    { 
                        ModulesAssetsSvg({
                            moduleEnum: parseModuleNameToModuleEnum(),
                            size: 120,
                            fill: systemStyles.TextColor
                        })
                    }
                    <h2>Módulo { parseModuleNamePtBr() } ainda não desenvolvido.</h2>
                </div>
            </ScreenBox>
        )
        : <NotFoundScreen />
}