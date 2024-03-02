import { Link } from "react-router-dom"
import { GetSystemStyle } from "../../../components/InitialFetch"
import ScreenBox from "../../../components/ScreenBox"

export default function UserRegistryScreen() {
    const systemStyle = GetSystemStyle()

    return (
        <ScreenBox systemStyle={ systemStyle }>
            <h1>UserRegistry</h1>
            <Link to={'/'}>ExternalHome</Link>
            <Link to={'/login'}>Login</Link>
        </ScreenBox>
    )
}