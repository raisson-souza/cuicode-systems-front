import { Link } from "react-router-dom"
import { GetSystemStyle } from "../../../components/InitialFetch"
import ScreenBox from "../../../components/ScreenBox"

export default function NotFoundScreen() {
    const systemStyle = GetSystemStyle()

    return (
        <ScreenBox systemStyle={ systemStyle }>
            <h1>404</h1>
            <Link to={'/'}>ExternalHome</Link>
        </ScreenBox>
    )
}