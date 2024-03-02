import { Link } from "react-router-dom"
import { GetSystemStyle } from "../../../components/InitialFetch"
import ScreenBox from "../../../components/ScreenBox"

export default function AccountRecoveryScreen() {
    const systemStyle = GetSystemStyle()

    return (
        <ScreenBox systemStyle={ systemStyle }>
            <h1>AccountRecovery</h1>
            <Link to={'/home'}>InternalHome</Link>
            <Link to={'/login'}>Login</Link>
        </ScreenBox>
    )
}