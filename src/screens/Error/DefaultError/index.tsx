import { Link } from "react-router-dom"

export default function DefaultErrorScreen() {
    return (
        <div>
            <h1>DefaultError</h1>
            <Link to={'/'}>ExternalHome</Link>
        </div>
    )
}