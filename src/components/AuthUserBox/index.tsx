import { Button, Menu, MenuItem, Tooltip } from "@mui/material"
import User from "../../data/classes/User"
import "./styles.css"
import { Menu as MenuIcon } from '@mui/icons-material'
import { GetSystemStyle } from "../InitialFetch"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { GetUserAuth } from "../ProtectedRoute"
import LocalStorage from "../../data/classes/LocalStorage"
import InvertedTextColor from "../../functions/style/InvertedTextColor"
import UserPhoto from "../UserPhoto"

type AuthUserBoxProps = {
    userAuth : User,
    width : number,
}

export default function AuthUserBox ({
    userAuth,
    width,
} : AuthUserBoxProps) {
    const systemStyle = GetSystemStyle()
    const authUser = GetUserAuth()
    const navigate = useNavigate()
    const location = useLocation().pathname

    // Estilo contrário de cor para o fundo das opções do menu
    const menuTextColor = { 'color': InvertedTextColor(systemStyle.TextColor) }

    // Elemento âncora referente ao botão do menu
    const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null)
    // Booleano referente ao estado aberto / fechado do menu
    const userOptionsMenuOpen = Boolean(anchorEl)

    const optHandleClick = (event : any) => {
        const option = Number.parseInt(event.target.value)

        switch (option) {
            case 1: // Ver Perfil
                if (location.includes('/user/')) { // Se a pessoa já estiver numa rota de perfil, pula
                    setAnchorEl(null)
                    return
                }
                navigate(`/user/${ authUser?.UserAuth.Id }`)
                break
            case 2: // Editar Perfil
                // A DESENVOLVER
                setAnchorEl(null)
                break
            case 3: // Inicio
                navigate('/home')
                break
            case 4: // Sair
                LocalStorage.RemoveAllAuth()
                navigate('/login')
                break
            default:
                return
        }
    }

    return (
        <div
            className="auth_user_box"
            style={{
                width: `${ width }%`,
                background: `linear-gradient(145deg, ${ systemStyle.PrimaryColor }, ${ systemStyle.SecondaryColor })`
            }}
        >
            <Tooltip
                title="Foto do Usuário"
                id="user_img"
            >
                <div>
                    <UserPhoto userName={ userAuth.Name } userPhoto={ userAuth.PhotoBase64 } />
                </div>
            </Tooltip>
            <Tooltip
                title="Nome do Usuário"
                id="user_use"
            >
                <p>{ userAuth.Username }</p>
            </Tooltip>
            <div id="user_opt">
                <Button
                    onClick={ (event) => { setAnchorEl(event.currentTarget) } }
                    id="basic-button"
                    aria-controls={ userOptionsMenuOpen ? 'basic-menu' : undefined }
                    aria-haspopup="true"
                    aria-expanded={ userOptionsMenuOpen ? 'true' : undefined }
                >
                    <Tooltip title="Opções" >
                        <MenuIcon />
                    </Tooltip>
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={ anchorEl }
                    open={ userOptionsMenuOpen }
                    onClose={ () => { setAnchorEl(null) } }
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    onClick={ (event) => { optHandleClick(event) } }
                >
                    <MenuItem value={ 1 } style={ menuTextColor }>Ver Perfil</MenuItem>
                    <MenuItem value={ 2 } style={ menuTextColor }>Editar Perfil</MenuItem>
                    <MenuItem value={ 3 } style={ menuTextColor }>Inicio</MenuItem>
                    <MenuItem value={ 4 } style={ menuTextColor }>Sair</MenuItem>
                </Menu>
            </div>
        </div>
    )
}