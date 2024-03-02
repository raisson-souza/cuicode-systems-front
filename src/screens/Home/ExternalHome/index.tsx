import { Link } from "react-router-dom"
import ScreenBox from "../../../components/ScreenBox"
import { GetSystemStyle } from "../../../components/InitialFetch"

export default function ExternalHomeScreen() {
    const systemStyle = GetSystemStyle()

    return (
        <ScreenBox systemStyle={ systemStyle }>
            <h1>ExternalHome</h1>
            <Link to={'/login'}>Login</Link>
            <Link to={'/user_registry'}>UserRegistry</Link>
            <Link to={'/boards'}>Boards</Link>
        </ScreenBox>
    )
}