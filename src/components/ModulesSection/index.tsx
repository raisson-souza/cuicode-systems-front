import { Link, useNavigate } from "react-router-dom"
import { Tooltip } from "@mui/material"

import { GetSystemStyle } from "../InitialFetch"

import { GetUserAuthorizedModulesResponse } from "../../services/AuthEndpoints"

import ModulesAssetsSvg from "../../assets/modules/ModulesAssetsSvg"

import "./styles.css"

type ModulesSectionProps = {
    modules : GetUserAuthorizedModulesResponse[]
}

export default function ModulesSection({
    modules,
} : ModulesSectionProps) {
    const systemStyle = GetSystemStyle()
    const navigate = useNavigate()

    return (
        <div
            className="modules-section"
            style={{
                width: '100%',
            }}
        >
            {
                modules.map((module, i) => (
                    <div
                        key={ i }
                        className="module"
                    >
                        { ModulesAssetsSvg({
                            moduleEnum: module.moduleEnum,
                            fill: systemStyle.TextColor,
                            cursor: "pointer",
                            customStyle: {
                                padding: 3,
                                backgroundColor: systemStyle.PrimaryColor,
                                borderRadius: 10
                            },
                            onClick: () => { navigate(`/${ module.moduleUrl }`) }
                        }) }
                        <Tooltip title={ `Módulo ${ module.ModuleName }` }>
                            <p>
                                <b>
                                    <Link to={ `/${ module.moduleUrl }` }>
                                        { module.ModuleName }
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