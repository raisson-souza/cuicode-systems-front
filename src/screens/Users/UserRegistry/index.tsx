import { Link } from "react-router-dom"
import ScreenBox from "../../../components/ScreenBox"

export default function UserRegistryScreen() {
    return (
        <ScreenBox>
            <h1>UserRegistry</h1>
            <Link to={'/'}>ExternalHome</Link>
            <Link to={'/login'}>Login</Link>
        </ScreenBox>
    )
}