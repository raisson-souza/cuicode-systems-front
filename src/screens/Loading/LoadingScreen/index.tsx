import { GetSystemStyle } from "../../../components/InitialFetch"
import ScreenBox from "../../../components/ScreenBox"

export default function LoadingScreen() {
    const systemStyle = GetSystemStyle()

    return (
        <ScreenBox systemStyle={ systemStyle }>
            <h1>CARREGANDO...</h1>
        </ScreenBox>
    )
}