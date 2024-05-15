import IsNil from "../IsNil"

type ShouldFetchProps = {
    /** Chave de identificação da configuração de fetch */
    key : string
    /** Período máximo para não fazer requisição */
    time : number
    /** Tipo de tempo */
    timeType? : 'min' | 'hour' | 'day'
}

/**
 * Gerencia a chamada de uma requisição baseado no tempo máximo para manter um dado original já armazenado
 */
export default function ShouldFetch({
    key,
    time,
    timeType = 'min'
} : ShouldFetchProps) : boolean {
    // O valor do fetch é buscado, caso não exista libera a requisição
    const stringValue = localStorage.getItem(key)
    if (IsNil(stringValue)) return true

    const lastFetchTime = localStorage.getItem(`${ key }_fetch`)

    const now = Date.now()
    const parsedTime = Number.parseInt(lastFetchTime!)

    switch (timeType) {
        case "day":
            return (now - parsedTime) > (86400000 * time)
        case "hour":
            return (now - parsedTime) > (3600000 * time)
        case "min":
            return (now - parsedTime) > (60000 * time)
        default:
            return true
    }
}