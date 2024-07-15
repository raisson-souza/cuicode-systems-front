import env from "../../config/Env"

import LocalStorage from "../../data/classes/LocalStorage"
import Response from "../../data/classes/Response"

import AuthorizationTypeEnum from "../../data/enums/AuthorizationTypeEnum"

import {
    DefaultErrorResponseProps,
    DeleteProps,
    GetProps,
    PostProps,
    PostRequestProps,
    PutProps
} from "./EndpointsProps"

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

    private static MountHeaders = (headers : any, authorizationType : AuthorizationTypeEnum) => {
        return {
            ...headers,
            "Authorization": authorizationType === AuthorizationTypeEnum.User
                ? LocalStorage.GetToken() ?? ""
                : env.SystemKey()
        }
    }

    static async Get<T>({
        url,
        headers = this.DefaultHeaders,
        authorizationType
    } : GetProps) {
        try
        {
            return await fetch(
                `${ env.BackendBaseUrl() }${ url }`,
                {
                    method: 'GET',
                    headers: this.MountHeaders(headers, authorizationType)
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

    private static async PostRequest<T>(props : PostRequestProps) {
        try
        {
            const { authorizationType, body, method, url, headers } = props
            return await fetch(
                `${ env.BackendBaseUrl() }${ url }`,
                {
                    method: method,
                    body: JSON.stringify(body),
                    headers: this.MountHeaders(headers, authorizationType)
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
        authorizationType
    } : PostProps) {
        return await this.PostRequest<T>({
            method: "POST",
            body: body,
            url: url,
            headers: headers,
            authorizationType: authorizationType
        })
    }

    static async Put<T>({
        url,
        body,
        headers = this.DefaultHeaders,
        authorizationType
    } : PutProps) {
        return await this.PostRequest<T>({
            method: "PUT",
            body: body,
            url: url,
            headers: headers,
            authorizationType: authorizationType
        })
    }

    static async Delete<T>({
        url,
        body,
        headers = this.DefaultHeaders,
        authorizationType
    } : DeleteProps) {
        return await this.PostRequest<T>({
            method: "DELETE",
            body: body,
            url: url,
            headers: headers,
            authorizationType: authorizationType
        })
    }
}