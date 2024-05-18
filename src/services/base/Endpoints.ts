import env from "../../config/Env"

import LocalStorage from "../../data/classes/LocalStorage"
import Response from "../../data/classes/Response"

type DefaultRequestProps = {
    url : string
    headers? : any
    hasAuthorization? : boolean
}

type GetProps = DefaultRequestProps

type PostProps = {
    body : any
} & DefaultRequestProps

type PutProps = PostProps

type DeleteProps = PostProps

type DefaultErrorResponseProps = {
    data : null
    errorMessage : string
    length : number
    success : boolean
    action : string
}

export default abstract class Endpoints
{
    private static DefaultErrorResponse(msg : string) : DefaultErrorResponseProps {
        return {
            data: null,
            length: 0,
            errorMessage: msg,
            success: false,
            action: ""
        }
    }

    private static DefaultHeaders = { 'Content-Type': 'application/json' }

    private static MountHeaders = (headers : any, hasAuthorization : boolean) => {
        return hasAuthorization
            ? {
                ...headers,
                "Authorization": `Bearer ${ LocalStorage.GetToken() }`
            }
            : headers
    }

    static async Get<T>({
        url,
        headers = this.DefaultHeaders,
        hasAuthorization = false
    } : GetProps) {
        try
        {
            return await fetch(
                `${ env.BackendBaseUrl() }${ url }`,
                {
                    method: 'GET',
                    headers: this.MountHeaders(headers, hasAuthorization)
                }
            )
            .then(async (res) => {
                return new Response<T>(await res.json())
            })
        }
        catch (ex)
        {
            return new Response<T>(this.DefaultErrorResponse((ex as Error).message))
        }
    }

    private static async PostRequest<T>(
        method : "POST" | "PUT" | "DELETE",
        {
            body,
            url,
            headers,
            hasAuthorization = false
        } : PostProps
    ) {
        try
        {
            return await fetch(
                `${ env.BackendBaseUrl() }${ url }`,
                {
                    method: method,
                    body: JSON.stringify(body),
                    headers: this.MountHeaders(headers, hasAuthorization)
                }
            )
            .then(async (res) => {
                return new Response<T>(await res.json())
            })
        }
        catch (ex)
        {
            return new Response<T>(this.DefaultErrorResponse((ex as Error).message))
        }
    }

    static async Post<T>({
        url,
        body,
        headers = this.DefaultHeaders,
        hasAuthorization = false
    } : PostProps) {
        return await this.PostRequest<T>(
            "POST",
            {
                body: body,
                url: url,
                headers: headers,
                hasAuthorization
            }
        )
    }

    static async Put<T>({
        url,
        body,
        headers = this.DefaultHeaders,
        hasAuthorization = false
    } : PutProps) {
        return await this.PostRequest<T>(
            "PUT",
            {
                body: body,
                url: url,
                headers: headers,
                hasAuthorization
            }
        )
    }

    static async Delete<T>({
        url,
        body,
        headers = this.DefaultHeaders,
        hasAuthorization = false
    } : DeleteProps) {
        return await this.PostRequest<T>(
            "DELETE",
            {
                body: body,
                url: url,
                headers: headers,
                hasAuthorization
            }
        )
    }
}