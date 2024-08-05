import { Button, Menu, MenuItem, Tooltip } from "@mui/material"
import { Menu as MenuIcon } from '@mui/icons-material'
import { useNavigate } from "react-router-dom"
import { useState } from "react"

import LocalStorage from "../../data/classes/LocalStorage"
import User from "../../data/classes/User"

import UserPhoto from "../UserPhoto"

import { Base64 } from "../../functions/Formatting/Base64"
import { GetSystemStyle } from "../base/InitialFetch"
import { GetUserAuth } from "../base/ProtectedRoute"

import "./styles.css"

type AuthUserBoxProps = {
    userAuth : User,
}

const gridAreasStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

export default function AuthUserBox ({
    userAuth,
} : AuthUserBoxProps) {
    const systemStyle = GetSystemStyle()
    const authUser = GetUserAuth()
    const navigate = useNavigate()

    // Estilo contrário de cor para o fundo das opções do menu
    const menuTextColor = { 'color': systemStyle.OppositeTextColor }

    // Elemento âncora referente ao botão do menu
    const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null)
    // Booleano referente ao estado aberto / fechado do menu
    const userOptionsMenuOpen = Boolean(anchorEl)

    // Configurações do botão
    const buttonAriaControls = userOptionsMenuOpen ? 'basic-menu' : undefined
    const buttonAriaExpanded = userOptionsMenuOpen ? 'true' : undefined

    const optHandleClick = (event : any) => {
        const option = Number.parseInt(event.target.value)

        switch (option) {
            case 1: // Ver Perfil
                // if (location.includes('/user/')) { // Se a pessoa já estiver numa rota de perfil, pula
                //     setAnchorEl(null)
                //     return
                // }
                // TODO: acima, caso a pessoa esteja visitando um perfil e queiro voltar ao seu, poderá, por isso comentei
                const userAuthIdHash = Base64.ToBase64(authUser?.Id?.toString())
                navigate(`/user/${ userAuthIdHash }`)
                break
            case 2: // Editar Perfil
                // A DESENVOLVER
                setAnchorEl(null)
                break
            case 3: // Inicio
                navigate('/home')
                break
            case 4: // Sair
                LocalStorage.LogOff()
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
                background: systemStyle.PrimariesLinearGradient()
            }}
        >
            <Tooltip
                title="Foto do Usuário"
                style={ gridAreasStyle }
            >
                <div id="user-photo">
                    <UserPhoto userName={ userAuth.Name } userPhoto={ userAuth.Photo } />
                </div>
            </Tooltip>
            <Tooltip
                title="Nome do Usuário"
                style={ gridAreasStyle }
            >
                <p
                    style={{
                        fontSize: 20
                    }}
                >
                    <b>{ userAuth.Username }</b>
                </p>
            </Tooltip>
            <div
                style={ gridAreasStyle }
            >
                <Button
                    onClick={ (event) => { setAnchorEl(event.currentTarget) } }
                    id="basic-button"
                    aria-controls={ buttonAriaControls }
                    aria-haspopup="true"
                    aria-expanded={ buttonAriaExpanded }
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
                    MenuListProps={{ 'aria-labelledby': 'basic-button' }}
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