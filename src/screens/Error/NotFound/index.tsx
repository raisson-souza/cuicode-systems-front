import { Link } from "react-router-dom"

export default function NotFoundScreen() {
    return (
        <div>
            <h1>404</h1>
            <Link to={'/'}>ExternalHome</Link>
        </div>
    )
}