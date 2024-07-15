import Endpoints from "./base/Endpoints"

import AuthorizationTypeEnum from "../data/enums/AuthorizationTypeEnum"
import {
    GetUserAuthorizedModulesResponse,
    LoginResponse,
    RefreshTokenResponse
} from "./types/AuthEndpointsProps"

type LoginRequestProps = {
    email : string
    password : string
}

export default abstract class AuthEndpoints extends Endpoints
{
    /** Realiza o refresh de um JWT */
    static async RefreshToken(jwt : string) {
        return await this.Get<RefreshTokenResponse>({
            url: `/auth/refresh_token?token=${ jwt }`,
            authorizationType: AuthorizationTypeEnum.User
        })
    }

    /** Realiza o login do usuário */
    static async Login({
        email,
        password
    } : LoginRequestProps) {
        const body = { "email": email, "password": password }
        return await this.Post<LoginResponse>({
            url: '/auth/login',
            body: body,
            authorizationType: AuthorizationTypeEnum.System
        })
    }

    /** Captura os módulos disponíveis ao usuário */
    static async GetUserAuthorizedModules() {
        return await this.Get<GetUserAuthorizedModulesResponse[]>({
            url: '/auth/user_authorized_modules',
            authorizationType: AuthorizationTypeEnum.User
        })
    }
}