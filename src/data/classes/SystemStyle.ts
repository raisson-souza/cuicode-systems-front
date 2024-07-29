export default class SystemStyle
{
    StyleName : string
    PrimaryColor : string
    SecondaryColor : string
    TerciaryColor : string
    BackgroundPrimaryColor : string
    BackgroundSecondaryColor : string
    HeaderColor : string
    ModulesColumnColor : string
    TextColor : string
    LogoColor : string
    LogoType : string
    OppositeTextColor : string

    constructor(data : any) {
        this.StyleName = data["StyleName"]
        this.PrimaryColor = data["PrimaryColor"]
        this.SecondaryColor = data["SecondaryColor"]
        this.TerciaryColor = data["TerciaryColor"]
        this.BackgroundPrimaryColor = data["BackgroundPrimaryColor"]
        this.BackgroundSecondaryColor = data["BackgroundSecondaryColor"]
        this.HeaderColor = data["HeaderColor"]
        this.ModulesColumnColor = data["ModulesColumnColor"]
        this.TextColor = data["TextColor"]
        this.LogoColor = data["LogoColor"]
        this.LogoType = data["LogoType"]
        this.OppositeTextColor = this.InvertedTextColor()
        this.TreatLogo()
    }

    /** Trata e aplica valor padrão para a configuração da logo. */
    private TreatLogo() {
        if (this.LogoColor !== "white" && this.LogoType !== "black")
            this.LogoColor = "black"

        if (this.LogoType !== "circle" && this.LogoType !== "left" && this.LogoType !== "right")
            this.LogoType = "left"
    }

    /** Captura o caminho da logo. */
    GetLogoPath() {
        switch (this.LogoColor)
        {
            case "white":
                switch (this.LogoType) {
                    case "circle":
                        return require("../../assets/logos/logo_white_circle.png")
                    case "left":
                        return require("../../assets/logos/logo_white_left.png")
                    case "right":
                        return require("../../assets/logos/logo_white_right.png")
                    default:
                        return require("../../assets/logos/logo_white_right.png")
                }
            case "black":
                switch (this.LogoType) {
                    case "circle":
                        return require("../../assets/logos/logo_black_circle.png")
                    case "left":
                        return require("../../assets/logos/logo_black_left.png")
                    case "right":
                        return require("../../assets/logos/logo_black_right.png")
                    default:
                        return require("../../assets/logos/logo_black_left.png")
                }
            default:
                return require("../../assets/logos/logo_black_left.png")
        }
    }

    /** Linear gradient das cores de background. */
    BackgroundLinearGradient() {
        return `linear-gradient(220deg, ${ this.BackgroundPrimaryColor }, ${ this.BackgroundSecondaryColor })`
    }

    /** Linear gradient das cores primárias. */
    PrimariesLinearGradient(threeColors : boolean = true) {
        return threeColors
            ? `linear-gradient(220deg, ${ this.PrimaryColor }, ${ this.SecondaryColor }, ${ this.TerciaryColor })`
            : `linear-gradient(220deg, ${ this.PrimaryColor }, ${ this.SecondaryColor })`
    }

    /** Captura o primeiro caractere hex de uma cor. */
    private GetFirstHexCaracter(color : string) {
        return color[1]
    }

    /** Retorna uma cor padrão oposta a cor do texto. */
    InvertedTextColor() {
        const hexCaracter = this.GetFirstHexCaracter(this.TextColor)

        switch (hexCaracter) {
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                return "white"
            case "a":
            case "b":
            case "c":
            case "d":
            case "e":
            case "f":
                return "black"
            default:
                return "black"
        }
    }

    // /** Retorna css de sombra para as cores de background. */
    // BackgroundShadowColor(backgroundColor = 1 | 2) {
    //     const hexCaracter = this.GetFirstHexCaracter(backgroundColor === 1 ? this.BackgroundPrimaryColor : this.BackgroundSecondaryColor)
    //     switch (hexCaracter) {
    //         case '1':
    //         case '2':
    //         case '3':
    //         case '4':
    //         case '5':
    //         case '6':
    //         case '7':
    //         case '8':
    //             return ['#000', '#818181']
    //         case '9':
    //         case 'A':
    //         case 'B':
    //         case 'C':
    //         case 'D':
    //         case 'E':
    //         case 'F':
    //             return ['#bebebe', '#ffffff']
    //         default:
    //             return ['#bebebe', '#ffffff']
    //     }
    // }

    // /** Retorna css de sombra para as cores primárias. */
    // PrimariesShadowColor(primaryColor = 1 | 2 | 3) {
    //     const hexCaracter = this.GetFirstHexCaracter(
    //         primaryColor === 1
    //             ? this.PrimaryColor
    //             : primaryColor === 2
    //                 ? this.SecondaryColor
    //                 : this.TerciaryColor
    //     )
    //     switch (hexCaracter) {
    //         case '1':
    //         case '2':
    //         case '3':
    //         case '4':
    //         case '5':
    //         case '6':
    //         case '7':
    //         case '8':
    //             return ['#000', '#818181']
    //         case '9':
    //         case 'A':
    //         case 'B':
    //         case 'C':
    //         case 'D':
    //         case 'E':
    //         case 'F':
    //             return ['#bebebe', '#ffffff']
    //         default:
    //             return ['#bebebe', '#ffffff']
    //     }
    // }

    // /** Define uma cor de sombra correspondente a uma ou duas cores. */
    // DefineShadow(color1 : string, color2? : string) {
    //     return IsNil(color2)
    //         ? `5px 5px 10px ${ color1 }, -5px -5px 10px ${ color1 }`
    //         : `5px 5px 10px ${ color1 }, -5px -5px 10px ${ color2 }`
    // }

    DefineBasicShadow(color : string =  "#000000") {
        return `0px 0px 15px 0px ${ color }`
    }
}