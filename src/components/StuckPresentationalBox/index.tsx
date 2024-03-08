import IsNil from "../../functions/IsNil"
import { GetSystemStyle } from "../InitialFetch"

type StuckPresentationalBoxProps = {
    title? : string
    children : JSX.Element
    imagePath : string
}

export default function StuckPresentationalBox({
    children,
    title,
    imagePath,
} : StuckPresentationalBoxProps) {
    const systemStyle = GetSystemStyle()

    const renderImage = IsNil(imagePath)
        ? null
        : <img src={ imagePath } alt="Imagem Introdutória" />

    return (
        <div
            style={{
                backgroundColor: systemStyle.BackgroundPrimaryColor
            }}
            className={
                IsNil(imagePath)
                    ? 'stuck_presentational_box'
                    : 'stuck_presentational_box_with_photo'
            }
        >
            { renderImage }
            <h2>{ title }</h2>
            { children }
        </div>
    )
}