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
    TextColor : string
    StyleName : string

    constructor(data : any) {
        this.HeaderColor = data["HeaderColor"]
        this.FooterColor = data["FooterColor"]
        this.Logo = "../../assets/cuicode_systems_logo.png"
        this.ModulesColumnColor = data["ModulesColumnColor"]
        this.BackgroundPrimaryColor = data["BackgroundPrimaryColor"]
        this.BackgroundSecondaryColor = data["BackgroundSecondaryColor"]
        this.BackgroundTerciaryColor = data["BackgroundTerciaryColor"]
        this.PrimaryColor = data["PrimaryColor"]
        this.SecondaryColor = data["SecondaryColor"]
        this.TextColor = data["TextColor"]
        this.StyleName = data["StyleName"]
    }
}