export default class Response {
    Success : boolean
    Data : any
    Length : number
    Action : string

    constructor(data : any) {
        this.Success = data["success"]
        this.Data = data["data"]
        this.Length = data["length"]
        this.Action = data["action"]
    }
}