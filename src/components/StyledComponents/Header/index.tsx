import styled, { css } from "styled-components"

type HeaderProps = {
    backgroundColor : string
    hasShadow : boolean
    screenBackgroundFirstHexStr : string
    children : JSX.Element
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

const defineBoxShadow = (hasShadow : boolean, screenBackgroundFirstHexStr : string) => {
    return hasShadow
        ? `5px 5px 20px ${ GetShadowColor1(screenBackgroundFirstHexStr) }, -5px -5px 20px ${ GetShadowColor2(screenBackgroundFirstHexStr) }`
        : 'none'
}

export default function Header({
    backgroundColor,
    hasShadow,
    screenBackgroundFirstHexStr,
    children,
} : HeaderProps) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: backgroundColor,
                height: '8%',
                boxShadow: defineBoxShadow(hasShadow, screenBackgroundFirstHexStr),
                borderRadius: '0px 0px 20px 20px'
            }}
        >
            { children }
        </div>
    )
}