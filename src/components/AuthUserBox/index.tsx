import User from "../../data/classes/User"

type AuthUserBoxProps = {
    userAuth : User,
    width : number,
}

export default function AuthUserBox ({
    userAuth,
    width,
} : AuthUserBoxProps) {
    return (
        <div
            className="auth_user_box"
            style={{
                width: `${ width }%`
            }}
        >
            <img
                src={ userAuth.PhotoBase64 }
                alt="Foto do Usuário"
                onClick={ () => {} } // ON HOVER, ABRIR MODAL ABAIXO COM "ver foto" | "editar foto", ABRIR MODAL RESPECTIVO
            />
            <p>{ userAuth.Username }</p>
            {/* ICONE DE MENU */}
        </div>
    )
}