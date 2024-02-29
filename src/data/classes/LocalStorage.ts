import IsNil from "../../functions/IsNil"

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
}