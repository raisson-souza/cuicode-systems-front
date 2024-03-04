import IsNil from "./IsNil"

export default function FindValue
(
    body : any,
    keys : string[]
) : any | null
{
    let value : any = null

    keys.every(key => {
        if (!IsNil(body[key]))
        {
            value = body[key]
            return false
        }
        return true
    })

    return value
}