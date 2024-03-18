import SystemStyle from "../../data/classes/SystemStyle"

export default function DefineLinearGradient(systemStyle : SystemStyle, threeColors : boolean = true) {
    return threeColors
        ? `linear-gradient(220deg, ${ systemStyle.BackgroundPrimaryColor }, ${ systemStyle.BackgroundSecondaryColor }, ${ systemStyle.BackgroundTerciaryColor })`
        : `linear-gradient(220deg, ${ systemStyle.BackgroundPrimaryColor }, ${ systemStyle.BackgroundSecondaryColor })`
}