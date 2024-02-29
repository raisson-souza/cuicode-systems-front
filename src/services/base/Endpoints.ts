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
}