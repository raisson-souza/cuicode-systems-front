import { useNavigate } from "react-router-dom"
import { GetSystemStyle } from "../InitialFetch"
import "./styles.css"

type LoginRegistryBoxProps = {
    width : number
}

export default function LoginRegistryBox({
    width,
} : LoginRegistryBoxProps) {
    const systemStyle = GetSystemStyle()
    const navigate = useNavigate()

    return (
        <div
            className="login_registry_box"
            style={{
                width: `${ width }%`,
                background: `linear-gradient(145deg, ${ systemStyle.PrimaryColor }, ${ systemStyle.SecondaryColor })`
            }}
        >
            <div
                style={{
                    cursor: 'pointer',
                    backgroundColor: systemStyle.TerciaryColor
                }}
                onClick={ () => {
                    navigate('/login')
                } }
            >
                <h4>LOGIN</h4>
            </div>
            <div
                style={{
                    cursor: 'pointer',
                    backgroundColor: systemStyle.TerciaryColor
                }}
                onClick={ () => {
                    navigate('/user_registry')
                } }
            >
                <h4>REGISTRAR-SE</h4>
            </div>
        </div>
    )
}