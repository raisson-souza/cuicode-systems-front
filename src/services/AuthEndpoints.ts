import Endpoints from "./base/Endpoints"

import User from "../data/classes/User"

import ModulesEnum from "../data/enums/ModulesEnum"

type LoginRequestProps = {
    email : string
    password : string
}

export default abstract class AuthEndpoints extends Endpoints
{
    /** Realiza a validação de um JWT */
    static async ValidateJwt(jwt : string) {
        return await this.Get<ValidateJwtResponse>({
            url: `/validate_jwt?jwt=${ jwt }`
        })
    }

    /** Realiza o login do usuário */
    static async Login({
        email,
        password
    } : LoginRequestProps) {
        const body = { "email": email, "password": password }
        return await this.Post<LoginResponse>({
            url: '/login',
            body: body
        })
    }

    /** Captura os módulos disponíveis ao usuário */
    static async GetUserAuthorizedModules() {
        return await this.Get<GetUserAuthorizedModulesResponse[]>({
            url: '/user_authorized_modules',
            hasAuthorization: true
        })
    }
}

type ValidateJwtResponse = {
    ok : boolean,
    user : User,
}

type LoginResponse = {
    token : string,
    user : User,
}

type GetUserAuthorizedModulesResponse = {
    /** Identificação do módulo */
    moduleEnum : ModulesEnum
    /** URL do módulo */
    moduleUrl : string
    /** Módulo já acessado (define novidade no frontend) */
    usedModule : boolean
    /** Nome do módulo */
    ModuleName : string
}

export type {
    GetUserAuthorizedModulesResponse
}