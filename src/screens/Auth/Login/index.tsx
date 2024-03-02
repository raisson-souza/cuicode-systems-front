import { Link } from "react-router-dom"
import ScreenBox from "../../../components/ScreenBox"
import { GetSystemStyle } from "../../../components/InitialFetch"

export default function LoginScreen() {
    const systemStyle = GetSystemStyle()

    return (
        <ScreenBox systemStyle={ systemStyle }>
            <h1>LoginScreen</h1>
            <Link to={'/'}>ExternalHome</Link>
            <Link to={'/account_recovery'}>AccountRecovery</Link>
            <Link to={'/home'}>InternalHome</Link>
            <Link to={'/user_registry'}>UserRegistry</Link>
        </ScreenBox>
    )
}