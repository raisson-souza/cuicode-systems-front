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
}