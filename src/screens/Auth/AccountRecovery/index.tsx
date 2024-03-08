import { Link } from "react-router-dom"
import ScreenBox from "../../../components/ScreenBox"

export default function AccountRecoveryScreen() {
    return (
        <ScreenBox>
            <h1>AccountRecovery</h1>
            <Link to={'/home'}>InternalHome</Link>
            <Link to={'/login'}>Login</Link>
        </ScreenBox>
    )
}