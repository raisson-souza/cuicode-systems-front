import styled, { css } from "styled-components"

// Atentar-se aos estilos pré-definidos no backend
// definir estilo padrão no front

type HeaderProps = {
    backgroundColor? : string
    hasShadow? : boolean
    textColor? : string
}

const Header = styled.div<HeaderProps>`
    ${({ backgroundColor, textColor }) => css`
        background-color: ${ backgroundColor };
        color: ${ textColor };
        height: 5%;
        font-size: 30px
    `}
`

export {
    Header,
}