import AuthorizationTypeEnum from "../../data/enums/AuthorizationTypeEnum"

type DefaultRequestProps = {
    url : string
    headers? : any
    
    authorizationType : AuthorizationTypeEnum
}

type GetProps = DefaultRequestProps

type PostProps = {
    body : any
} & GetProps

type PutProps = PostProps

type DeleteProps = PostProps

type DefaultErrorResponseProps = {
    data : null
    errorMessage : string
    length : number
    success : boolean
    action : string
}

type PostRequestProps = {
    method : "POST" | "PUT" | "DELETE"
} & PostProps

export type {
    GetProps,
    PostProps,
    PutProps,
    DeleteProps,
    DefaultErrorResponseProps,
    PostRequestProps,
}