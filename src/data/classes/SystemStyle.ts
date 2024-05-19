import IsNil from "../../functions/IsNil"

export default class SystemStyle
{
    HeaderColor : string
    FooterColor : string
    Logo : string
    ModulesColumnColor : string
    BackgroundPrimaryColor : string
    BackgroundSecondaryColor : string
    BackgroundTerciaryColor : string
    PrimaryColor : string
    SecondaryColor : string
    TerciaryColor : string
    TextColor : string
    StyleName : string
    OppositeTextColor : string

    constructor(data : any) {
        this.HeaderColor = data["HeaderColor"]
        this.FooterColor = data["FooterColor"]
        this.Logo = IsNil(data["Logo"])
            ? "../../assets/cuicode_systems_logo.png"
            : data["Logo"]
        this.ModulesColumnColor = data["ModulesColumnColor"]
        this.BackgroundPrimaryColor = data["BackgroundPrimaryColor"]
        this.BackgroundSecondaryColor = data["BackgroundSecondaryColor"]
        this.BackgroundTerciaryColor = data["BackgroundTerciaryColor"]
        this.PrimaryColor = data["PrimaryColor"]
        this.SecondaryColor = data["SecondaryColor"]
        this.TerciaryColor = data["TerciaryColor"]
        this.TextColor = data["TextColor"]
        this.StyleName = data["StyleName"]
        this.OppositeTextColor = data["TextColor"] === 'white' ? 'black' : 'white'
    }
}