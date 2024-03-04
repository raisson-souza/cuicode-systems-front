import Env from "../../config/Env"
import Response from "../../data/classes/Response"

export default abstract class Endpoints
{
    static FailFetchResponse : Response = new Response(
        {
            "success": false,
            "data": null,
            "length": 0,
            "action": ""
        }
    )

    static DefaultHeaders = { 'Content-Type': 'application/json' }

    static async Get(
        url : string,
        headers : any = this.DefaultHeaders
    ) {
        try
        {
            const response = await fetch(
                `${ Env.BaseBack }${ url }`,
                { headers: headers }
            )
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

    static async Post(
        url : string,
        body : any,
        headers : any = this.DefaultHeaders
    ) {
        try
        {
            const response = await fetch(
                `${ Env.BaseBack }${ url }`,
                {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: headers
                }
            )
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