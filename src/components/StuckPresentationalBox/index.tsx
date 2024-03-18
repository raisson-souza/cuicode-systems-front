import IsNil from "../../functions/IsNil"
import DefineLinearGradient from "../../functions/style/DefineLinearGradient"
import DefineShadow from "../../functions/style/DefineShadow"
import { GetSystemStyle } from "../InitialFetch"
import "./styles.css"

type StuckPresentationalBoxProps = {
    children : JSX.Element | JSX.Element[]
    title : string
    imagePath? : string
    side? : "left" | "right"
}

export default function StuckPresentationalBox({
    children,
    title,
    imagePath,
    side = "left"
} : StuckPresentationalBoxProps) {
    const systemStyle = GetSystemStyle()

    const renderImage = IsNil(imagePath)
        ? null
        : (
            <img
                id="s_p_b_img"
                src={ imagePath }
                alt="Imagem Introdutória"
            />
        )

    const className = IsNil(imagePath)
        ? 'stuck_presentational_box stuck_presentational_box_style'
        : 'stuck_presentational_box_with_photo stuck_presentational_box_style'

    const gridStyleWhenPhoto = !IsNil(imagePath)
            ? {
                gridTemplateAreas: side === 'left'
                    ? '"s_p_b_img s_p_b_title" "s_p_b_img s_p_b_content"'
                    : '"s_p_b_title s_p_b_img" "s_p_b_content s_p_b_img"'
            }
            : { }

    return (
        <div
            style={{
                background: DefineLinearGradient(systemStyle),
                boxShadow: DefineShadow(systemStyle.BackgroundPrimaryColor),
                justifySelf: side,
                width: '75%',
                ...gridStyleWhenPhoto
            }}
            className={ className }
        >
            { renderImage }
            <h2 id="s_p_b_title">{ title }</h2>
            <div id="s_p_b_content">
                { children }
            </div>
        </div>
    )
}