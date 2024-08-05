import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import LocalStorage from "../../../data/classes/LocalStorage"

import AuthEndpoints from "../../../services/AuthEndpoints"
import SystemEndpoints from "../../../services/SystemEndpoints"

import FormBuilder, { FormFieldBasic } from "../../../components/FormBuilder/Form"
import ScreenBox from "../../../components/base/ScreenBox"

import "./styles.css"

export default function LoginScreen() {
    useEffect(() => { document.title = "CuiCode Systems - Login" }, [])

    const [ loginForm, setLoginForm ] = useState<any>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchLoginForm = async () => {
            const response = await SystemEndpoints.GetForm('login')

            if (!response.Success) {
                window.alert('Ocorreu um erro ao carregar o formulário de login.')
                return
            }

            setLoginForm(response.Data)
        }

        fetchLoginForm()
    }, [])

    const loginFetch = async (FormFieldBasic : FormFieldBasic[]) => {
        let email : string = ""
        let password : string = ""

        FormFieldBasic.map(formFieldValue => {
            if (formFieldValue.Id === "Email") email = formFieldValue.Value
            if (formFieldValue.Id === "Password") password = formFieldValue.Value
            return null
        })

        const loginResponse = await AuthEndpoints.Login({
            email: email,
            password: password
        })

        if (loginResponse.Success) {
            LocalStorage.SetToken(loginResponse.Data.token)
            LocalStorage.SetCredentials(email, password)
            navigate('/home')
            return
        }

        window.alert(loginResponse.Data)
    }

    return (
        <ScreenBox
            hasHeaderUserInterationBox={ false }
        >
            <div id="login-screen">
                <div id="login-description">
                    <h2>Faça seu login em CuiCode Systems</h2>
                    <div>
                        <p><Link to={'/user_registry'}>Não tem uma conta?</Link></p>
                        <p><Link to={'/account_recovery'}>Esqueceu a senha?</Link> </p>
                    </div>
                </div>
                <div id="login-form">
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