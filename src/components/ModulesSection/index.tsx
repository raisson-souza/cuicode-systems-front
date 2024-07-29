import { Link, useLocation, useNavigate } from "react-router-dom"
import { Tooltip } from "@mui/material"

import { GetSystemStyle } from "../InitialFetch"

import ModulesAssetsSvg from "../../assets/modules/ModulesAssetsSvg"

import { GetUserAuthorizedModulesResponse } from "../../services/types/AuthEndpointsProps"

import "./styles.css"

type ModulesSectionProps = {
    modules : GetUserAuthorizedModulesResponse[]
}

export default function ModulesSection({
    modules,
} : ModulesSectionProps) {
    const systemStyle = GetSystemStyle()
    const navigate = useNavigate()
    const actualModuleName = useLocation().pathname.replace("/", "")
    const actualModuleId : number = modules.findIndex(module => {
        return module.moduleUrl === actualModuleName
    })

    const chosedModuleStyle = {
        "border": `1px solid ${ systemStyle.PrimaryColor }`,
        "borderRadius": '5px'
    }

    return (
        <div
            className="modules-section"
            style={{
                boxShadow: systemStyle.DefineBasicShadow()
            }}
        >
            {
                modules.map((module, i) => (
                    <div
                        key={ i }
                        className="module"
                        style={ 
                            actualModuleId === i
                                ? chosedModuleStyle
                                : {}
                        }
                    >
                        { ModulesAssetsSvg({
                            moduleEnum: module.moduleEnum,
                            fill: systemStyle.TextColor,
                            cursor: "pointer",
                            onClick: () => { navigate(`/${ module.moduleUrl }`) }
                        }) }
                        <Tooltip title={ `Módulo ${ module.moduleName }` }>
                            <p>
                                <b>
                                    <Link
                                        to={ `/${ module.moduleUrl }` }
                                        style={{
                                            textDecoration: "none"
                                        }}
                                    >
                                        { module.moduleName }
                                    </Link>
                                </b>
                            </p>
                        </Tooltip>
                    </div>
                ))
            }
        </div>
    )
}