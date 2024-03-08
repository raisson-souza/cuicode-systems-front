import { Link } from "react-router-dom"
import ScreenBox from "../../../components/ScreenBox"
import StuckPresentationalBox from "../../../components/StuckPresentationalBox"

export default function ExternalHomeScreen() {
    return (
        <ScreenBox>
            <h1>ExternalHome</h1>
            <Link to={'/login'}>Login</Link>
            <Link to={'/user_registry'}>UserRegistry</Link>
            <Link to={'/boards'}>Boards</Link>
            <StuckPresentationalBox
                imagePath="..."
                title="Módulo X"
            >
                <p>Informações sobre o módulo X.</p>
            </StuckPresentationalBox>
        </ScreenBox>
    )
}