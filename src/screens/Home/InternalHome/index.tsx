import { useNavigate } from "react-router-dom"
import LocalStorage from "../../../data/classes/LocalStorage"
import ScreenBox from "../../../components/ScreenBox"
import { GetUserAuth } from "../../../components/ProtectedRoute"

export default function InternalHomeScreen() {
    const navigate = useNavigate()

    const LogOff = () => {
        LocalStorage.RemoveToken()
        navigate('/login')
        return null
    }

    return (
        <ScreenBox>
            <h1>InternalHome</h1>
            <button onClick={() => { LogOff() }}>LogOff</button>
        </ScreenBox>
    )
}