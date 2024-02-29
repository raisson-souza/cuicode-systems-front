import Env from "../config/Env"
import Response from "../data/classes/Response"
import Endpoints from "./base/Endpoints"

export default abstract class AuthEndpoints extends Endpoints
{
    static async ValidateJwt(jwt : string) {
        try
        {
            const url = `${ Env.BaseBack }/validate_jwt?jwt=${ jwt }`
    
            const response = await fetch(url, { mode: "cors", method: "GET" })
                .then(async (res) => {
                    return new Response(await res.json())
                })
    
            return response
        }
        catch
        {
            return this.FailFetchResponse
        }
    }

    static async Login(email : string, password : string) {
        try
        {
            const url = `${ Env.BaseBack }/login`

            const body = JSON.stringify({ "email": email, "password": password })

            const response = await fetch(url, { method: "POST", body: body, headers: this.DefaultHeaders })
                .then(async (res) => {
                    return new Response(await res.json())
                })

            return response
        }
        catch
        {
            return this.FailFetchResponse
        }
    }
}