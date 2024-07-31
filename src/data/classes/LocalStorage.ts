import IsNil from "../../functions/IsNil"

import { GetUserAuthorizedModulesResponse } from "../../services/types/AuthEndpointsProps"
import { GetUserDailyInfoResponse } from "../../services/types/UserEndpointsProps"

import User from "./User"

export default abstract class LocalStorage
{
    static GetToken() {
        const token = localStorage.getItem('cuicode_systems_user_token')
        return IsNil(token)
            ? null
            : token
    }

    static SetToken(jwt : string) {
        localStorage.setItem('cuicode_systems_user_token', jwt)
    }

    static RemoveToken() {
        localStorage.removeItem('cuicode_systems_user_token')
    }

    static GetCredentials() {
        return {
            "email": localStorage.getItem('cuicode_systems_user_email'),
            "password": localStorage.getItem('cuicode_systems_user_password')
        }
    }

    static SetCredentials(email : string, password : string) {
        localStorage.setItem('cuicode_systems_user_email', email)
        localStorage.setItem('cuicode_systems_user_password', password)
    }

    static RemoveCredentials() {
        localStorage.removeItem('cuicode_systems_user_email')
        localStorage.removeItem('cuicode_systems_user_password')
    }

    static LogOff() {
        this.RemoveToken()
        this.RemoveCredentials()
        localStorage.removeItem('user_daily_info')
        localStorage.removeItem('user_daily_info_fetch')
        localStorage.removeItem('authorized_modules')
        localStorage.removeItem('authorized_modules_fetch')
    }

    static SetUserDailyInfo(userDailyInfo : string) {
        localStorage.setItem('user_daily_info', userDailyInfo)
        localStorage.setItem('user_daily_info_fetch', `${ Date.now() }`)
    }

    static GetUserDailyInfo() : GetUserDailyInfoResponse | null {
        const userDailyInfoLocalStorage = localStorage.getItem('user_daily_info')
        if (IsNil(userDailyInfoLocalStorage)) return null

        return JSON.parse(userDailyInfoLocalStorage!) as GetUserDailyInfoResponse
    }

    static SetAuthorizedModules(authorizedModules : string) {
        localStorage.setItem('authorized_modules', authorizedModules)
        localStorage.setItem('authorized_modules_fetch', `${ Date.now() }`)
    }

    static GetAuthorizedModules() : GetUserAuthorizedModulesResponse[] | null {
        const authorizedModulesLocalStorage = localStorage.getItem('authorized_modules')
        if (IsNil(authorizedModulesLocalStorage)) return null

        return JSON.parse(authorizedModulesLocalStorage!) as GetUserAuthorizedModulesResponse[]
    }

    static SetLastRegisteredUser(user : User) {
        localStorage.setItem('last_registered_user', JSON.stringify(user))
        localStorage.setItem('last_registered_user_fetch', `${ Date.now() }`)
    }

    static GetLastRegisteredUser() : User | null {
        const user = localStorage.getItem('last_registered_user')
        if (IsNil(user)) return null

        return JSON.parse(user!) as User
    }
}