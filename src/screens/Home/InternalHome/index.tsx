import { useNavigate } from "react-router-dom"
import LocalStorage from "../../../data/classes/LocalStorage"

export default function InternalHomeScreen() {
    const navigate = useNavigate()

    const LogOff = () => {
        LocalStorage.RemoveToken()
        navigate('/login')
    }

    return (
        <div>
            <h1>InternalHome</h1>
            <button onClick={() => { LogOff() }}>LogOff</button>
        </div>
    )
}