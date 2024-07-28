import { useNavigate } from "react-router-dom"

import { GetSystemStyle } from "../InitialFetch"

import "./styles.css"

export default function LoginRegistryBox() {
    const systemStyle = GetSystemStyle()
    const navigate = useNavigate()

    return (
        <div
            className="login_registry_box"
            style={{
                background: systemStyle.PrimariesLinearGradient()
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
                <p
                    style={{
                        fontSize: 15
                    }}
                >
                    <b>LOGIN</b>
                </p>
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
                <p
                    style={{
                        fontSize: 15
                    }}
                >
                    <b>REGISTRAR-SE</b>
                </p>
            </div>
        </div>
    )
}