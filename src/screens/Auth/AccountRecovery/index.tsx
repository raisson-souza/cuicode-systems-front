import { Link } from "react-router-dom"

export default function AccountRecoveryScreen() {
    return (
        <div>
            <h1>AccountRecovery</h1>
            <Link to={'/home'}>InternalHome</Link>
            <Link to={'/login'}>Login</Link>
        </div>
    )
}