import IsNil from "../IsNil"

export default function DefineShadow(shadowColor1 : string, shadowColor2? : string) {
    return IsNil(shadowColor1)
        ? `5px 5px 10px ${ shadowColor1 }, -5px -5px 10px ${ shadowColor1 }`
        : `5px 5px 10px ${ shadowColor1 }, -5px -5px 10px ${ shadowColor2 }`
}