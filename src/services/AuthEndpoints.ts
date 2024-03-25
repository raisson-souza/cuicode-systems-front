import Endpoints from "./base/Endpoints"

import User from "../data/classes/User"

export default abstract class AuthEndpoints extends Endpoints
{
    static async ValidateJwt(jwt : string) {
        try
        {
            return await this.Get(`/validate_jwt?jwt=${ jwt }`)
        }
        catch
        {
            return this.FailFetchResponse
        }
    }

    static async Login(email : string, password : string) {
        try
        {
            const body = { "email": email, "password": password }
            return this.Post('/login', body)
        }
        catch
        {
            return this.FailFetchResponse
        }
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

export type {
    ValidateJwtResponse,
    LoginResponse,
}