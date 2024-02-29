import { Link } from "react-router-dom"

export default function LoginScreen() {
    return (
        <div>
            <h1>LoginScreen</h1>
            <Link to={'/'}>ExternalHome</Link>
            <Link to={'/account_recovery'}>AccountRecovery</Link>
            <Link to={'/home'}>InternalHome</Link>
            <Link to={'/user_registry'}>UserRegistry</Link>
        </div>
    )
}