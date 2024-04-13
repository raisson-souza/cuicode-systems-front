import Endpoints from "./base/Endpoints"

import User from "../data/classes/User"

type LoginRequestProps = {
    email : string
    password : string
}

export default abstract class AuthEndpoints extends Endpoints
{
    static async ValidateJwt(jwt : string) {
        return await this.Get<ValidateJwtResponse>({
            url: `/validate_jwt?jwt=${ jwt }`
        })
    }

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

    // get_modules endpoint
}

type ValidateJwtResponse = {
    ok : boolean,
    user : User,
}

type LoginResponse = {
    token : string,
    user : User,
}