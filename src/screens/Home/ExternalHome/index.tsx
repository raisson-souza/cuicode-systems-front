import { Link } from "react-router-dom"

export default function ExternalHomeScreen() {
    return (
        <div>
            <h1>ExternalHome</h1>
            <Link to={'/login'}>Login</Link>
            <Link to={'/user_registry'}>UserRegistry</Link>
            <Link to={'/boards'}>Boards</Link>
        </div>
    )
}