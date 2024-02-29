import { Link } from "react-router-dom"

export default function UserRegistryScreen() {
    return (
        <div>
            <h1>UserRegistry</h1>
            <Link to={'/'}>ExternalHome</Link>
            <Link to={'/login'}>Login</Link>
        </div>
    )
}