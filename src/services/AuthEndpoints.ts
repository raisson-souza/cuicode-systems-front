import Env from "../config/Env"
import Response from "../data/classes/Response"

export default abstract class AuthEndpoints
{
    static async ValidateJwt(jwt : string) {
        const url = `${ Env.BaseBack }/validate_jwt?jwt=${ jwt }`

        const response = await fetch(url, { mode: "cors", method: "GET" })
            .then(async (res) => {
                return new Response(await res.json())
            })

        return response
    }
}