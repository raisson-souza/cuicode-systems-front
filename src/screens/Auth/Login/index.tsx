import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import FindValue from "../../../functions/FindValue"

import LocalStorage from "../../../data/classes/LocalStorage"
import User from "../../../data/classes/User"

import AuthEndpoints, { LoginResponse } from "../../../services/AuthEndpoints"
import SystemEndpoints from "../../../services/SystemEndpoints"

import FormBuilder, { FormFieldBasic } from "../../../components/FormBuilder/Form"
import ScreenBox from "../../../components/ScreenBox"

import "./styles.css"

export default function LoginScreen() {
    const [ loginForm, setLoginForm ] = useState<any>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchLoginForm = async () => {
            const response = await SystemEndpoints.GetForm('login')

            if (!response.Success) {
                window.alert('Ocorreu um erro ao carregar o formulário de login.')
                return
            }

            const formData = FindValue(response.Data, ["Fields"])
            setLoginForm(formData)
        }

        fetchLoginForm()
    }, [navigate])

    const loginFetch = async (FormFieldBasic : FormFieldBasic[]) => {
        let email : string = ""
        let password : string = ""

        FormFieldBasic.map(formFieldValue => {
            if (formFieldValue.Id === "Email") email = formFieldValue.Value
            if (formFieldValue.Id === "Password") password = formFieldValue.Value
            return null
        })

        const loginResponse = await AuthEndpoints.Login(email, password)

        if (loginResponse.Success) {
            const login = {
                token: loginResponse.Data["token"],
                user: new User(loginResponse.Data["user"])
            } as LoginResponse

            LocalStorage.SetToken(login.token)
            LocalStorage.SetCredentials(email, password)
            navigate('/home')
            return
        }

        window.alert(loginResponse.Data)
    }

    return (
        <ScreenBox>
            <div className="login-screen">
                <div className="login-description">
                    <h2>Faça seu Login em CuiCode Systems</h2>
                    <div>
                        <p>Não tem uma conta? <Link to={'/user_registry'}>Crie aqui.</Link></p>
                        <p>Esqueceu a senha? <Link to={'/account_recovery'}>Recupere sua conta.</Link> </p>
                    </div>
                </div>
                <div className="login-form">
                    {
                        FormBuilder({
                            Data: loginForm,
                            FormId: "login",
                            AfterSubmitFunc: loginFetch,
                            FormSubmitButtonMsg: "Entrar"
                        })
                    }
                </div>
            </div>
        </ScreenBox>
    )
}