import { Link } from "react-router-dom"

export default function ExternalHomeScreen() {
    return (
        <div>
            <p>ExternalHome</p>
            <Link to={'/login'}>Login</Link>
        </div>
    )
}