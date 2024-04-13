export default class Response<T> {
    Success : boolean
    Data : T
    Length : number
    Action : string
    ErrorMessage? : string

    constructor(data : any) {
        this.Success = data["success"]
        this.Length = data["length"]
        this.Action = data["action"]
        this.Data = this.Success ? data["data"] : null
        this.ErrorMessage = this.Success ? null : data["data"]
    }
}