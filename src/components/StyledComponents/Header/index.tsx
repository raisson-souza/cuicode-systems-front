import styled, { css } from "styled-components"

type HeaderProps = {
    backgroundcolor : string
    hasshadow : boolean
    textcolor : string
    screenBackgroundFirstHexStr : string
}

function GetShadowColor1(screenBackgroundFirstHexStr : string) {
    switch (screenBackgroundFirstHexStr) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
            return '#000'
        case '9':
        case 'A':
        case 'B':
        case 'C':
        case 'D':
        case 'E':
        case 'F':
            return '#bebebe'
        default:
            return '#bebebe'
    }
}

function GetShadowColor2(screenBackgroundFirstHexStr : string) {
    switch (screenBackgroundFirstHexStr) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
            return '#818181'
        case '9':
        case 'A':
        case 'B':
        case 'C':
        case 'D':
        case 'E':
        case 'F':
            return '#ffffff'
        default:
            return '#ffffff'
    }
}

const hasShadowMounted = (screenBackgroundFirstHexStr : string) => {
    return `box-shadow:  5px 5px 20px ${ GetShadowColor1(screenBackgroundFirstHexStr) }, -5px -5px 20px ${ GetShadowColor2(screenBackgroundFirstHexStr) }; border-radius: 0px 0px 20px 20px`
}

const Header = styled.div<HeaderProps>`
    ${({ backgroundcolor, textcolor, hasshadow, screenBackgroundFirstHexStr }) => css`
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        background-color: ${ backgroundcolor };
        color: ${ textcolor };
        height: 8%;
        ${
            hasshadow
                ? hasShadowMounted(screenBackgroundFirstHexStr)
                : null
        }
    `}
`

export { Header }