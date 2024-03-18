export default function DefineShadowColor(screenBackgroundFirstHexStr : string) {
    switch (screenBackgroundFirstHexStr) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
            return ['#000', '#818181']
        case '9':
        case 'A':
        case 'B':
        case 'C':
        case 'D':
        case 'E':
        case 'F':
            return ['#bebebe', '#ffffff']
        default:
            return ['#bebebe', '#ffffff']
    }
}