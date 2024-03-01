import { Link } from "react-router-dom"
import ScreenBox from "../../../components/ScreenBox"

export default function ExternalHomeScreen() {
    return (
        <ScreenBox backgroundColor="red">
            <>
                <h1>ExternalHome</h1>
                <Link to={'/login'}>Login</Link>
                <Link to={'/user_registry'}>UserRegistry</Link>
                <Link to={'/boards'}>Boards</Link>
            </>
        </ScreenBox>
    )
}