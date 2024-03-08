import { useNavigate } from "react-router-dom"
import { GetSystemStyle } from "../InitialFetch"

type LoginRegistryBoxProps = { }

export default function LoginRegistryBox({ } : LoginRegistryBoxProps) {
    const systemStyle = GetSystemStyle()
    const navigate = useNavigate()

    return (
        <div>
            <div
                style={{
                    cursor: 'pointer',
                    backgroundColor: systemStyle.SecondaryColor
                }}
                onClick={ () => {
                    navigate('/login')
                } }
            >
                <h3>LOGIN</h3>
            </div>
            <div
                style={{
                    cursor: 'pointer',
                    backgroundColor: systemStyle.SecondaryColor
                }}
                onClick={ () => {
                    navigate('/user_registry')
                } }
            >
                <h3>REGISTRAR-SE</h3>
            </div>
        </div>
    )
}