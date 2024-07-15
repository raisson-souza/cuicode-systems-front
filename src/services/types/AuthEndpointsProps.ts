import User from "../../data/classes/User"

import ModulesEnum from "../../data/enums/ModulesEnum"

type RefreshTokenResponse = {
    newToken : string
    user : User
}

type LoginResponse = {
    token : string
    user : User
}

type GetUserAuthorizedModulesResponse = {
    /** Identificação do módulo */
    moduleEnum : ModulesEnum
    /** URL do módulo */
    moduleUrl : string
    /** Módulo já acessado (define novidade no frontend) */
    usedModule : boolean
    /** Nome do módulo */
    moduleName : string
    /** Módulo ativo */
    activeModule : boolean
}

export type {
    GetUserAuthorizedModulesResponse,
    RefreshTokenResponse,
    LoginResponse,
}