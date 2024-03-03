import styled, { css } from "styled-components"

type HeaderProps = {
    backgroundcolor : string
    hasshadow : boolean
    textcolor : string
}

const Header = styled.div<HeaderProps>`
    ${({ backgroundcolor, textcolor, hasshadow }) => css`
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        background-color: ${ backgroundcolor };
        color: ${ textcolor };
        height: 8%;
        ${
            hasshadow
                ? 'box-shadow:  5px 5px 20px #bebebe, -5px -5px 20px #ffffff; border-radius: 0px 0px 20px 20px'
                : null
        }
    `}
`

export { Header }