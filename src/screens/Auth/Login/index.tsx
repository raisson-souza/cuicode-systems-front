import { Link, useNavigate } from "react-router-dom"
import ScreenBox from "../../../components/ScreenBox"
import { useEffect, useState } from "react"
import SystemEndpoints from "../../../services/SystemEndpoints"
import FindValue from "../../../functions/FindValue"
import AuthEndpoints, { LoginResponse } from "../../../services/AuthEndpoints"
import LocalStorage from "../../../data/classes/LocalStorage"
import User from "../../../data/classes/User"
import FormBuilder, { FormFieldBasic } from "../../../components/FormBuilder/Form"

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
            <h1>LoginScreen</h1>
            <Link to={'/account_recovery'}>AccountRecovery</Link>
            <Link to={'/home'}>InternalHome</Link>
            <Link to={'/user_registry'}>UserRegistry</Link>
            {
                FormBuilder({
                    Data: loginForm,
                    FormId: "login",
                    AfterSubmitFunc: loginFetch,
                    FormSubmitButtonMsg: "Entrar"
                })
            }
        </ScreenBox>
    )
}